import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

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

        <div className="flex items-center gap-5">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/categories" className={linkClass('/categories')}>Categories</Link>

          {user ? (
            <div className="flex items-center gap-3 ml-1">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-danger transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-1">
              <Link
                to="/login"
                className="text-sm font-medium text-text-muted hover:text-text transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="btn-primary text-xs px-3 py-1.5"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}