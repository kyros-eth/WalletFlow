# WalletFlow Design DNA: Linear Precision

## 1. Design Intent & Methodology
WalletFlow is a premium crypto payment automation SaaS built for the Monad ecosystem. The visual direction, **Linear Precision**, adopts the "Utility-First Professional" track, drawing inspiration from industry leaders like **Linear**, **Stripe**, and **Vercel**. 

The design methodology is grounded in **Crystalline Trust**. Every UI element is sharp, high-contrast, and purposeful. We avoid the "Cyberpunk Dashboard" cliché by using a sophisticated **Zinc Charcoal** base instead of purple-tinted blacks. **Monad Purple (#836EF9)** is used strictly as an interactive accent, paired with **Telemetry Cyan (#85E6FF)** for live status and on-chain confirmations.

## 2. Visual Physics
- **Surfaces**: Zinc-based dark mode. Cards use a subtle 1px border with `white/6` opacity and a `zinc-900` background to create separation from the `zinc-950` page base.
- **Corners**: 12px for cards, 8px for buttons/inputs. A "Spatial" philosophy that feels balanced for desktop utility.
- **Depth**: Layered elevation using pure neutral shadows. No colored glows.
- **Texture**: A subtle 2% grain overlay on backgrounds to prevent flat digital banding and evoke a premium "micro-brushed" hardware feel.

## 3. Typography & Spacing
- **Scale**: Major Third (1.250) ratio. This provides a balanced, rhythmic ladder that scales from dense utility lists to bold hero statements.
- **Families**: 
  - **Display/UI**: `Geist` (Google Fonts: `Geist`) — a high-precision geometric sans that embodies "Expert Automation."
  - **Mono**: `Geist Mono` — used for wallet addresses and transaction hashes to ensure alignment and technical clarity.
- **Spacing**: 8px base unit. All gaps and margins are multiples of 8 (e.g., 16px snugs, 32px sections).

## 4. Component Recipes
- **Primary Button**: `bg-brand-primary` (Monad Purple) with `hover:bg-brand-primary/90` and `active:scale-[0.98]`.
- **Card**: `bg-surface-base border border-white/6 rounded-card shadow-sm`.
- **Input**: `bg-zinc-900 border-border-subtle focus:ring-2 focus:ring-brand-accent`.
- **Status Pill**: Subtle backgrounds (`cyan-500/10`) with sharp text (`text-cyan-400`) for telemetry indicators.

## 5. Motion System
- **Physics**: Spring-based. Stiffness: 400, Damping: 28 for snappiness without bounce.
- **Entrances**: 300ms staggered fade-in for dashboard cards.
- **Feedback**: Immediate 50ms scale-down on all interactive presses.

## 6. Hero Strategy (Tier A)
The Landing Page uses an **Editorial Type-Only (Tier A)** hero. It anchors the value prop "Automate what happens after every crypto payment" asymmetrically to the left, utilizing the full power of the `text-display` token. No stock vectors or AI slop.

---

## Quality Check Summary
- **AI Slop Check**: PASS. No purple-tinted darks, no neon glows, no pink-cyan gradients.
- **Contrast Check**: PASS. All text exceeds 4.5:1.
- **Hierarchy Check**: PASS. Clear differentiation between `display`, `h1`, and `body` steps.
- **Precision Check**: PASS. 8px spacing rhythm and Major Third type scale enforced.
