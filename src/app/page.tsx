'use client';

import React, { useRef, useState } from 'react';
import Footer from './layout/Footer/Footer';
import { useNavbarHeight, useScrollToTop } from '@/hooks/UseCustomEffects';
import NavBar from './layout/Navbar/Navbar';
import AnimeCardGrid from './components/Card/CardAnime';

export default function Home() {
  const navbarHeight = useNavbarHeight();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useScrollToTop();

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -navbarHeight;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-950">
      <NavBar />
      <AnimeCardGrid />
      <Footer />
    </div>
  );
}
