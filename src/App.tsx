import { useState } from 'react';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import { ActivityNotifications } from './components/ActivityNotifications';
import { Toaster } from 'sonner';

export default function App() {
  const [page, setPage] = useState<'home' | 'auth'>('home');

  return (
    <>
      {/* This stays active across all pages */}
      <ActivityNotifications />
      
      {/* Global toast provider (already in your package.json) */}
      <Toaster position="top-right" richColors />

      {/* Conditional Page Rendering */}
      <main className="min-h-screen">
        {page === 'auth' ? (
          <AuthPage onBack={() => setPage('home')} />
        ) : (
          <Home onStartTrading={() => setPage('auth')} />
        )}
      </main>
    </>
  );
}
