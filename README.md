# WalletFlow

WalletFlow is an onchain payment splitter built on Monad.

Instead of sending multiple transfers manually, WalletFlow lets you make one payment that is distributed atomically to multiple recipients.

## Features

- One transaction, multiple recipients
- Atomic payment execution
- Built on Monad Testnet
- Simple wallet connection

## Demo

1. Connect your wallet.
2. Ensure you have demo dUSDC.
3. Approve the token.
4. Create and execute a payment split.

## Demo Token

This project uses a demo dUSDC token.

The DemoUSDC contract exposes a public `mint()` function, allowing anyone to mint test tokens before using WalletFlow.

## Tech Stack

- React
- TypeScript
- Vite
- viem
- Solidity
- Monad Testnet
