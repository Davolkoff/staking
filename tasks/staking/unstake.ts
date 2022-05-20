import { task } from "hardhat/config";

task("unstake", "Withdraws lp tokens from contract")
.addParam("scontract", "Address of staking contract")
.setAction(async (args, hre) => {

    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    await sContract.unstake();
    console.log("Tokens successfully unstaked");
});