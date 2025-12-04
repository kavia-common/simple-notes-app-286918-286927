import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import NotesApp from './components/NotesApp';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Root application shell.
   * - Sets document title
   * - Provides optional theme toggle while defaulting to light theme
   * - Mounts NotesApp (main feature)
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.title = 'Notes';
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  const themeLabel = useMemo(
    () => `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
    [theme]
  );

  return (
    <div className="app-root" data-testid="app-root">
      <header className="app-header" role="banner">
        <div className="container header-inner">
          <h1 className="app-title">Notes</h1>
          <div className="header-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={toggleTheme}
              aria-label={themeLabel}
              type="button"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>
      <main className="app-main" role="main">
        <div className="container">
          <NotesApp />
        </div>
      </main>
      <div className="sr-only" aria-live="polite" id="aria-live-region" />
    </div>
  );
}
