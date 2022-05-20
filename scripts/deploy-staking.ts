import { ethers } from "hardhat";

async function main() {

    const Staking = await ethers.getContractFactory("MyStaking");

    const lpTokenAddress = "0x8327580287eEDEE60a6BBb71E2759e85691290dB";
    const rewardsTokenAddress = "0xDBA2aC2f1C1e1909abAdb9325351235824568dEc";
    
    const contract = await Staking.deploy(1200, 1, 600, lpTokenAddress, rewardsTokenAddress);
    await contract.deployed();
    console.log("Staking contract address: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });