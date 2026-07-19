# WalletFlow — Product Requirements Document

## Product Overview

WalletFlow is an atomic multi-wallet payment splitter for crypto. Instead of sending one payment to one wallet, users create a WalletFlow payment split. When someone pays that split, the WalletFlow smart contract instantly distributes the funds across multiple destination wallets according to predefined percentage allocations — atomically, onchain, in a single transaction, with no bots, no backend watcher, and no manual transfers.

This is NOT another wallet, portfolio tracker, or DeFi dashboard. It is payment splitting — one payment in, many wallets paid out, instantly and trustlessly.

**Tagline**: Split One Payment. Pay Everyone Instantly.
**Subheadline**: Distribute one payment across multiple wallets in a single atomic transaction on Monad.

## Target Users

Creator agencies, marketing agencies, startups, businesses, DAOs, and teams who need to pay out to multiple wallets from a single incoming payment without manual routing.

## Core Features

### 1. Payment Splits
Create reusable split configurations triggered by incoming payments. Split Cards display name, trusted sender, accepted token, destination wallet allocations with percentages and a live allocation total, and active/paused status. Users can edit, duplicate, pause, or delete any split.

### 2. Split Builder (5-Step Wizard)
- **Step 1 — Split Name**: Free text with preset templates (Freelance Income, Employer Payroll, NFT Sales, Trading Profits)
- **Step 2 — Trusted Sender**: Select from Employer, Client, Marketplace, Exchange, or add wallet address manually with nickname
- **Step 3 — Accepted Token**: USDC, MON, ETH
- **Step 4 — Amount Conditions**: Any Amount, Greater Than, Less Than, Exact Amount
- **Step 5 — Allocate Wallets (Visual Block Builder)**: WHEN/AND/THEN visual blocks with animated connectors showing condition logic and destination wallet percentage splits, plus a live allocation meter (80% incomplete, 100% ✅ ready, 115% ❌ over-allocated). This is the centerpiece experience.

### 3. Payment Split Execution
Each split generates a shareable payment page with QR code, payment URL with copy button, share controls, and a live payer preview showing exactly what the payer sees. On execution, a success screen shows Recipient Breakdown, Amount Distributed, Transaction Hash, and a View on Monad Explorer link.

### 4. Trusted Senders
Assign different Splits to different clients, employers, marketplaces, or exchanges. Manual wallet address whitelisting with avatar and nickname display.

### 5. Dashboard (Immersive Full-Screen)
Hero-style balance summary at top. Wide row of overview stat cards: Total Split, Splits Executed, Successful Executions, Active Splits, Execution Rate. Full-width recent activity timeline: Payment Received → Split Matched → Funds Distributed → Transaction Confirmed.

### 6. Payment History
Elegant activity timeline with sender info, amount, Split name, destination breakdown, transaction hash with Monad Explorer deep link, timestamp, and execution status badge.

### 7. Wallet Management
Beautiful wallet cards grid. Each card: nickname, truncated address, color tag, current allocation percentage, edit button. Preset wallet types: Savings, Bills, Trading, Cold Wallet, Main.

### 8. Settings
Connected wallet configuration, Monad Testnet toggle, notification preferences, default gas settings, theme controls.

## Information Architecture

8-page structure for desktop:
1. **Landing** — Scroll narrative hero with animated payment split diagram, three feature cards, CTAs
2. **Dashboard** — Full-screen immersive: hero balance, stat cards row, full-width activity timeline
3. **Payment Splits** — Split Cards grid with status pills, live allocation meter, and action buttons
4. **Create Payment Split** — 5-step wizard with visual block builder and live allocation meter at step 5
5. **Payment Split Execution** — Generated payment page with QR code, payer preview, and a success screen (Recipient Breakdown, Amount Distributed, Transaction Hash, View on Monad Explorer)
6. **Wallet Management** — Wallet cards grid
7. **History** — Activity timeline with transaction details
8. **Settings** — Configuration panels

Navigation: Minimal floating top bar; main content spans full viewport width.

## Visual Direction

Zinc charcoal base, Monad purple accents with subtle cyan telemetry highlights. Micro-brushed metal texture, subtle glassmorphism on elevated surfaces. Dark mode first. Generous whitespace, rounded cards, soft gradients. The interface should feel like Stripe, Linear, or Vercel — premium, minimal, precise, and trustworthy.