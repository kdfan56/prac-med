import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Brain,
  TrendingUp,
  Shield,
  BookOpen,
  Users,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* ── Hero ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

        <div className="relative px-4 pt-16 pb-20 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-4 py-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide uppercase text-primary">
                Trusted by MRCS Candidates
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] text-text tracking-tight">
              Ace your MRCS exam{' '}
              <span className="relative">
                <span className="text-primary">with confidence</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/60 rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
              Clinically authored MCQs with detailed explanations, high-yield
              summaries, and source-mapped revision — built by surgeons, for
              surgeons.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                to="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-base"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/demo"
                className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-3 text-base"
              >
                Try Demo Questions
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-text-muted">
              <span className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Free to start
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                MRCS Part A & B coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <StatItem value="500+" label="MCQs" />
          <StatItem value="12" label="Chapters" />
          <StatItem value="98%" label="Pass Rate" />
          <StatItem value="24/7" label="Access" />
        </div>
      </section>

      {/* ── Value Props ─────────────────────────── */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text">
              Everything you need to pass
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-md mx-auto">
              A focused, no-fluff question bank designed around how surgeons
              actually learn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Target className="w-5 h-5 text-primary" />}
              title="Exam-Mapped Questions"
              description="Every question tagged by source, chapter, and sub-specialty so you can drill exactly where you're weakest."
            />
            <FeatureCard
              icon={<Brain className="w-5 h-5 text-primary" />}
              title="Deep Rationales"
              description="Every option explained — understand why each answer is right or wrong, not just the correct choice."
            />
            <FeatureCard
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
              title="High-Yield Pearls"
              description="Concise revision summaries after every question — the key facts you need on exam day."
            />
            <FeatureCard
              icon={<BookOpen className="w-5 h-5 text-primary" />}
              title="Source-Linked"
              description="Questions mapped to Bailey & Love's, SBA books, and official MRCS resources for deeper reading."
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5 text-primary" />}
              title="Clinically Authored"
              description="Written and reviewed by practising surgeons and MRCS examiners. No AI-only generated content."
            />
            <FeatureCard
              icon={<Users className="w-5 h-5 text-primary" />}
              title="Progress Tracking"
              description="See your accuracy by chapter and category. Focus your time where it counts most."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto bg-primary rounded-xl px-6 py-10 sm:px-12 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Ready to start revising?
          </h2>
          <p className="text-sm text-white/70 mt-3 max-w-md mx-auto">
            Join hundreds of surgical trainees preparing smarter for their MRCS
            exams.
          </p>
          <Link
            to="/signup"
            className="mt-6 inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
          >
            Sign Up — It's Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="border-t border-border bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} MRCS Prep. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-text transition-colors">Terms</a>
            <a href="#" className="hover:text-text transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────── */

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({
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
      <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}