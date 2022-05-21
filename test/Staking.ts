import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { IUniswapV2Factory, IUniswapV2Router02 } from "../typechain";
import * as dotenv from "dotenv";

dotenv.config();


describe("Staking Contract", function () {
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    
    let stakingContract: Contract;
    let TAC: Contract;
    let TBC: Contract;
    let rewardsToken: Contract;
    let lpToken: Contract;

    describe("Deploying", function(){
        it("Should deploy A token successfully", async function() {
            const ERC20 = await ethers.getContractFactory("MyERC20");
            TAC = await ERC20.deploy("Test A Token", "TAC", 18);
            await TAC.deployed();
        });

        it("Should deploy B token successfully", async function() {
            const ERC20 = await ethers.getContractFactory("MyERC20");
            TBC = await ERC20.deploy("Test B Token", "TBC", 18);
            await TBC.deployed();
        });

        it("Should deploy rewards token successfully", async function() {
            const ERC20 = await ethers.getContractFactory("MyERC20");
            rewardsToken = await ERC20.deploy("DVCoin", "DVC", 18);
            await rewardsToken.deployed();
        });

        it("Should mint tokens on user's account for creating pair", async function() {
            [ owner, addr1 ] = await ethers.getSigners();
            const tacAmount = "60000000000000000000000";
            const tbcAmount = "10000000000000000000000";

            await TAC.mint(owner.address, tacAmount);
            expect(await TAC.balanceOf(owner.address)).to.equal(tacAmount);
            
            await TBC.mint(owner.address, tbcAmount);
            expect(await TBC.balanceOf(owner.address)).to.equal(tbcAmount);
        });

        it("Should approve router tokens for creating pair", async function() {

            const tacAmount = "60000000000000000000000";
            const tbcAmount = "10000000000000000000000";

            await TAC.approve(process.env.ROUTER_ADDRESS, tacAmount);
            expect(await TAC.allowance(owner.address, process.env.ROUTER_ADDRESS)).to.equal(tacAmount);
            
            await TBC.approve(process.env.ROUTER_ADDRESS, tbcAmount);
            expect(await TBC.allowance(owner.address, process.env.ROUTER_ADDRESS)).to.equal(tbcAmount);
        });

        it("Should create uniswap liquidity pool", async function() {

            const factory = <IUniswapV2Factory>(await ethers.getContractAt("IUniswapV2Factory", process.env.FACTORY_ADDRESS as string));
            const router = <IUniswapV2Router02>(await ethers.getContractAt("IUniswapV2Router02", process.env.ROUTER_ADDRESS as string));

            const tokenAAmount = "60000000000000000000000";
            const tokenBAmount = "10000000000000000000000";

            await router.addLiquidity(
                TAC.address, // address of token a
                TBC.address, // address of token b
                tokenAAmount, // desired amount of token a
                tokenBAmount, // desired amount of token b
                tokenAAmount, // amount of token a
                tokenBAmount, // amount of token b
                owner.address, // address, receiving lp tokens
                Date.now() + 31536000 // deadline
            );
            const lpTokenAddress = await factory.getPair(TAC.address, TBC.address);
            
            lpToken = await ethers.getContractAt("IERC20", lpTokenAddress);
            expect(Number(await lpToken.balanceOf(owner.address))).to.greaterThan(0);
        });

        it("Should deploy staking contract successfully", async function() {
            const Staking = await ethers.getContractFactory("MyStaking");

            stakingContract = await Staking.deploy(1200, 1, 600, lpToken.address, rewardsToken.address);
            await stakingContract.deployed();
        });

        it("Should successfully mint rewards tokens to staking contract", async function() {
            const rewardsAmount = "10000000000000000000000";
            await rewardsToken.mint(stakingContract.address, rewardsAmount);
            expect(await rewardsToken.balanceOf(stakingContract.address)).to.equal(rewardsAmount);
        });
    });

    describe("Contract functions", function() {
        it("Should stake lp tokens", async function() {
            const lpTokenAmount = "100000000000000000000";

            await lpToken.approve(stakingContract.address, lpTokenAmount);
            await stakingContract.stake(lpTokenAmount);
            expect(await lpToken.balanceOf(stakingContract.address)).to.equal(lpTokenAmount);
        });

        it("Should revert transaction if you try to send 0 tokens", async function() {
            await expect(stakingContract.stake(0)).to.be.revertedWith("You can't send 0 tokens");
        });

        it("Should change settings of staking contract", async function() {
            const initValues = await stakingContract.stakingInfo();
            expect(initValues[0]).to.equal(1200);
            expect(initValues[1]).to.equal(1);
            expect(initValues[2]).to.equal(600);
            await stakingContract.changeSettings(300,10,60);
            
            const finalValues = await stakingContract.stakingInfo();
            expect(finalValues[0]).to.equal(300);
            expect(finalValues[1]).to.equal(10);
            expect(finalValues[2]).to.equal(60);
        });

        it("Should revert changing settings if you are not an owner", async function() {
            await expect(stakingContract.connect(addr1).changeSettings(300, 10, 5)).to.be.revertedWith("Not an owner");
        });
        
        it("Should withdraw rewards tokens", async function() {
            await network.provider.send("evm_increaseTime", [500]);
            await network.provider.send("evm_mine");

            await stakingContract.claim();
            expect(Number(await rewardsToken.balanceOf(owner.address))).to.greaterThan(0);
        });

        it("Should revert withdrawing rewards tokens, if you haven't got them on contract balance", async function () {
            await expect(stakingContract.claim()).to.be.revertedWith("You haven't got reward tokens");
        });

        it("Should withdraw user's available lp tokens", async function() {
            const unwithdrawableAmount = "2000000000000000";
            await lpToken.approve(stakingContract.address, unwithdrawableAmount);
            await stakingContract.stake(unwithdrawableAmount);

            await stakingContract.unstake();
            const userInfo = await stakingContract.userInfo(owner.address);
            expect(userInfo[0]).to.equal(unwithdrawableAmount);
        });

        it("Should revert unstaking if you haven't staked tokens", async function() {
            await network.provider.send("evm_increaseTime", [400]);
            await network.provider.send("evm_mine");
            await stakingContract.unstake();
            await expect(stakingContract.unstake()).to.be.revertedWith("Nothing to unstake");
        });

        it("Should revert unstaking if you haven't available lp tokens", async function() {
            const unwithdrawableAmount = "2000000000000000";
            await lpToken.approve(stakingContract.address, unwithdrawableAmount);
            await stakingContract.stake(unwithdrawableAmount);
            await expect(stakingContract.unstake()).to.be.revertedWith("You can't unstake lp tokens right now");
        });
    });
});
