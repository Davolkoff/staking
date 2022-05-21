import { task } from "hardhat/config";

task("stake", "Sends lp tokens to contract")
.addParam("scontract", "Address of staking contract")
.addParam("amount", "Amount of tokens")
.setAction(async (args, hre) => {

    const lpToken = await hre.ethers.getContractAt("IERC20", process.env.LP_TOKEN_ADDRESS as string);
    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    await lpToken.approve(args.scontract, args.amount);
    console.log("Tokens approved")
    await sContract.stake(args.amount);
    console.log("Tokens staked");
});