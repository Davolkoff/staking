import { task } from "hardhat/config";

task("uinfo", "Information about user in staking contract")
.addParam("scontract", "Address of staking contract")
.addParam("user", "Address of user")
.setAction(async (args, hre) => {

    const sContract = await hre.ethers.getContractAt("MyStaking", args.scontract);

    const info = await sContract.stakingInfo();
    console.log("INFORMATION ABOUT USER:\n");
    console.log(`Staked LP tokens: ${info[0]}`);
    console.log(`Rewards tokens: ${info[1]}\n`);
    console.log("*information about rewards stokens is current at the time of the last stake\n")
});