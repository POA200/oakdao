// app/src/data/lessons.ts
import type { StaticLesson } from '../types/Lesson';

// --- The Master Index ---
// Primary course: Web3 Foundations
export const ALL_LESSONS: StaticLesson[] = [
  {
    id: 1,
    title: "Web3 Foundations: From Web1 to Stacks",
    slug: "web3-foundations",
    summary: "A guided journey through the evolution of the internet, Bitcoin, and Stacks—why Web3 matters and how to get hands-on.",
    contentPath: "1-web3-foundations.md",
    createdAt: "2025-11-04T00:00:00Z",
    quizJson: [
      {
        id: 1,
        question: "Which sequence best describes the internet's evolution?",
        options: [
          "Read → Own → Read+Write",
          "Read → Read+Write → Read+Own",
          "Read+Write → Read → Read+Own",
          "Read+Own → Read+Write → Read"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 2,
        question: "What is Web3 in simple terms?",
        options: [
          "A faster version of Web2 owned by big tech",
          "The internet owned by its users, built on blockchains",
          "An offline network for private browsing",
          "A social media-only layer of the web"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "Which principle is central to Web3?",
        options: [
          "Censorship by a central authority",
          "Users renting access to their data",
          "Ownership of data and identity by users",
          "Closed, permissioned access for everyone"
        ],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: "What does a consensus mechanism do in a blockchain network?",
        options: [
          "Compresses data for storage",
          "Helps nodes agree on valid transactions without a central authority",
          "Hides transactions from public view",
          "Generates private keys for users"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 5,
        question: "How many BTC will ever exist?",
        options: ["10 million", "21 million", "50 million", "Unlimited"],
        correctAnswerIndex: 1
      },
      {
        id: 6,
        question: "Which mechanism connects Stacks to Bitcoin's security?",
        options: ["Proof of Stake (PoS)", "Proof of Work (PoW)", "Proof of Transfer (PoX)", "Practical Byzantine Fault Tolerance (PBFT)"],
        correctAnswerIndex: 2
      }
      ,
      {
        id: 7,
        question: "Which of the following is a DEX on Stacks?",
        options: ["VelarBTC", "Gamma.io", "Chainlink", "Leather"],
        correctAnswerIndex: 0
      },
      {
        id: 8,
        question: "Which statement about decentralized storage is true?",
        options: [
          "IPFS is 'pay once, store forever' while Arweave is for fast retrieval",
          "Arweave is 'pay once, store forever' while IPFS provides distributed file addressing",
          "Both IPFS and Arweave are centralized cloud providers",
          "Neither IPFS nor Arweave are used in Web3"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 9,
        question: "Which is a common career path in Web3?",
        options: [
          "Smart contract and dApp developer",
          "CEO of a centralized bank",
          "Fax machine operator",
          "DVD rental store manager"
        ],
        correctAnswerIndex: 0
      },
      {
        id: 10,
        question: "Which is a recommended safety practice in Web3?",
        options: [
          "Share your seed phrase with support",
          "Always double-check links before connecting",
          "Click unverified airdrop links to qualify",
          "Store large funds in browser local storage"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 11,
        question: "Which of these is a hands-on activity to learn Web3?",
        options: [
          "Mint a free NFT on Gamma.io",
          "Memorize coin tickers only",
          "Read about Web3 without trying apps",
          "Disable your wallet to stay safe"
        ],
        correctAnswerIndex: 0
      },
      {
        id: 12,
        question: "Which pairing is correct?",
        options: [
          "Stacks removes Bitcoin from the equation",
          "Bitcoin is the foundation; Stacks connects it to smart contracts",
          "Web3 means companies own your data",
          "Blockchain relies on CEOs to approve transactions"
        ],
        correctAnswerIndex: 1
      },
      {
        id: 13,
        question: "Which is a suggested next step after this lesson?",
        options: [
          "Learn Clarity to build Bitcoin apps",
          "Avoid all communities and tools",
          "Wait for permission from a central authority",
          "Use Web3 only for memes"
        ],
        correctAnswerIndex: 0
      }
    ],
  },
];