import { task } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

task("mintappr", "Mints 60000 TAC and 10000 TBC and approves them to router")
.addParam("atoken", "Address of token")
.addParam("btoken", "Address of token")
.setAction(async (args, hre) => {
    const [user] = await hre.ethers.getSigners()

    const TAC = await hre.ethers.getContractAt("MyERC20", args.atoken);
    const TBC = await hre.ethers.getContractAt("MyERC20", args.btoken);

    const tacAmount = "60000000000000000000000";
    const tbcAmount = "10000000000000000000000";

    await TAC.mint(user.address, tacAmount);
    console.log("Token A minted");
    await TBC.mint(user.address, tbcAmount);
    console.log("Token B minted");

    await TAC.approve(process.env.ROUTER_ADDRESS, "60000000000000000000000");
    console.log("Token A approved");
    await TBC.approve(process.env.ROUTER_ADDRESS, "10000000000000000000000");
    console.log("Token B approved");
    
    console.log("Tokens successfully minted and approved");
});