import { useRef, useEffect } from 'react';
import { Shield, TrendingUp, Award, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01',
    title: 'Service for Any Level of Expertise',
    desc: 'Whether you are a complete beginner or a seasoned professional, our platform adapts to your skill level with intuitive tools and advanced analytics.',
    icon: Award,
  },
  {
    num: '02',
    title: 'Industry Best Practices',
    desc: 'Polkadot unites and secures a growing ecosystem of specialized blockchains called parachains. Apps and services on Polkadot can ecosystem of specialized.',
    icon: TrendingUp,
    highlighted: true,
  },
  {
    num: '03',
    title: 'Protected by Insurance',
    desc: 'Your assets are safeguarded with institutional-grade insurance coverage, ensuring peace of mind with every trade you execute.',
    icon: Shield,
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.trust-header', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Cards staggered animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="trust-header max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your <span className="text-neon">trusted</span> partner of{' '}
            <span className="text-white/80">cryptocurrency.</span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.num}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group relative p-8 rounded-lg border transition-all duration-300 cursor-pointer ${
                  feature.highlighted
                    ? 'bg-neon border-neon'
                    : 'glass-panel hover:border-neon/50'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`font-mono text-sm font-bold ${
                      feature.highlighted ? 'text-black/60' : 'text-white/40'
                    }`}
                  >
                    {feature.num}.
                  </span>
                  <Icon
                    size={20}
                    className={
                      feature.highlighted ? 'text-black/60' : 'text-neon'
                    }
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    feature.highlighted ? 'text-black' : 'text-white'
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    feature.highlighted ? 'text-black/70' : 'text-white/50'
                  }`}
                >
                  {feature.desc}
                </p>

                <button
                  className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                    feature.highlighted
                      ? 'text-black'
                      : 'text-neon'
                  }`}
                >
                  Learn More
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
