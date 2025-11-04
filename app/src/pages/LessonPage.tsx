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
        { title: 'Key Projects in the Stacks Ecosystem', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>ALEX (DeFi), Arkadiko (loans), StackingDAO (stacking)</li>
            <li>Gamma.io (NFTs), Zest Protocol (BTC-native lending)</li>
            <li>CityCoins (MIA/NYC), Hiro & Xverse (dev tools & wallets)</li>
          </ul>
        ) },
        { title: 'Web3 Tools & Infrastructure', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Wallets: Xverse, Leather, Hiro</li>
            <li>Decentralized storage: IPFS, Arweave</li>
            <li>DAOs for governance; Oracles for real-world data</li>
          </ul>
        ) },
        { title: 'Career Opportunities in Web3', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Developers (smart contracts, DApps), designers, PMs</li>
            <li>Community, marketing, education, and content</li>
          </ul>
        ) },
        { title: 'Staying Safe in Web3', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Never share seed phrases or private keys</li>
            <li>Verify links; beware phishing and rug pulls</li>
            <li>Use hardware wallets for large funds</li>
          </ul>
        ) },
        { title: 'Hands-On Activities', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Create and fund a Stacks wallet</li>
            <li>Send a transaction; mint an NFT on Gamma.io</li>
            <li>Try DeFi on ALEX or Arkadiko; join the community</li>
          </ul>
        ) },
        { title: 'The Bigger Picture', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Web3 = ownership and freedom</li>
            <li>Blockchain = trustless systems</li>
            <li>Bitcoin = foundation; Stacks = future of Bitcoin utility</li>
          </ul>
        ) },
        { title: 'Thank You & Next Steps', body: (
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Explore: stacks.co</li>
            <li>Join: Stacks Discord, Xverse, or community spaces</li>
            <li>Build: Try Clarity and launch your first DApp</li>
          </ul>
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
              <CardTitle className="text-2xl">{slides[currentSlide].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[12rem] sm:min-h-[14rem] leading-relaxed">
                {slides[currentSlide].body}
              </div>
              <div className="mt-6 flex items-center justify-between gap-2">
                <Button variant="outline" disabled={atFirst} onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}>
                  Prev
                </Button>
                {!atLast ? (
                  <Button onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={() => setCurrentSlide(slides.length)} className="bg-primary text-primary-foreground">
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
                    <div className="mt-6 flex items-center justify-between gap-2">
                      <Button variant="outline" disabled={qIndex === 0} onClick={() => setQIndex(i => Math.max(0, i - 1))}>Prev</Button>
                      {qIndex < totalQuiz - 1 ? (
                        <Button onClick={() => setQIndex(i => Math.min(totalQuiz - 1, i + 1))}>Next</Button>
                      ) : (
                        <Button disabled={!canSubmit} onClick={() => {
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
                          <div className="mt-6 flex items-center justify-between gap-2">
                            <Button variant="outline" onClick={() => { setSubmitted(false); setAnswers(new Array(totalQuiz).fill(-1)); setQIndex(0); }}>Retake Quiz</Button>
                            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
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