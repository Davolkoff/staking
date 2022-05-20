import { task } from "hardhat/config";
import { IUniswapV2Factory, IUniswapV2Router02 } from "../../typechain";

task("pool", "Creates new liquidity pool with token's addresses")
.addParam("atoken", "Address of token A")
.addParam("btoken", "Address of token B")
.setAction(async (args, hre) => {
    const [signer] = await hre.ethers.getSigners();
    
    const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

    const factory = <IUniswapV2Factory>(await hre.ethers.getContractAt("IUniswapV2Factory", factoryAddress));
    const router = <IUniswapV2Router02>(await hre.ethers.getContractAt("IUniswapV2Router02", routerAddress));

    const tokenAAmount = "60000000000000000000000";
    const tokenBAmount = "10000000000000000000000";

    await router.addLiquidity(
        args.atoken, // address of token a
        args.btoken, // address of token b
        tokenAAmount, // desired amount of token a
        tokenBAmount, // desired amount of token b
        tokenAAmount, // amount of token a
        tokenBAmount, // amount of token b
        signer.address, // address, receiving lp tokens
        Date.now() + 31536000 // deadline
    );
    
    console.log(`LP Token address: ${await factory.getPair(args.atoken, args.btoken)}`);
});