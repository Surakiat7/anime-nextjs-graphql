'use client';

import React from 'react';
import NavBar from '@/app/layout/Navbar/Navbar';
import AnimeCardGrid from '@/app/components/Card/CardAnime';
import Footer from '@/app/layout/Footer/Footer';

export default function RecommendationPage() {
  return (
    <>
      <NavBar />
      <AnimeCardGrid />
      <Footer />
    </>
  );
}
