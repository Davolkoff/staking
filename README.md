# Staking contract

>This project presents tasks for interacting with the staking contract, for creating ERC 20 tokens (reward tokens and tokens for liquidity pool) and for transferring them to the user's account and to the account of the staking contract, task for creating liquidity pool on uniswap. Also you can find solidity files with staking contract and ERC20 contract in this project and tests, that covers 100% of both contracts. All tasks are divided into folders for convenience. Tests divided into two files: ERC20 and Staking.
-------------------------
# Table of contents
1. Deploying
 + [Deploy tokens](#Deploy-tokens)
 + [Mint and approve tokens](#Mintappr)
 + [Create pool](#Pool)
 + [Deploy staking contract](#Deploy-staking)
 + [Mint rewards tokens to staking contract](#MintSC)
2. Tasks
 + [Stake](#Stake)
 + [Claim](#Claim)
 + [Unstake](#Unstake)
 + [Settings changing](#Settings)
 + [User info](#Uinfo)
 + [Staking contract info](#Sinfo)
-------------------------
## 1. Deploying

#### <a name="Deploy-tokens"></a> - Deploy tokens in Rinkeby (after executing this comand you'll see token's addresses in terminal):
```shell
npx hardhat run scripts/deploy-tokens.ts
```
#### <a name="Mintappr"></a> - Mint and approve tokens (mints tokens to your balance and approves them to router):
```shell
Usage: hardhat [GLOBAL OPTIONS] mintappr --atoken <STRING> --btoken <STRING>

OPTIONS:

  --atoken      Address of token 
  --btoken      Address of token 
```
#### <a name="Pool"></a> - Create pool (after executing this comand you'll see LP Token's address in terminal)
```shell
Usage: hardhat [GLOBAL OPTIONS] pool --atoken <STRING> --btoken <STRING>

OPTIONS:

  --atoken      Address of token A 
  --btoken      Address of token B 
```
#### <a name="Deploy-staking"></a> - Deploy staking contract (deploys staking contract to Rinkeby, using addresses of contracts from .env)
```shell
npx hardhat run scripts/deploy-staking.ts
```
-------------------------
## 2. Tasks:

#### <a name="Stake"></a> - Stake (stakes your LP tokens to contract's balance)
```shell
Usage: hardhat [GLOBAL OPTIONS] stake --amount <STRING> --scontract <STRING>

OPTIONS:

  --amount      Amount of tokens 
  --scontract   Address of staking contract 
```
Example:
```shell
npx hardhat stake --amount 10000000000000000000 --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d
```
 
#### <a name="Claim"></a> - Claim (withdraws your rewards tokens)
```shell
Usage: hardhat [GLOBAL OPTIONS] claim --scontract <STRING>

OPTIONS:

  --scontract   Address of staking contract 
```
Example:
```shell
npx hardhat claim --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d
```

#### <a name="Unstake"></a> - Unstake (withdraws your available LP tokens from contract)
```shell
Usage: hardhat [GLOBAL OPTIONS] unstake --scontract <STRING>

OPTIONS:

  --scontract   Address of staking contract 
```
Example:
```shell
npx hardhat unstake --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d
```
#### <a name="Settings"></a> - Settings changing (changes freezing time, rewards percent and frequency of rewards. Can be executed only by owner)
```shell
Usage: hardhat [GLOBAL OPTIONS] settings --frequency <STRING> --frtime <STRING> --rpercent <STRING> --scontract <STRING>

OPTIONS:

  --frequency   Rewards frequency (in seconds) 
  --frtime      Freezing time (in seconds) 
  --rpercent    Rewards percent (in percents) 
  --scontract   Address of staking contract 
```
Example:
```shell
npx hardhat settings --frequency 100 --frtime 1200 --rpercent 1 --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d
```
#### <a name="Uinfo"></a> - User info (shows information about user's staled tokens and rewards tokens)
```shell
Usage: hardhat [GLOBAL OPTIONS] uinfo --scontract <STRING> --user <STRING>

OPTIONS:

  --scontract   Address of staking contract 
  --user        Address of user 
```
Example:
```shell
npx hardhat uinfo --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d --user 0x5A31ABa56b11cc0Feae06C7f907bED9Dc1C02f95
```

#### <a name="Sinfo"></a> - Staking contract info (shows information about settings of staking contract)
```shell
Usage: hardhat [GLOBAL OPTIONS] sinfo --scontract <STRING>

OPTIONS:

  --scontract   Address of staking contract 
```
Example:
```shell
npx hardhat sinfo --scontract 0x8Fb1341Ec92eF0077a5106fde4c6fa77687FdA2d
```
