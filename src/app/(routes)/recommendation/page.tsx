import React from 'react';
import { Metadata } from 'next';
import RecommendationPage from './recommendation';

export const metadata: Metadata = {
  title: 'Recommendations | Anime Apollo',
  keywords: [
    'anime apollo',
    'anime recommendations',
    'best anime',
    'anime guide',
    'anime watchlist',
  ],
  description:
    'Explore Anime Apollo to discover the best anime recommendations, reviews, and curated lists for anime lovers!',
  openGraph: {
    title: 'Anime Apollo - Your Guide to the Best Anime',
    description:
      'Looking for anime recommendations? Dive into Anime Apollo for curated lists, top picks, and expert reviews!',
    url: `/Logo-openGraph.png`,
    images: [
      {
        url: `/Logo-openGraph.png`,
        width: 1200,
        height: 630,
        alt: 'Anime Apollo - Best Anime Recommendations',
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

export default function Recommendation() {
  return (
    <>
      <RecommendationPage />
    </>
  );
}
