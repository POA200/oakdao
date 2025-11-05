import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Zap, Loader2 } from "lucide-react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ALL_LESSONS } from '@/data/lessons'; 
import type { StaticLesson } from "@/types/Lesson";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


// --- Sub-Component: Quiz Section (Simplified for brevity, logic unchanged) ---
// Removed old LessonQuiz; quiz is integrated as a dedicated slide with submit/review flow.


// --- Main Component: Lesson Page ---

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>(); 
  const navigate = useNavigate();
  
  // Find lesson metadata from the local index
  const lessonMeta: StaticLesson | undefined = ALL_LESSONS.find(l => l.slug === slug);

  const [content, setContent] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz] = useState(false); // maintained for backward compatibility, not used
  const [currentSlide, setCurrentSlide] = useState(0);

  // Local Storage Hook
  const [completedLessons, setCompletedLessons] = useLocalStorage<number[]>('completed_lessons', []);

  // Content loading effect (using Vite's raw import)
  // Pre-bundle all markdown files under content using Vite's glob import.
  // This avoids dynamic import warnings and keeps types safe.
  const contentFiles = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

  // Define slide deck based on the lesson slug.
  type Slide = { title: string; body: React.ReactNode };
  const slides: Slide[] = useMemo(() => {
    if (lessonMeta?.slug === 'web3-foundations') {
      return [
        { title: 'The Evolution of the Internet', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>The internet has evolved over the years, like phones transforming from wired boxes to smart devices.</p>
            <div>
              <p className="font-semibold">Web1</p>
              <p>Websites were like posters; you could only read what others posted without interaction.</p>
              <p className="mt-1 text-muted-foreground">Examples: Yahoo, AOL, early Wikipedia.</p>
            </div>
            <div>
              <p className="font-semibold">Web2</p>
              <p>Then came interactive platforms where people could post, comment, and share, but everything created was owned by big companies, not users.</p>
              <p className="mt-1 text-muted-foreground">Examples: Facebook, YouTube, X, Instagram.</p>
            </div>
            <div>
              <p className="font-semibold">Web3</p>
              <p>Now the internet lets people truly own what they create. With crypto, tokens, and NFTs, users can own digital art, coins, and even their online identity.</p>
            </div>
            <p className="italic">The internet evolved from reading → reading + writing → reading + owning + monetizing.</p>
          </div>
        ) },
        { title: 'Welcome to Web3', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>We’ve entered a new era of the internet, one where you are in charge.</p>
            <p>Before now, big companies like Google and Facebook controlled your data and decided what you could see or earn from. But things are changing.</p>
            <p>Web3 is the internet owned by its users. Built on blockchain technology, it removes central control, letting anyone connect, trade, and create freely with full transparency.</p>
          </div>
        ) },
        { title: 'Why Web3 Matters', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>The internet has evolved, and so has our power. Web3 redefines trust, ownership, and opportunity online.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ownership of data and identity: You control your information and assets.</li>
              <li>Censorship resistance: No one can silence or block you.</li>
              <li>Open access: Anyone can join without permission.</li>
              <li>Fair rewards: Creators and users earn directly from their work.</li>
              <li>Transparency: Every action is open and verifiable.</li>
            </ul>
            <div>
              <p className="font-semibold">Real-World Impact</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Artists sell NFTs directly to fans.</li>
                <li>Gamers earn real value from in-game assets.</li>
                <li>Communities fund and govern through DAOs.</li>
                <li>Developers build open protocols for everyone.</li>
              </ul>
            </div>
            <p>Web3 isn’t just the next phase of the internet; it’s the people’s internet — open, fair, and truly ours.</p>
          </div>
        ) },
        { title: 'Blockchain Fundamentals', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>Blockchain is the backbone of Web3, a decentralized system that records information securely across thousands of computers called nodes.</p>
            <p>Instead of one company or bank keeping the records, everyone shares the same digital ledger. Each record, called a block, is linked to the previous one, forming an unchangeable chain of data. This design makes it nearly impossible to cheat, delete, or alter information.</p>
            <div>
              <p className="font-semibold">How Blockchain Works</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>A transaction (like sending crypto or storing data) is created and shared across the network.</li>
                <li>The network’s nodes check if it’s valid using rules called consensus mechanisms (like Proof of Work or Proof of Stake).</li>
                <li>Once verified, the transaction becomes part of a new block that’s permanently added to the chain.</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold">The Core Components</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Blocks: Collections of verified transactions or data.</li>
                <li>Nodes: Computers that store and maintain identical copies of the blockchain.</li>
                <li>Consensus: The method that helps all nodes agree on what’s true without needing a central authority.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Types of Blockchains</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Public: Open for anyone to join and view (e.g., Bitcoin, Ethereum).</li>
                <li>Private: Restricted to a single organization for internal use.</li>
                <li>Hybrid: Combines both, private control with selective public access.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Why It Matters</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Security: Protected by cryptography and decentralized storage.</li>
                <li>Transparency: Anyone can verify activity on the network.</li>
                <li>Immutability: Once added, data can’t be changed or erased.</li>
                <li>Trustless: The system itself guarantees fairness, not people.</li>
              </ul>
            </div>
            <p>Blockchain now powers far more than digital money — supply chains, digital identity, healthcare records, voting systems, and more.</p>
          </div>
        ) },
        { title: 'Understanding Bitcoin', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>Bitcoin is where it all began, the first decentralized digital currency and the foundation of Web3. Created in 2008 by an anonymous figure known as Satoshi Nakamoto, it introduced a way for people to send and store value online without banks or governments.</p>
            <p>It runs on blockchain technology, a public record shared across thousands of computers. No one can alter or delete transactions, and everything is transparent yet private.</p>
            <p>Only 21 million BTC will ever exist, making it scarce like gold but digital, portable, and divisible. Anyone, anywhere can use Bitcoin freely without permission or censorship.</p>
            <div>
              <p className="font-semibold">Why Bitcoin Matters</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Digital Gold: A scarce and secure hedge against inflation.</li>
                <li>Peer-to-Peer Money: Send value directly without intermediaries.</li>
                <li>Foundation for DeFi: Inspired the rise of decentralized finance.</li>
                <li>Innovation Driver: Lightning Network makes it faster, Stacks adds smart contracts.</li>
              </ul>
            </div>
            <p>Bitcoin remains king for its unmatched security, trust, and global adoption.</p>
          </div>
        ) },
        { title: 'Introduction to Stacks', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>Bitcoin is powerful but has some limitations like slow transactions, high fees, no smart contracts, and limited access to DApps. That is where Stacks comes in. It extends Bitcoin’s capabilities without changing Bitcoin itself.</p>
            <div>
              <p className="font-semibold">What is Stacks</p>
              <p>Stacks is the leading Bitcoin Layer 2 that brings smart contracts, NFTs, and decentralized applications to Bitcoin while using it as a secure base layer.</p>
            </div>
            <div>
              <p className="font-semibold">How Stacks Works</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clarity: A transparent and predictable smart contract language built for Bitcoin.</li>
                <li>Stacking: Earn BTC rewards by locking STX tokens to help secure the network.</li>
                <li>sBTC: A Bitcoin-backed asset that moves freely across Bitcoin DeFi apps.</li>
                <li>Proof of Transfer (PoX): Connects Stacks directly to Bitcoin’s security by anchoring its blocks to Bitcoin.</li>
                <li>Smart Contracts: Power DApps that use Bitcoin for transactions and logic.</li>
                <li>Bitcoin DeFi: Enables lending, borrowing, and yield using BTC.</li>
                <li>SIP-010: The token standard for building Bitcoin-based assets on Stacks.</li>
              </ul>
            </div>
          </div>
        ) },
        { title: 'Key Projects on Stacks', body: (
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-semibold">Wallets you can use</p>
              <p>@Xverse, @LeatherBTC, @asignaio, @Ryder_ID, @Ledger, and @boom_wallet + more.</p>
            </div>
            <div>
              <p className="font-semibold">Stacking Platforms</p>
              <p>@Xverse, @LeatherBTC, @TheFastPool</p>
            </div>
            <div>
              <p className="font-semibold">Liquid Stacking</p>
              <p>@StackingDao, @LisaLab_BTC</p>
            </div>
            <div>
              <p className="font-semibold">DeFi on Stacks</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>@ZestProtocol – Lending & borrowing platform on Stacks</li>
                <li>@GraniteBTC – Unlock BTC DeFi via sBTC, no centralized custodians</li>
                <li>@HermeticaFi – Bitcoin-backed stablecoin ($USDh) with approx. 25%+ APR</li>
                <li>@ArkadikoFinance – Mint stablecoins & earn Bitcoin yield through open-source protocols</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">DEXs on Stacks</p>
              <p>@VelarBTC, @Bitflow_Finance, @ALEXLabBTC</p>
            </div>
            <div>
              <p className="font-semibold">Meme Launchpads on Stacks</p>
              <p>@stxcity and @fakfakfun leading the meme wave</p>
            </div>
            <div>
              <p className="font-semibold">Tools</p>
              <p>@stx – Real-time trading analytics for tokens and NFTs</p>
              <p>@stxwatch – Live intelligence on tokens, wallets, and market activity</p>
            </div>
            <div>
              <p className="font-semibold">GameFi on Stacks</p>
              <p>@SkullcoinBTC – Find-to-earn gaming model</p>
              <p>@stxcity – Lottery-style game</p>
              <p>@stackswars – Time-based word battles using skill and strategy</p>
            </div>
            <div>
              <p className="font-semibold">Builders & Ecosystem Tools</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>@hirosystems – Built hiro.so to simplify dev building on Stacks</li>
                <li>@LunarCrush – Social metrics and market data</li>
                <li>@signal21btc – Deep research and data for Bitcoin L1 & L2</li>
                <li>@trygamma – NFT platform supporting @Stacks</li>
                <li>@aibtcdev – First AI-powered agent on Stacks</li>
                <li>@blocksurvey – Web3 forms and survey tools</li>
                <li>@easya_app – Learn and build on Stacks easily</li>
                <li>@boostx_app – Tip or get tipped directly on X</li>
                <li>@DeOrganizedBTC – The media hub covering Bitcoin and Stacks</li>
              </ul>
            </div>
          </div>
        ) },
        { title: 'Web3 Tools & Infrastructure', body: (
          <div className="space-y-4 text-sm sm:text-base">
            <p>Web3 is where users take control, no middlemen, just code, wallets, and freedom.</p>
            <div>
              <p className="font-semibold">Wallets (Xverse, Leather)</p>
              <p>Your key to the decentralized world.</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><span className="font-medium">Xverse</span>: Built for Bitcoin and Stacks — supports Ordinals, Runes, NFTs, and DeFi.</li>
                <li><span className="font-medium">Leather</span>: Open-source wallet linking Bitcoin to Layer 2s with smooth UX and security.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Decentralized Storage (IPFS, Arweave)</p>
              <p>Where data lives forever.</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><span className="font-medium">IPFS</span>: Fast and open storage for NFTs and dApps.</li>
                <li><span className="font-medium">Arweave</span>: “Pay once, store forever” — perfect for permanent data.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">DAOs</p>
              <p>Community-run organizations that make decisions through tokens, not CEOs.</p>
            </div>
            <div>
              <p className="font-semibold">Oracles (Chainlink, Pyth)</p>
              <p>They feed real-world data (like prices or weather) to smart contracts so apps can react in real time.</p>
            </div>
            <p>Web3 tools put control, ownership, and transparency back in your hands.</p>
          </div>
        ) },
        { title: 'Career Opportunities in Web3', body: (
          <div className="space-y-3 text-sm sm:text-base">
            <p>Web3 is full of open doors, no degree needed, just skills and consistency.</p>
            <div>
              <p className="font-semibold">Paths to explore:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Developers: Build smart contracts and dApps.</li>
                <li>Designers: Create clean, simple Web3 experiences.</li>
                <li>Community & Marketing: Grow real communities, not followers.</li>
                <li>Writers & Educators: Teach, explain, and onboard people into crypto.</li>
                <li>Builders: Start something of your own — that’s the real Web3 spirit.</li>
              </ul>
            </div>
            <p>If you can learn fast, you can lead here.</p>
          </div>
        ) },
        { title: 'Staying Safe in Web3', body: (
          <div className="space-y-2 text-sm sm:text-base">
            <p>Freedom in Web3 comes with responsibility.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Never share your seed phrase — it’s your money.</li>
              <li>Always double-check links before connecting.</li>
              <li>Watch out for fake airdrops or rug pulls.</li>
              <li>Use hardware wallets for large funds.</li>
              <li>Follow only verified community channels.</li>
            </ul>
            <p>You are your own bank, protect yourself like one.</p>
          </div>
        ) },
        { title: 'Hands-On Activities', body: (
          <div className="space-y-2 text-sm sm:text-base">
            <p>The best way to learn Web3 is by doing it yourself. Try these:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create a Stacks wallet using Xverse</li>
              <li>Send a small test transaction</li>
              <li>Visit Gamma.io and mint a free NFT</li>
              <li>Explore DeFi on Stacks using StackingDAO, Zest Protocol, Bitflow, Velar, or Arkadiko</li>
              <li>Join the Stacks Discord and chat with the community</li>
            </ul>
            <p>Learning by doing helps you truly understand how blockchain works.</p>
          </div>
        ) },
        { title: 'The Bigger Picture', body: (
          <div className="space-y-2 text-sm sm:text-base">
            <p>When you step back, you’ll see that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Web3 is about owning your data and having freedom online</li>
              <li>Blockchain makes it all possible by removing the need for middlemen</li>
              <li>Bitcoin is the strong base that keeps everything secure</li>
              <li>Stacks connects Bitcoin to smart contracts and apps</li>
            </ul>
            <p>Together, they’re building a new kind of internet that is open, fair, and unstoppable.</p>
          </div>
        ) },
        { title: 'Thank You & Next Steps', body: (
          <div className="space-y-2 text-sm sm:text-base">
            <p>This is just the beginning of your Web3 journey. Keep exploring and building.</p>
            <div>
              <p className="font-semibold">Next Steps:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Visit stacks.co and stacks.org to learn more</li>
                <li>Join the Stacks community on Discord and X</li>
                <li>Learn Clarity, the coding language for Bitcoin apps</li>
                <li>Stay curious because the Web3 future belongs to the builders</li>
              </ul>
            </div>
            <p className="italic">Welcome to Web3 — Powered by Stacks. Secured by Bitcoin.</p>
          </div>
        ) },
      ];
    }
    return [];
  }, [lessonMeta]);

  useEffect(() => {
    if (!lessonMeta) {
      // Handle case where URL slug does not match any lesson
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    const key = `../content/${lessonMeta.contentPath}`;
    const load = contentFiles[key];
    if (!load) {
      console.error('Markdown file not found for key:', key);
      setContent('# Error: Content File Not Found');
      setIsLoading(false);
      return;
    }

    load()
      .then((raw) => {
        if (typeof raw === 'string' && raw.length > 0) {
          setContent(raw);
        } else {
          setContent('# Error: Content Failed to Load or is Empty');
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Failed to load lesson content:', e);
        setContent('# Error: Content File Not Found');
        setIsLoading(false);
      });
  }, [lessonMeta, navigate, contentFiles]);


  // Handler for when the user completes the quiz
  // Deprecated: previous quiz completion handler now handled in submit flow


  if ((slides.length === 0 && isLoading) || !lessonMeta) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const isLessonCompleted = completedLessons.includes(lessonMeta.id);

  const hasSlides = slides.length > 0;
  const atFirst = currentSlide === 0;
  const atLast = hasSlides && currentSlide === slides.length - 1;

  // Quiz state for the dedicated quiz slide (currentSlide === slides.length)
  const totalQuiz = lessonMeta?.quizJson.length ?? 0;
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Reset quiz state when lesson changes or when entering quiz slide
    const init = new Array(totalQuiz).fill(-1);
    setAnswers(init);
    setQIndex(0);
    setSubmitted(false);
  }, [totalQuiz, lessonMeta?.slug]);

  const selectAnswer = (idx: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[qIndex] = idx;
      return next;
    });
  };

  const canSubmit = totalQuiz > 0 && qIndex === totalQuiz - 1 && answers.every(a => a !== -1);
  const computeScore = () => {
    if (!lessonMeta) return { score: 0, missed: [] as number[] };
    let s = 0; const missed: number[] = [];
    lessonMeta.quizJson.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) s++; else missed.push(i);
    });
    return { score: s, missed };
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 max-w-4xl">
      <Button asChild variant="link" className="px-0 h-auto text-sm mb-6">
        <Link to="/dashboard" className="flex items-center">&larr; Back to Dashboard</Link>
      </Button>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
        {lessonMeta.title}
      </h1>

      {isLessonCompleted && (
        <p className="mb-6 text-green-600 dark:text-green-400 font-medium">
          You have completed this lesson!
        </p>
      )}

      {/* Content slides */}
      {!showQuiz && hasSlides && currentSlide < slides.length && (
        <>
          <div className="mb-4">
            <Progress value={((currentSlide) / slides.length) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Slide {currentSlide + 1} of {slides.length}</p>
          </div>
          <Card className="mx-auto shadow-md">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{slides[currentSlide].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[10rem] sm:min-h-[14rem] leading-relaxed">
                {slides[currentSlide].body}
              </div>
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
                <Button className="w-full sm:w-auto" variant="outline" disabled={atFirst} onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}>
                  Prev
                </Button>
                {!atLast ? (
                  <Button className="w-full sm:w-auto" onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}>
                    Next
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground" onClick={() => setCurrentSlide(slides.length)}>
                    <Zap className="h-4 w-4 mr-2" /> Take AI Quiz
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Fallback to markdown for lessons without defined slides */}
      {!showQuiz && !hasSlides && (
        <div className="prose dark:prose-invert max-w-none pb-12 border-b dark:border-gray-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {/* Quiz slide: appears as the last slide index (slides.length) */}
      {hasSlides && currentSlide === slides.length && (
        <>
        <Card className="mx-auto shadow-md mt-4">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            {totalQuiz === 0 ? (
              <p className="text-sm text-muted-foreground">No quiz is available for this lesson.</p>
            ) : (
              <>
                {!submitted ? (
                  <>
                    <div className="mb-4">
                      <Progress value={((qIndex + 1) / totalQuiz) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">Question {qIndex + 1} of {totalQuiz}</p>
                    </div>
                    <p className="mb-4 font-semibold text-lg">{lessonMeta.quizJson[qIndex].question}</p>
                    <div className="space-y-3">
                      {lessonMeta.quizJson[qIndex].options.map((opt, idx) => {
                        const selected = answers[qIndex] === idx;
                        return (
                          <Button
                            key={idx}
                            onClick={() => selectAnswer(idx)}
                            variant={selected ? 'default' : 'outline'}
                            className="w-full justify-start h-auto p-4 text-base"
                          >
                            <span className="font-mono mr-3">[{String.fromCharCode(65 + idx)}]</span>
                            {opt}
                          </Button>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Button className="w-full sm:w-auto" variant="outline" disabled={qIndex === 0} onClick={() => setQIndex(i => Math.max(0, i - 1))}>Prev</Button>
                      {qIndex < totalQuiz - 1 ? (
                        <Button className="w-full sm:w-auto" onClick={() => setQIndex(i => Math.min(totalQuiz - 1, i + 1))}>Next</Button>
                      ) : (
                        <Button className="w-full sm:w-auto" disabled={!canSubmit} onClick={() => {
                          setSubmitted(true);
                          const { score } = computeScore();
                          // Save completion if passed
                          const passing = Math.ceil(totalQuiz / 2);
                          if (lessonMeta && score >= passing && !completedLessons.includes(lessonMeta.id)) {
                            setCompletedLessons([...completedLessons, lessonMeta.id]);
                          }
                        }}>Submit Quiz</Button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {(() => {
                      const { score, missed } = computeScore();
                      return (
                        <div>
                          <div className="mb-4">
                            <Progress value={(score / totalQuiz) * 100} className="h-2" />
                            <p className="text-sm mt-2">Score: <span className="font-semibold">{score}</span> / {totalQuiz}</p>
                          </div>
                          {missed.length === 0 ? (
                            <p className="text-green-600 dark:text-green-400">Perfect! You answered all questions correctly.</p>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">Review the correct answers for the questions you missed:</p>
                              {missed.map((mi) => (
                                <div key={mi} className="border rounded-md p-3">
                                  <p className="font-medium">Q{mi + 1}. {lessonMeta!.quizJson[mi].question}</p>
                                  <p className="text-sm mt-1">Your answer: <span className="font-mono">{answers[mi] !== -1 ? String.fromCharCode(65 + answers[mi]) : '—'}</span></p>
                                  <p className="text-sm mt-1">Correct answer: <span className="font-mono">{String.fromCharCode(65 + lessonMeta!.quizJson[mi].correctAnswerIndex)}</span> — {lessonMeta!.quizJson[mi].options[lessonMeta!.quizJson[mi].correctAnswerIndex]}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <Button className="w-full sm:w-auto" variant="outline" onClick={() => { setSubmitted(false); setAnswers(new Array(totalQuiz).fill(-1)); setQIndex(0); }}>Retake Quiz</Button>
                            <Button className="w-full sm:w-auto" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
        <div className="mt-3">
          <Button variant="link" className="px-0" onClick={() => setCurrentSlide(Math.max(0, slides.length - 1))}>
            &larr; Back to lesson
          </Button>
        </div>
        </>
      )}
    </div>
  );
}