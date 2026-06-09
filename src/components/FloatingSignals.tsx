import { useEffect, useRef, useCallback } from 'react';

const SIGNALS = [
  { text: 'BTC/USD LONG', profit: '+312%' },
  { text: 'ETH/USD LONG', profit: '+218%' },
  { text: 'SOL/USD LONG', profit: '+491%' },
  { text: 'Copy Trade WIN', profit: '+850%' },
  { text: 'BNB/USD LONG', profit: '+174%' },
  { text: 'XRP/USD LONG', profit: '+267%' },
  { text: 'ADA Signal', profit: '+143%' },
  { text: 'AVAX/USD LONG', profit: '+389%' },
  { text: 'DOT/USD WIN', profit: '+205%' },
  { text: 'Copy Profit', profit: '+627%' },
  { text: 'AI Signal HIT', profit: '+458%' },
  { text: 'MATIC LONG', profit: '+321%' },
];

export default function FloatingSignals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnSignal = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const data = SIGNALS[counterRef.current % SIGNALS.length];
    counterRef.current++;

    const el = document.createElement('div');
    el.className = 'floating-signal';

    // Random entry angle: from bottom, left, or right
    const edge = Math.floor(Math.random() * 3); // 0=bottom, 1=left, 2=right
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let startX: number, startY: number, endX: number, endY: number;

    if (edge === 0) {
      // From bottom
      startX = Math.random() * vw;
      startY = vh + 80;
      endX = startX + (Math.random() - 0.5) * 200;
      endY = -120;
    } else if (edge === 1) {
      // From left
      startX = -180;
      startY = Math.random() * vh;
      endX = vw + 180;
      endY = startY - 200 - Math.random() * 200;
    } else {
      // From right
      startX = vw + 180;
      startY = Math.random() * vh;
      endX = -180;
      endY = startY - 200 - Math.random() * 200;
    }

    el.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(3,3,3,0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(204,255,0,0.25);
      border-radius: 100px;
      padding: 8px 14px;
      opacity: 0;
      transform: scale(0.8);
      box-shadow: 0 0 20px rgba(204,255,0,0.1), 0 4px 20px rgba(0,0,0,0.6);
      white-space: nowrap;
      transition: none;
    `;

    el.innerHTML = `
      <span style="width:6px;height:6px;border-radius:50%;background:#ccff00;animation:pulse 1s infinite;flex-shrink:0;"></span>
      <span style="font-family:monospace;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:0.05em;">${data.text}</span>
      <span style="font-family:monospace;font-size:12px;font-weight:900;color:#ccff00;">${data.profit}</span>
    `;

    container.appendChild(el);

    // Animate: fade in, float, fade out
    const duration = 5000 + Math.random() * 3000;

    // Fade in + scale up
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    });

    // Float toward destination
    const startTime = performance.now();
    const dx = endX - startX;
    const dy = endY - startY;

    function frame(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      el.style.left = (startX + dx * eased) + 'px';
      el.style.top = (startY + dy * eased) + 'px';

      // Start fade out at 70%
      if (t > 0.7) {
        const fade = 1 - (t - 0.7) / 0.3;
        el.style.opacity = String(Math.max(0, fade));
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.remove();
      }
    }

    requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    // Spawn every 30 seconds — but also spawn a few immediately for visual impact
    spawnSignal();
    setTimeout(spawnSignal, 5000);
    setTimeout(spawnSignal, 12000);

    intervalRef.current = setInterval(spawnSignal, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spawnSignal]);

  return (
    <div ref={containerRef} className="floating-signals-root" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
