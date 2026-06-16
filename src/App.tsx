import { useState } from 'react';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
// Updated import to match activity-notifications.tsx
import { ActivityNotifications } from './components/activity-notifications'; 
import { Toaster } from 'sonner';

export default function App() {
  const [page, setPage] = useState<'home' | 'auth'>('home');

  return (
    <>
      <ActivityNotifications />
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
