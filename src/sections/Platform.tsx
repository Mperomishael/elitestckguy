import { useRef, useEffect } from 'react';
import { Star, ArrowRight, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Platform() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video animation
      gsap.from('.platform-video', {
        x: -80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Content animation
      gsap.from('.platform-content > *', {
        x: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video */}
          <div className="platform-video relative flex justify-center">
            <div className="relative w-full max-w-[350px]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-3xl shadow-[0_0_60px_rgba(204,255,0,0.15)]"
              >
                <source src="/videos/trading-phone.mp4" type="video/mp4" />
              </video>
              {/* Floating stats */}
              <div className="absolute -bottom-4 -left-4 glass-panel rounded-xl p-4">
                <p className="text-neon font-mono text-lg font-bold">+73.5%</p>
                <p className="text-white/50 text-xs">Daily Return</p>
              </div>
              <div className="absolute -top-4 -right-4 glass-panel rounded-xl p-4">
                <p className="text-gold font-mono text-lg font-bold">$50B+</p>
                <p className="text-white/50 text-xs">Trading Volume</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="platform-content space-y-6">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className="text-gold fill-gold"
                />
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Trusted <span className="text-neon">platform</span> anytime &{' '}
              <span className="text-white/80">anywhere.</span>
            </h2>

            <p className="text-white/60 leading-relaxed max-w-lg">
              This is a unites and secures a <strong className="text-white">growing ecosystem</strong> of specialized
              blockchains called parachains. Apps and services on Polkadot can
              ecosystem of specialized called.
            </p>

            <p className="text-white/60 leading-relaxed max-w-lg">
              Polkadot <strong className="text-white">unites and secures a growing ecosystem</strong> of specialized
              blockchains called parachains. Apps and services.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  document
                    .querySelector('#markets')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-neon text-black font-bold text-sm px-8 py-4 rounded-full hover:brightness-110 transition-all duration-200 neon-glow flex items-center gap-2"
              >
                Learn More
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2">
                <HelpCircle size={16} />
                Ask question?
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
