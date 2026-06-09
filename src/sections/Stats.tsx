import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2000000, suffix: '+', label: 'Active Traders', prefix: '' },
  { value: 50000000000, suffix: '+', label: 'Trading Volume', prefix: '$', isCurrency: true },
  { value: 150, suffix: '+', label: 'Countries', prefix: '' },
  { value: 24, suffix: '/7', label: 'Support', prefix: '' },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  isCurrency,
}: {
  value: number;
  suffix: string;
  prefix: string;
  isCurrency?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (isCurrency && value >= 1000000000) {
              setCount(Math.floor(obj.val / 1000000000));
            } else if (isCurrency && value >= 1000000) {
              setCount(Math.floor(obj.val / 1000000));
            } else {
              setCount(Math.floor(obj.val));
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, isCurrency]);

  const formatValue = () => {
    if (isCurrency) {
      if (value >= 1000000000) return `${prefix}${count}B`;
      if (value >= 1000000) return `${prefix}${count}M`;
    }
    return `${prefix}${count.toLocaleString()}`;
  };

  return (
    <span ref={ref}>
      {formatValue()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-24 border-y border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-neon mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isCurrency={stat.isCurrency}
                />
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
