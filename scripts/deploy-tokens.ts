import { ethers } from "hardhat";

async function main() {

    const ERC20 = await ethers.getContractFactory("MyERC20");

    // deploying first token
    const TAC = await ERC20.deploy("Test A Token", "TAC", 18);
    await TAC.deployed();
    console.log("Test A Token address: ", TAC.address);

    // deploying second token
    const TBC = await ERC20.deploy("Test B Token", "TBC", 18);
    await TBC.deployed();
    console.log("Test B Token address: ", TBC.address);

    // deploying rewards token
    const RewardsToken = await ERC20.deploy("DVCoin", "DVC", 18);
    await RewardsToken.deployed();
    console.log("Rewards token address: ", RewardsToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });