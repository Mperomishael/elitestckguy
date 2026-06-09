import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import WarpBackground from '../components/WarpBackground';
import Navigation from '../components/Navigation';
import TickerBar from '../components/TickerBar';
import FloatingSignals from '../components/FloatingSignals';

import Hero from '../sections/Hero';
import TrustSection from '../sections/TrustSection';
import Platform from '../sections/Platform';
import Markets from '../sections/Markets';
import Stats from '../sections/Stats';
import Missions from '../sections/Missions';
import Testimonials from '../sections/Testimonials';
import News from '../sections/News';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onStartTrading?: () => void;
}

export default function Home({ onStartTrading }: HomeProps) {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      {/* 3D Warp Background */}
      <WarpBackground />

      {/* Navigation */}
      <Navigation />

      {/* Live Ticker */}
      <div className="relative z-10 pt-20">
        <TickerBar />
      </div>

      {/* Floating profit signals */}
      <FloatingSignals />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onStartTrading={onStartTrading} />
        <TrustSection />
        <Platform />
        <Markets />
        <Stats />
        <Missions />
        <Testimonials />
        <News />
      </main>

      <Footer />
    </div>
  );
}
