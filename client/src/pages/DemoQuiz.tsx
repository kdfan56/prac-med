import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, Lightbulb, ArrowRight, Lock } from 'lucide-react';
import { fetchDemoQuestions, type Question } from '../services/questionServices';

export default function DemoQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDemoQuestions()
      .then((data) => {
        if (data.length === 0) {
          setError('No demo questions available.');
        } else {
          setQuestions(data);
        }
      })
      .catch(() => setError('Failed to load demo questions.'))
      .finally(() => setLoading(false));
  }, []);

  const question = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  };

  // ── Loading ────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  // ── Error ──────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-sm text-danger font-medium">{error}</p>
        <Link to="/" className="btn-primary inline-block">Back to Home</Link>
      </div>
    );
  }

  // ── Demo Complete → Funnel to signup ───────────
  if (currentIndex >= questions.length) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text">
          You've finished the demo!
        </h2>
        <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
          That was {questions.length} sample questions. Sign up for free to access
          the full question bank with hundreds of MRCS MCQs across every specialty.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/signup"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-3"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* ── Demo banner ─────────────────────────── */}
      <div className="mb-6 bg-accent/8 border border-accent/20 rounded-lg px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs font-semibold text-accent">
          Demo Mode — {questions.length} sample questions
        </span>
        <Link to="/signup" className="text-xs font-semibold text-primary hover:underline">
          Sign up for full access
        </Link>
      </div>

      {/* ── Progress Bar ────────────────────────── */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="font-medium text-primary">{question.chapter}</span>
        </div>
        <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Stem ────────────────────────────────── */}
      <div className="card mb-6">
        <p className="text-sm sm:text-base leading-relaxed text-text">
          {question.stem}
        </p>
      </div>

      {/* ── Options ─────────────────────────────── */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          let optionStyle = 'border-border bg-surface hover:border-primary/40 cursor-pointer';

          if (isAnswered) {
            if (option === question.correctAnswer) {
              optionStyle = 'border-success bg-success-light';
            } else if (option === selectedAnswer) {
              optionStyle = 'border-danger bg-danger-light';
            } else {
              optionStyle = 'border-border bg-surface opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
              className={`w-full text-left rounded-lg border px-4 py-3 flex items-start gap-3 transition-all ${optionStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  isAnswered && option === question.correctAnswer
                    ? 'bg-success text-white'
                    : isAnswered && option === selectedAnswer
                    ? 'bg-danger text-white'
                    : 'bg-surface-alt text-text-muted border border-border'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm leading-relaxed text-text">{option}</span>

              {isAnswered && option === question.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-success ml-auto shrink-0 mt-0.5" />
              )}
              {isAnswered && option === selectedAnswer && option !== question.correctAnswer && (
                <XCircle className="w-4 h-4 text-danger ml-auto shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Rationale ───────────────────────────── */}
      {isAnswered && (
        <div className="space-y-4">
          <div
            className={`rounded-lg px-4 py-3 flex items-center gap-3 text-sm font-medium ${
              isCorrect
                ? 'bg-success-light text-success border border-success/20'
                : 'bg-danger-light text-danger border border-danger/20'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 shrink-0" />
            )}
            {isCorrect ? 'Correct!' : `Incorrect — the answer is: ${question.correctAnswer}`}
          </div>

          <div className="card bg-surface-alt border-border">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">
              Rationale
            </h4>
            <p className="text-sm leading-relaxed text-text">{question.rationale}</p>
          </div>

          {question.highYieldSummary && (
            <div className="card bg-accent/5 border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wide text-accent">
                  High-Yield Summary
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-text">{question.highYieldSummary}</p>
            </div>
          )}

          <div className="pt-2">
            {isLastQuestion ? (
              <button onClick={handleNext} className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                See Results
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
