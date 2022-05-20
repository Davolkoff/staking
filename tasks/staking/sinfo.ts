import { task } from "hardhat/config";

task("sinfo", "Information about staking contract")
.addParam("scontract", "Address of staking contract")
.setAction(async (args, hre) => {

    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    const info = await sContract.stakingInfo();
    console.log("INFORMATION:\n");
    console.log(`Freeze time: ${info[0]}`);
    console.log(`Rewards percent: ${info[1]}%\n`);
});