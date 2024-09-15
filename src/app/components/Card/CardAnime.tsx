'use client';

import React, { useState, useEffect } from 'react';
import { Pagination } from '@nextui-org/react';
import { fetchAnimeData } from '@/api/fetch-data';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import { DataStructure, Media } from '@/types';
import Image from 'next/image';

// AnimeCard Component
const AnimeCard: React.FC<{
  title: string;
  category: string;
  studio: string;
  image: string;
}> = ({ title, category, studio, image }) => {
  return (
    <div className="bg-slate-900 shadow-md rounded-lg overflow-hidden">
      <Image src={image} height={48} width={300} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-gray-600">Studio: {studio}</p>
      </div>
    </div>
  );
};

// AnimeCardGrid Component
const AnimeCardGrid: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [animeList, setAnimeList] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadAnimeData = async (page: number) => {
    try {
      setLoading(true);
      const data = await fetchAnimeData(page, itemsPerPage) as DataStructure;
      setAnimeList(data.Page.media);
      setTotalPages(data.Page.pageInfo.lastPage);
    } catch (err) {
      setError('Failed to fetch anime data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimeData(currentPage);
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div>{error}</div>;

  return (
    <main className="w-full justify-center flex flex-col gap-6 px-12 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.map((anime) => {
          const studio = anime.studios?.nodes[0]?.name || 'Unknown';
          return (
            <AnimeCard
              key={anime.id}
              title={anime.title.romaji || anime.title.english}
              category={anime.genres[0]}
              studio={studio}
              image={anime.coverImage.large}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          total={totalPages}
          initialPage={1}
          onChange={handleChangePage}
          page={currentPage}
          color="primary"
        />
      </div>
    </main>
  );
};

export default AnimeCardGrid;