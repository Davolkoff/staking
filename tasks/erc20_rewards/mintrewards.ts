import { task } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

task("mintrewards", "Mints 100000 rewards tokens to staking contract")
.addParam("scontract", "Address of staking contract")
.setAction(async (args, hre) => {

    const rewardsToken = await hre.ethers.getContractAt("MyERC20", process.env.REWARDS_TOKEN_ADDRESS as string);
    
    await rewardsToken.mint(args.scontract, "100000000000000000000000");
    console.log("Rewards tokens successfully minted");
});