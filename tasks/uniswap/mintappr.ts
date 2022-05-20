import { task } from "hardhat/config";


task("mintappr", "Mints 70000 TAC and 20000 TBC and approves some of them to router")
.addParam("atoken", "Address of token")
.addParam("btoken", "Address of token")
.setAction(async (args, hre) => {
    const [user] = await hre.ethers.getSigners()

    const TAC = await hre.ethers.getContractAt("MyERC20", args.atoken);
    const TBC = await hre.ethers.getContractAt("MyERC20", args.btoken);

    const tacAmount = "70000000000000000000000";
    const tbcAmount = "20000000000000000000000";
    const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

    await TAC.mint(user.address, tacAmount);
    console.log("Token A minted");
    await TBC.mint(user.address, tbcAmount);
    console.log("Token B minted");

    await TAC.approve(routerAddress, "60000000000000000000000");
    console.log("Token A approved");
    await TBC.approve(routerAddress, "10000000000000000000000");
    console.log("Token B approved");
    
    console.log("Tokens successfully minted and approved");
});