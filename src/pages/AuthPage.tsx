import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, TrendingUp, Shield, Zap, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';

const benefits = [
  { icon: TrendingUp, text: 'Copy elite traders — up to 850% ROI' },
  { icon: Zap, text: 'AI-powered signals with 89% accuracy' },
  { icon: Shield, text: 'Institutional-grade security & cold storage' },
];

export default function AuthPage({ onBack }: { onBack?: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      gsap.from(panelRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { x: mode === 'signup' ? -20 : 20, opacity: 0.5 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [mode]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.06), transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05), transparent 70%)' }} />

      {/* Faint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(204,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden border border-white/10">
        {/* Left panel — branding */}
        <div className="hidden lg:flex flex-col justify-between p-10 relative"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f1a00 50%, #030303 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 30% 70%, rgba(204,255,0,0.08), transparent 60%)' }} />

          <div className="relative z-10">
            {/* Back button */}
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-8"
              >
                <ChevronLeft size={16} />
                Back to site
              </button>
            )}

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-neon flex items-center justify-center">
                <span className="text-black font-black text-sm">EB</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">ELITEBLOCKMARKET</span>
            </div>

            <h2 className="text-3xl font-black text-white leading-tight mb-4">
              Start earning like the{' '}
              <span className="text-neon italic">elite</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Join 168K+ traders who are growing wealth daily. Copy proven strategies and let AI do the heavy lifting.
            </p>

            <div className="space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-neon" />
                    </div>
                    <span className="text-white/70 text-sm">{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom stat */}
          <div className="relative z-10 glass-panel rounded-xl p-4 mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/40 text-xs">Your potential profit</span>
              <span className="text-neon text-xs font-mono">Live estimate</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-neon font-black text-3xl font-mono">+850%</span>
              <span className="text-white/40 text-sm mb-1">avg ROI · copy trading</span>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div ref={panelRef} className="bg-[#0a0a0a] p-8 lg:p-10 flex flex-col justify-center">
          {/* Mobile back */}
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-6"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}

          {/* Mode toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 mb-8 self-start">
            {(['signup', 'login'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? 'bg-neon text-black shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {m === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-black text-white mb-1">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-white/40 text-sm mb-7">
            {mode === 'signup'
              ? 'Free to join. Start copying elite trades today.'
              : 'Log in to access your trading dashboard.'}
          </p>

          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-white/50 text-xs font-mono uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-white/50 text-xs font-mono uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs font-mono uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-white/[0.07] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button className="text-neon/70 hover:text-neon text-xs transition-colors">Forgot password?</button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-neon text-black font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 neon-glow flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'signup' ? 'Start Trading Free' : 'Log In to Dashboard'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          <p className="text-white/30 text-xs text-center mt-6">
            {mode === 'signup' ? (
              <>Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-neon/70 hover:text-neon transition-colors">Log in</button>
              </>
            ) : (
              <>Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-neon/70 hover:text-neon transition-colors">Sign up free</button>
              </>
            )}
          </p>

          <p className="text-white/20 text-[11px] text-center mt-4 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </div>
  );
}
