import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Lock, FileText } from "lucide-react";
import type { StaticLesson, QuizQuestion } from '@/types/Lesson';

// --- Configuration ---
// Get the admin key from the environment (must match the backend expectation, even if we removed the backend)
const ADMIN_SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET || 'DEFAULT_ADMIN_KEY'; 

// Mock function for AI Quiz Generation (Since we are static, this is a placeholder)
const generateQuiz = (content: string): QuizQuestion[] => {
  // In the real AI phase, a script would send `content` to OpenAI/Gemini
  // and return the structured JSON here. For now, it's mock data.
  return [
    { id: 1, question: `AI-Generated Q1 based on ${content.substring(0, 15)}...`, options: ["Option A", "Option B (Correct)"], correctAnswerIndex: 1 },
    { id: 2, question: `AI-Generated Q2 based on content length: ${content.length}`, options: ["True", "False"], correctAnswerIndex: 0 },
  ];
};


export default function AdminUpload() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: '',
    summary: '',
    markdownContent: '',
  });
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[] | null>(null);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'info' | 'success' | 'error'>('info');

  const isAuthenticated = useMemo(() => isAuth || password === ADMIN_SECRET_KEY, [isAuth, password]);

  const handleAuth = () => {
    if (password === ADMIN_SECRET_KEY) {
      setIsAuth(true);
      setStatus('success');
      setOutput("Access granted! Start creating lessons.");
    } else {
      setStatus('error');
      setOutput("Invalid key. Access denied.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLessonData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Reset quiz/output on content change
    setGeneratedQuiz(null);
    setOutput('');
    setStatus('info');
  };

  const handleGenerateQuiz = () => {
    if (!lessonData.markdownContent) {
      setStatus('error');
      setOutput('Please add lesson content before generating the quiz.');
      return;
    }
    const quiz = generateQuiz(lessonData.markdownContent);
    setGeneratedQuiz(quiz);
    setStatus('success');
    setOutput(`Successfully generated ${quiz.length} quiz questions. Review and finalize below.`);
  };

  const handleFinalizeLesson = () => {
    if (!lessonData.title || !lessonData.summary || !generatedQuiz) {
      setStatus('error');
      setOutput('Please fill out all fields and generate the quiz before finalizing.');
      return;
    }

    // --- 1. Generate Static Metadata ---
    const newId = new Date().getTime(); // Simple unique ID
    const slug = lessonData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const filename = `${newId}-${slug}.md`;
    const createdAt = new Date().toISOString();

    const newLessonMetadata: StaticLesson = {
      id: newId,
      title: lessonData.title,
      slug: slug,
      summary: lessonData.summary,
      contentPath: filename,
      createdAt: createdAt,
      quizJson: generatedQuiz,
    };

    // --- 2. Generate Final Output for Admin to Copy/Paste ---
    const metadataString = JSON.stringify(newLessonMetadata, null, 2).replace(/"([^"]+)":/g, '$1:');
    
    setOutput(
      `SUCCESS! Copy the content below and paste it into the correct files:\n\n` +
      `\n--- A. Markdown File (app/src/content/${filename}) ---\n` +
      lessonData.markdownContent +
      `\n\n--- B. Lesson Metadata (app/src/data/lessons.ts) ---\n` +
      `// Append this object to the ALL_LESSONS array:\n` +
      metadataString
    );
    setStatus('success');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Lock className="mr-2 h-5 w-5 text-destructive" /> Admin Portal Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">This portal is protected by a key defined in the .env file.</p>
            <div className="space-y-2">
              <Label htmlFor="admin-key">Secret Key</Label>
              <Input 
                id="admin-key" 
                type="password" 
                placeholder="Enter Admin Key" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            <Button onClick={handleAuth} className="w-full" variant="default">
              Authenticate
            </Button>
            <Button onClick={() => navigate('/dashboard')} className="w-full" variant="secondary">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Authenticated View ---
  return (
    <div className="container mx-auto py-12 max-w-6xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8 dark:text-white flex items-center">
        <FileText className="mr-3 h-8 w-8 text-primary" /> Lesson Creation Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === COLUMN 1: INPUTS === */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input id="title" name="title" value={lessonData.title} onChange={handleChange} placeholder="e.g., The Fundamentals of Layer 2 Scaling" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Summary (Dashboard Snippet)</Label>
                <Textarea id="summary" name="summary" value={lessonData.summary} onChange={handleChange} placeholder="A brief, one-sentence description." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Markdown Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                name="markdownContent" 
                rows={15} 
                value={lessonData.markdownContent} 
                onChange={handleChange} 
                placeholder="# Lesson Title\n\nWrite your full lesson content using Markdown here, including headers, lists, and code blocks."
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
          
          <div className="space-y-4">
             <Button onClick={handleGenerateQuiz} className="w-full py-6 text-lg" variant="secondary">
                Simulate AI Quiz Generation
             </Button>

             <Button onClick={handleFinalizeLesson} className="w-full py-6 text-lg" variant="default">
                Finalize & Generate Copy/Paste Code
             </Button>
          </div>
        </div>

        {/* === COLUMN 2: OUTPUTS & PREVIEW === */}
        <div className="space-y-6">
            
            {/* Live Markdown Preview */}
            <Card>
                <CardHeader><CardTitle>Markdown Preview</CardTitle></CardHeader>
                <CardContent>
                    <div className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md min-h-24">
                        <ReactMarkdown>{lessonData.markdownContent || "Start typing in the Markdown Content box to see a live preview."}</ReactMarkdown>
                    </div>
                </CardContent>
            </Card>

            {/* Quiz Preview */}
            {generatedQuiz && (
                <Card>
                    <CardHeader><CardTitle>Generated Quiz Preview ({generatedQuiz.length} Questions)</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal pl-5 space-y-4">
                            {generatedQuiz.map((q, index) => (
                                <li key={q.id || index} className="font-semibold text-sm">
                                    {q.question}
                                    <ul className="list-none pl-0 mt-1 space-y-1 text-xs font-normal">
                                        {q.options.map((opt, i) => (
                                            <li key={i} className={i === q.correctAnswerIndex ? 'text-green-500 font-medium' : 'text-muted-foreground'}>
                                                {i === q.correctAnswerIndex ? '✅' : '•'} {opt}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>
            )}

            {/* Final Output/Log */}
            {output && (
                <Alert variant={status === 'error' ? 'destructive' : 'default'} className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{status === 'success' ? 'SUCCESS' : status === 'error' ? 'ERROR' : 'LOG'}</AlertTitle>
                    <AlertDescription>
                        <pre className="whitespace-pre-wrap text-sm font-mono p-2 bg-background/50 border rounded-md overflow-x-auto">
                            {output}
                        </pre>
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </div>
    </div>
  );
}