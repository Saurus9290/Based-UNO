# Decentralized UNO Card Game

We have developed a decentralized UNO card game leveraging **Polygon zkEVM**. By utilizing the robust blockchain capabilities of Polygon zkEVM and integrating a privacy layer, we have created a secure, transparent, and fair card gaming environment that adheres to the principles of Web3. Additionally, a **custom staking mechanism** has been implemented using the **Coinbase CDP SDK**, requiring players to stake coins before joining the game.

## Problem:
Traditional online card games face significant trust issues. Players often question the fairness of the game due to potential manipulation on centralized platforms. Moreover, the visibility of players’ hands and decks may compromise game integrity, granting some players unfair advantages.

## Solution:
Our decentralized UNO card game, built on **Polygon zkEVM** with a privacy layer, solves these issues:
- **Transparency**: All game mechanics are decentralized, verifiable, and tamper-proof.
- **Privacy**: The privacy layer ensures that players’ hands and the deck remain hidden.
- **Fairness**: A commit-and-reveal mechanism ensures all moves are verifiable without compromising privacy.
- **Staking**: Players must stake coins to join the game, adding an economic incentive for fairness and participation.

## Detailed Project Description

### Game Logic:

1. **Decentralized Gameplay**: 
   - Core game logic, including card shuffling, dealing, and turn management, is implemented on-chain using Solidity smart contracts deployed on Polygon zkEVM.
   - Ensures transparency and immutability of game actions.

2. **Game State Management**:
   - The game state (e.g., current turn, remaining cards, and played cards) is managed on-chain for consistency and real-time availability.
   - State updates occur after every validated player action, such as drawing or playing a card.
   - Synchronization across clients is facilitated using **Socket.io** for seamless updates.

3. **Action Validation**:
   - Each action is validated on-chain to ensure adherence to game rules. Invalid actions are rejected, preserving game integrity.

4. **State Verification**:
   - The entire game state is reconstructible from on-chain transaction history, allowing players to audit the game at any time.

### Privacy Layer:

1. **Confidential Hands and Decks**:
   - Player hands and the remaining deck are encrypted, with hashed references stored on-chain.
   - Sensitive game data is visible only to the respective player, maintaining privacy.

2. **Cryptographic Operations**:
   - Secure encryption and decryption ensure the confidentiality of game data.
   - Decks are shuffled using cryptographic algorithms to guarantee randomness.

3. **Commit-and-Reveal Mechanism**:
   - Players commit to their actions by submitting a hash of their intended move.
   - After all commitments, actions are revealed to ensure fairness.

### Staking Integration:

1. **Custom Staking Solution**:
   - Using **Coinbase CDP SDK**, players are required to stake coins before joining the game.
   - Staked amounts act as a commitment to fair play and can be reclaimed upon game completion or penalized for violations.
   
2. **Stake Management**:
   - Staking and reward mechanisms are implemented via smart contracts on Polygon zkEVM.
   - The CDP SDK is integrated into the backend to handle staking transactions.

## How It's Made:

#### Smart Contracts:
- Written in Solidity, deployed on Polygon zkEVM for:
  - Game logic (card dealing, turn management, action validation).
  - Staking mechanisms and reward distribution.

#### Privacy Layer:
- Encrypted decks and hands ensure sensitive game data is protected.
- Utilizes cryptographic commitments for fairness without compromising privacy.

#### Frontend:
- Built with **Next.js** and styled using **Tailwind CSS** for a seamless user experience.
- Wallet integrations allow players to interact with smart contracts and stake coins.

#### Backend:
- **Socket.io** is used to synchronize game state in real-time across players.
- Staking functionality is integrated using Coinbase CDP SDK for managing deposits and rewards.

## Setup Instructions

### Frontend (Next.js app)

1. Navigate to the `unogameui` folder:
   ```bash
   cd unogameui
