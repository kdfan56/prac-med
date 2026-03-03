import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryCard {
  label: string;
  description: string;
  params: Record<string, string>;
}

const categories: CategoryCard[] = [
  {
    label: 'Ch 1: Basic Science',
    description: 'Cellular biology, immunology, and fundamental ENT science.',
    params: { source: "Bailey's ENT MCQ BOOK", chapter: 'Ch 1: Basic Science' },
  },
  {
    label: 'Ch 2: Rhinology & Allergy',
    description: 'Nasal anatomy, sinusitis, polyps, and allergic rhinitis.',
    params: { source: "Bailey's ENT MCQ BOOK", chapter: 'Ch 2: Rhinology and Allergy' },
  },
  {
    label: 'Ch 5: Trauma',
    description: 'Facial fractures, CSF leaks, and emergency ENT management.',
    params: { source: "Bailey's ENT MCQ BOOK", chapter: 'Ch 5: Trauma' },
  },
  {
    label: 'All ENT Questions',
    description: 'A randomised mix across every chapter and topic.',
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
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-light mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}