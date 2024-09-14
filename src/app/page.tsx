'use client';

import React from 'react';
import Footer from './layout/Footer/Footer';
import NavBar from './layout/Navbar/Navbar';
import AnimeCardGrid from './components/Card/CardAnime';

export default function Home() {
  return (
    <div className="w-full bg-slate-950">
      <NavBar />
      <AnimeCardGrid />
      <Footer />
    </div>
  );
}
