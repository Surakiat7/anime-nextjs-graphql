'use client';

import React from 'react';
import NavBar from '@/app/layout/Navbar/Navbar';
import AnimeCardGrid from '@/app/components/Card/CardAnime';
import Footer from '@/app/layout/Footer/Footer';

type Props = {};

export default function RecommendationPage({}: Props) {
  return (
    <>
      <NavBar />
      <AnimeCardGrid />
      <Footer />
    </>
  );
}
