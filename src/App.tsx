import { useState } from 'react';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [page, setPage] = useState<'home' | 'auth'>('home');

  if (page === 'auth') {
    return <AuthPage onBack={() => setPage('home')} />;
  }

  return <Home onStartTrading={() => setPage('auth')} />;
}
