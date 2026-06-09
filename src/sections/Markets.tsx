import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Markets() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.markets-header', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.markets-widget-wrap', {
        x: -60,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: '.markets-widget-wrap',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.from('.markets-top-wrap', {
        x: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        scrollTrigger: {
          trigger: '.markets-top-wrap',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="markets"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-surface"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="markets-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Live <span className="text-neon">Market</span> Data
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real-time prices and trends powered by TradingView. Stay ahead with live institutional-grade market feeds.
          </p>
        </div>

        {/* Advanced Chart Widget */}
        <div className="markets-widget-wrap relative mb-8 rounded-2xl overflow-hidden border border-white/10 bg-void hover:border-neon/20 transition-colors duration-300">
          <div
            className="tradingview-widget-container"
            style={{ height: '460px' }}
          >
            <iframe
              src="https://s.tradingview.com/embed-widget/advanced-chart/?locale=en#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22interval%22%3A%2260%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22locale%22%3A%22en%22%2C%22backgroundColor%22%3A%22rgba(3%2C3%2C3%2C1)%22%2C%22gridColor%22%3A%22rgba(255%2C255%2C255%2C0.04)%22%2C%22hide_top_toolbar%22%3Afalse%2C%22hide_legend%22%3Afalse%2C%22save_image%22%3Afalse%2C%22calendar%22%3Afalse%2C%22hide_volume%22%3Afalse%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%7D"
              style={{ width: '100%', height: '460px', border: 'none' }}
              title="TradingView Advanced Chart"
              allowTransparency={true}
            />
          </div>
        </div>

        {/* Top Performing Cryptos Widget */}
        <div className="markets-top-wrap relative rounded-2xl overflow-hidden border border-white/10 bg-void hover:border-neon/20 transition-colors duration-300">
          <div className="px-6 pt-5 pb-2 border-b border-white/5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              Top Cryptos — Live Prices
            </h3>
          </div>
          <div
            className="tradingview-widget-container"
            style={{ height: '400px' }}
          >
            <iframe
              src="https://s.tradingview.com/embed-widget/symbol-info/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ASOLUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AXRPUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AADAUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AAVAXUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AMATICUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ADOTUSD%22%7D%5D%2C%22chartOnly%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22400px%22%2C%22locale%22%3A%22en%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Atrue%7D"
              style={{ width: '100%', height: '400px', border: 'none' }}
              title="Crypto Prices"
              allowTransparency={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
