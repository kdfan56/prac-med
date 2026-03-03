import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Ear, Stethoscope, Mic } from 'lucide-react';

interface CategoryCard {
  label: string;
  description: string;
  questionCount?: string;
  icon: React.ReactNode;
  params: Record<string, string>;
}

const categories: CategoryCard[] = [
  {
    label: 'Otology',
    description: "Ménière's disease, temporal bone fractures, facial nerve, and hearing assessment.",
    questionCount: '2 Qs',
    icon: <Ear className="w-4 h-4 text-primary" />,
    params: { chapter: 'Otology' },
  },
  {
    label: 'Head & Neck',
    description: 'Salivary gland tumours, oral cavity malignancies, and neck masses.',
    questionCount: '2 Qs',
    icon: <Stethoscope className="w-4 h-4 text-primary" />,
    params: { chapter: 'Head & Neck' },
  },
  {
    label: 'Laryngology',
    description: 'Vocal cord paralysis, laryngeal EMG, and airway management.',
    questionCount: '1 Q',
    icon: <Mic className="w-4 h-4 text-primary" />,
    params: { chapter: 'Laryngology' },
  },
  {
    label: 'All ENT Questions',
    description: 'A randomised mix across every chapter and source.',
    questionCount: '5 Qs',
    icon: <BookOpen className="w-4 h-4 text-primary" />,
    params: { subCategory: 'ENT' },
  },
];

export default function CategorySelect() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          Choose a Category
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Select a chapter or topic to begin a focused quiz session.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const search = new URLSearchParams(cat.params).toString();
          return (
            <Link
              key={cat.label}
              to={`/quiz?${search}`}
              className="card group flex items-start justify-between gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                      {cat.label}
                    </h3>
                    {cat.questionCount && (
                      <span className="text-[10px] font-medium text-text-muted bg-surface-alt px-1.5 py-0.5 rounded">
                        {cat.questionCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-light mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}