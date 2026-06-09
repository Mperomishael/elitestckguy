import { useRef, useEffect } from 'react';
import { Trophy, Target, TrendingUp, Award, Shield, Globe, Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const missions = [
  {
    icon: Target,
    title: 'Democratize Elite Trading',
    desc: 'Making institutional-grade trading tools accessible to retail investors everywhere — no hedge fund minimum required.',
  },
  {
    icon: TrendingUp,
    title: 'Maximize Profit Potential',
    desc: 'Our proprietary algorithms and AI signal engine have generated over 850% average ROI for active copy traders since launch.',
  },
  {
    icon: Shield,
    title: 'Uncompromising Security',
    desc: 'Multi-layer protection: cold storage wallets, 256-bit encryption, biometric 2FA, and $100M+ institutional insurance coverage.',
  },
  {
    icon: Globe,
    title: 'Global Market Access',
    desc: 'Trade crypto, forex, commodities, and indices — 150+ countries, 300+ instruments, one unified platform with zero geo-blocks.',
  },
  {
    icon: Users,
    title: 'Community of 168K+ Traders',
    desc: 'Learn from the best. Our social trading network lets you follow, copy, and interact with elite traders in real time.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Signal Engine',
    desc: 'Our proprietary AI has processed 2.4 billion data points to deliver signals with an 89% verified accuracy rate since Q1 2023.',
  },
];

const achievements = [
  {
    icon: Award,
    title: 'Best Trading Platform 2024',
    org: 'Global Finance Awards',
    detail: 'Ranked #1 among 340 competing platforms across 28 countries for UX, security, and ROI performance.',
    color: 'text-gold',
    bg: 'bg-gold/10 border-gold/20',
  },
  {
    icon: Shield,
    title: 'ISO 27001 Security Certified',
    org: 'Crypto Security Institute',
    detail: 'Passed the industry\'s most rigorous independent security audit with zero critical findings — two years running.',
    color: 'text-neon',
    bg: 'bg-neon/10 border-neon/20',
  },
  {
    icon: Trophy,
    title: '$2.4M Single Trader Milestone',
    org: 'Top Trader Achievement',
    detail: 'Our highest-earning member grew a $28K deposit to $2.4M in 18 months using our copy trading and AI signals.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/20',
  },
  {
    icon: Globe,
    title: '$50 Billion Trading Volume',
    org: 'Platform Milestone — 2024',
    detail: 'Surpassed $50B in cumulative trading volume, cementing our place among the world\'s top 10 retail trading platforms.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
  },
];

export default function Missions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.missions-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.mission-card', {
        x: -60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.missions-grid',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.achievement-card', {
        x: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        scrollTrigger: {
          trigger: '.achievements-list',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="missions-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-neon">Mission</span> &{' '}
            <span className="text-gold">Achievements</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Driven by excellence, validated by results. See how we're reshaping financial access for the modern trader.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Missions */}
          <div className="missions-grid grid sm:grid-cols-2 gap-4">
            {missions.map((mission) => {
              const Icon = mission.icon;
              return (
                <div
                  key={mission.title}
                  className="mission-card glass-panel rounded-xl p-5 flex flex-col gap-3 hover:border-neon/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 transition-colors">
                    <Icon size={18} className="text-neon" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{mission.title}</h3>
                    <p className="text-white/45 text-xs leading-relaxed">{mission.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="achievements-list space-y-4">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.title}
                  className="achievement-card glass-panel rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${ach.bg} transition-all group-hover:scale-110 duration-300`}>
                    <Icon size={20} className={ach.color} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h4 className="text-white font-bold text-sm">{ach.title}</h4>
                    </div>
                    <p className={`text-xs font-mono mb-1.5 ${ach.color}`}>{ach.org}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{ach.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
