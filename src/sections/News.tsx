import { useRef, useEffect } from 'react';
import { Newspaper, TrendingUp, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  {
    title: 'Bitcoin Surges Past $67K as ETF Inflows Reach Record Highs',
    time: '2 hours ago',
    category: 'Crypto',
    trend: 'up',
  },
  {
    title: 'Federal Reserve Signals Potential Rate Cut in Q3 2024',
    time: '4 hours ago',
    category: 'Forex',
    trend: 'up',
  },
  {
    title: 'Ethereum Layer 2 Solutions See 200% Growth in TVL',
    time: '6 hours ago',
    category: 'DeFi',
    trend: 'up',
  },
  {
    title: 'Major Bank Launches Institutional Crypto Custody Service',
    time: '8 hours ago',
    category: 'Institutional',
    trend: 'neutral',
  },
  {
    title: 'Solana Network Processes 1 Billion Transactions This Quarter',
    time: '12 hours ago',
    category: 'Crypto',
    trend: 'up',
  },
];

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.news-content', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.news-content',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="news-header text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-1.5 mb-4">
            <Newspaper size={14} className="text-neon" />
            <span className="text-xs font-mono text-neon uppercase tracking-wider">
              Market Intelligence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Latest <span className="text-neon">Market</span> News
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Stay informed with real-time updates from the world of crypto and forex trading.
          </p>
        </div>

        <div className="news-content grid lg:grid-cols-3 gap-6">
          {/* TradingView News Widget */}
          <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <TrendingUp size={16} className="text-neon" />
                Live Market Overview
              </h3>
              <span className="text-white/30 text-xs font-mono">Powered by TradingView</span>
            </div>
            <div className="h-[400px]">
              <iframe
                src="https://www.tradingview-widget.com/embed-widget/timeline/?locale=en&market=crypto&theme=dark&utm_source=eliteblockmarket.com"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title="TradingView News"
              />
            </div>
          </div>

          {/* News List */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Clock size={16} className="text-neon" />
              Recent Updates
            </h3>
            {newsItems.map((item, i) => (
              <div
                key={i}
                className="glass-panel rounded-lg p-4 hover:border-neon/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neon bg-neon/10 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-white/30">{item.time}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
