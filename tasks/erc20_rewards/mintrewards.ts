import { task } from "hardhat/config";

task("mintrewards", "Mints 100000 rewards tokens to staking contract")
.addParam("scontract", "Address of staking contract")
.setAction(async (args, hre) => {
    
    const rewardsTokenAddress = "0xDBA2aC2f1C1e1909abAdb9325351235824568dEc";

    const rewardsToken = await hre.ethers.getContractAt("MyERC20", rewardsTokenAddress);
    
    await rewardsToken.mint(args.scontract, "100000000000000000000000");
    console.log("Rewards tokens successfully minted");
});