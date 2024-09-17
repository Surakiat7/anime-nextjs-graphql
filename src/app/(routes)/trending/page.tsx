import React from 'react';
import { Metadata } from 'next';
import TrendingPage from './trending';

export const metadata: Metadata = {
  title: 'Trending Now | Anime Apollo',
  keywords: [
    'anime apollo',
    'trending now',
    'trending anime',
    'top anime',
    'anime watchlist',
  ],
  description:
    'Explore Anime Apollo to discover the latest trending anime titles and top picks for anime enthusiasts!',
  openGraph: {
    title: 'Anime Apollo - Discover the Latest Trending Anime',
    description:
      'Looking for the latest trending anime? Dive into Anime Apollo for trending titles, top picks, and must-watch anime!',
    url: `/Logo-openGraph.png`,
    images: [
      {
        url: `/Logo-openGraph.png`,
        width: 1200,
        height: 630,
        alt: 'Anime Apollo - Latest Trending Anime',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
};

export default function Trending() {
  return (
    <>
      <TrendingPage />
    </>
  );
}