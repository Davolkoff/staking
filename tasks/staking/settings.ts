import { task } from "hardhat/config";

task("settings", "Changes settings of contract")
.addParam("scontract", "Address of staking contract")
.addParam("frtime", "Freezing time (in seconds)")
.addParam("frequency", "Rewards frequency (in seconds)")
.addParam("rpercent", "Rewards percent (in percents)")
.setAction(async (args, hre) => {

    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    await sContract.changeSettings(args.frtime, args.rpercent, args.frequency);
    console.log("Settings successfully changed");
});