import { task } from "hardhat/config";

task("claim", "Withdraws rewards tokens from contract")
.addParam("scontract", "Address of staking contract")
.setAction(async (args, hre) => {

    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    await sContract.claim();
    console.log("Rewards claimed");
});