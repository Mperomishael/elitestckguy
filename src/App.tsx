import { useState } from 'react';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
// Match the filename exactly (singular)
import { ActivityNotification } from './components/ActivityNotification'; 
import { Toaster } from 'sonner';

export default function App() {
  const [page, setPage] = useState<'home' | 'auth'>('home');

  return (
    <>
      <ActivityNotification />
      <Toaster position="top-right" richColors />

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
