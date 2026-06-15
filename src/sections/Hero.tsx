import { useRef, useEffect } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 80; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2.5 + 1.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }
      
      // Draw connections with higher visibility
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const opacity = (1 - dist / 180) * 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes with enhanced visibility
      for (const node of nodes) {
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 255, 0, 0.15)`;
        ctx.fill();
        
        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(204, 255, 0, 0.8)';
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(204, 255, 0, 1)';
        ctx.fill();
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.scale(2, 2);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    />
  );
}

interface HeroProps {
  onStartTrading?: () => void;
}

export default function Hero({ onStartTrading }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sideways reveal animations
      gsap.from('.hero-eyebrow', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
      });
      gsap.from('.hero-headline', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.25,
      });
      gsap.from('.hero-subtitle', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.4,
      });
      gsap.from('.hero-cta', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.55,
      });
      gsap.from('.hero-social', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.7,
      });
      gsap.from('.hero-phone', {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/hero-image.jpg)',
        backgroundBlendMode: 'overlay',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* Network Canvas */}
      <div className="absolute inset-0 z-[1] opacity-60">
        <NetworkCanvas />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                Elite Trading Infrastructure
              </span>
            </div>

            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
              Follow that{' '}
              <span className="font-road text-neon inline-block transform -rotate-2">foot-path</span>{' '}
              of legendary{' '}
              <span className="italic text-gold">Elites</span>
            </h1>

            <p className="hero-subtitle text-lg text-white/60 max-w-lg leading-relaxed">
              Blockchain technology doesn't have to be "all or nothing". Join the
              elite echelon of traders who trust our platform for lightning-fast
              execution and institutional-grade security.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4">
              <button
                onClick={() => { window.location.href = 'https://user.eliteblockmarket.com'; }}
                className="group bg-neon text-black font-bold text-sm px-8 py-4 rounded-full hover:brightness-110 transition-all duration-200 neon-glow flex items-center gap-2"
              >
                Start Trading
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.querySelector('#markets')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <TrendingUp size={16} />
                View Markets
              </button>
            </div>

            <div className="hero-social flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {['SM', 'JW', 'AH', 'PN', 'CM'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-void flex items-center justify-center text-[10px] font-bold text-black"
                    style={{ background: ['#ccff00','#ffd700','#a78bfa','#f472b6','#60a5fa'][i] }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-sm">168K+</p>
                <p className="text-white/50 text-xs">Realtime Users</p>
              </div>
            </div>
          </div>

          {/* Right - Phone mockup */}
          <div className="hero-phone relative flex justify-center lg:justify-end z-20">
            <div className="relative animate-float drop-shadow-2xl">
              <img
                src="/images/hero-dashboard.png"
                alt="ELITEBLOCKMARKET Trading Platform"
                className="w-full max-w-[320px] lg:max-w-[500px] xl:max-w-[600px] drop-shadow-[0_0_60px_rgba(204,255,0,0.3)] relative z-20 hover:drop-shadow-[0_0_80px_rgba(204,255,0,0.4)] transition-all duration-500"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-neon/20 border border-neon/50 flex items-center justify-center backdrop-blur-md shadow-lg shadow-neon/20 z-20">
                <span className="text-neon font-mono text-xs font-bold">BTC</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center backdrop-blur-md shadow-lg shadow-gold/20 z-20">
                <span className="text-gold font-mono text-xs font-bold">+850%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
