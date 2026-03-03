import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      pathname === path
        ? 'text-primary'
        : 'text-text-muted hover:text-text'
    }`;

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-base font-bold text-text tracking-tight">
            MRCS Prep
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/categories" className={linkClass('/categories')}>Categories</Link>
        </div>
      </div>
    </nav>
  );
}