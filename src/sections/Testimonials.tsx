import { useRef, useEffect } from 'react';
import { Star, Quote, TrendingUp, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Portfolio Manager · New York',
    avatar: 'SM',
    avatarColor: 'from-neon/30 to-emerald-400/20',
    quote:
      'I started with $5,000 and within 6 months my portfolio hit $22,000. The copy trading feature is a game-changer — I literally followed top traders and watched profits roll in. ELITEBLOCKMARKET changed my life.',
    profit: '+340%',
    period: '6 months',
    rating: 5,
    badge: 'Copy Trader',
    badgeIcon: TrendingUp,
  },
  {
    name: 'James Worthington',
    role: 'Day Trader · London',
    avatar: 'JW',
    avatarColor: 'from-gold/30 to-amber-400/20',
    quote:
      "The execution speed alone is worth every penny. Zero slippage even during BTC flash crashes. I've tried 7 platforms — this is the only one where I actually sleep well knowing my stops will hit exactly where I set them.",
    profit: '+612%',
    period: '14 months',
    rating: 5,
    badge: 'Elite Verified',
    badgeIcon: Shield,
  },
  {
    name: 'Amir Hassan',
    role: 'Crypto Investor · Dubai',
    avatar: 'AH',
    avatarColor: 'from-purple-400/30 to-blue-400/20',
    quote:
      "From beginner to $180K profit in under a year. The AI signal engine is insanely accurate. I was skeptical until the first 3 signals hit back-to-back. Now I don't trade without it. Best decision I've made financially.",
    profit: '+850%',
    period: '10 months',
    rating: 5,
    badge: 'AI Signals User',
    badgeIcon: Zap,
  },
  {
    name: 'Priya Nair',
    role: 'Investor · Singapore',
    avatar: 'PN',
    avatarColor: 'from-pink-400/30 to-rose-400/20',
    quote:
      'As someone with no trading background, I was terrified. But the platform walked me through everything. Copied two elite traders and in 8 months I had enough to quit my corporate job. No exaggeration.',
    profit: '+290%',
    period: '8 months',
    rating: 5,
    badge: 'Copy Trader',
    badgeIcon: TrendingUp,
  },
  {
    name: 'Carlos Mendez',
    role: 'Forex Trader · Mexico City',
    avatar: 'CM',
    avatarColor: 'from-blue-400/30 to-cyan-400/20',
    quote:
      "The multi-asset capability is elite. I trade BTC, ETH, EUR/USD and gold — all in one dashboard with the same signal quality. Returned 180% in Q1 alone. The platform is genuinely ahead of the curve.",
    profit: '+410%',
    period: '12 months',
    rating: 5,
    badge: 'Elite Verified',
    badgeIcon: Shield,
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Entrepreneur · Riyadh',
    avatar: 'FR',
    avatarColor: 'from-teal-400/30 to-green-400/20',
    quote:
      "The ROI speaks for itself. $20K turned into $187K in 11 months following the platform signals. My friends thought I was lying until I showed them the dashboard. Now three of them are trading here too.",
    profit: '+835%',
    period: '11 months',
    rating: 5,
    badge: 'AI Signals User',
    badgeIcon: Zap,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.testimonial-card', {
        x: (i) => (i % 2 === 0 ? -70 : 70),
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="support"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-surface"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
              Real Traders. Real Profits.
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our <span className="text-neon">Traders</span> Say
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Thousands of traders have already unlocked financial freedom with ELITEBLOCKMARKET. These are their stories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => {
            const BadgeIcon = t.badgeIcon;
            return (
              <div
                key={t.name}
                className="testimonial-card glass-panel rounded-2xl p-6 lg:p-7 hover:border-neon/30 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(204,255,0,0.04), transparent 70%)' }}
                />

                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <Quote size={24} className="text-neon/30 group-hover:text-neon/50 transition-colors" />
                  {/* Profit badge */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-neon font-mono font-black text-lg leading-none">{t.profit}</span>
                    <span className="text-white/30 text-xs font-mono">{t.period}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} border border-white/10 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-xs">{t.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                    <p className="text-white/40 text-xs truncate">{t.role}</p>
                  </div>
                  {/* Badge */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1 flex-shrink-0">
                    <BadgeIcon size={10} className="text-neon" />
                    <span className="text-white/50 text-[10px] font-mono whitespace-nowrap">{t.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
