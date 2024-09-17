'use client';

import React from 'react';
import NavBar from '@/app/layout/Navbar/Navbar';
import AnimeCardGrid from '@/app/components/Card/CardAnime';
import Footer from '@/app/layout/Footer/Footer';

export default function RecommendationPage() {
  return (
    <div className="w-full bg-slate-950">
      <NavBar />
      <div className="w-full justify-center flex flex-col sm:gap-4 gap-4 px-2 sm:px-4 pt-2 sm:pt-4">
        <h1 className="bg-gradient-to-b from-[#00597B] to-[#47E0E6] inline-block text-transparent bg-clip-text font-bold text-3xl text-center sm:text-left">
          Anime Recommendations
        </h1>
      </div>
      <AnimeCardGrid />
      <Footer />
    </div>
  );
}
