import { Link } from 'react-router-dom';
import { ArrowRight, Target, Brain, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* ── Hero ────────────────────────────────── */}
      <section className="px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">
            MRCS Exam Preparation
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-text">
            Master your MRCS.{' '}
            <span className="text-primary">One question at a time.</span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            Clinically authored questions with detailed rationales and
            high-yield summaries — designed to mirror the real exam experience.
          </p>

          <Link
            to="/categories"
            className="btn-primary inline-flex items-center gap-2 mt-2"
          >
            Start Preparing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Value Props ─────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ValueCard
            icon={<Target className="w-5 h-5 text-primary" />}
            title="Exam-Focused"
            description="Questions mapped to the MRCS syllabus with source and chapter tagging for targeted revision."
          />
          <ValueCard
            icon={<Brain className="w-5 h-5 text-primary" />}
            title="Deep Rationales"
            description="Every option explained — understand why each answer is right or wrong, not just the correct choice."
          />
          <ValueCard
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            title="High-Yield Notes"
            description="Concise revision pearls after every question so you retain the most testable facts."
          />
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card flex flex-col items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}