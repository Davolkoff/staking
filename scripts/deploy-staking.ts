import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();


async function main() {

    const Staking = await ethers.getContractFactory("MyStaking");
    
    const contract = await Staking.deploy(1200, 1, 600, process.env.LP_TOKEN_ADDRESS, process.env.REWARDS_TOKEN_ADDRESS);
    await contract.deployed();
    console.log("Staking contract address: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });