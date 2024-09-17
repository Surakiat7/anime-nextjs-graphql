'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Pagination, Card, CardFooter, Image } from '@nextui-org/react';
import { fetchAnimeData, fetchRecommendedAnimeData } from '@/api/fetch-data';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import { DataStructure, RecommendationDataStructure, Media } from '@/types';
import { BsFillStarFill } from 'react-icons/bs';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// AnimeCard Component
const AnimeCard: React.FC<{
  title: string;
  category: string;
  studio: string;
  image: string;
  averageScore?: number;
}> = ({ title, category, studio, image, averageScore }) => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none w-full relative">
      <Image
        alt="Anime cover"
        className="object-cover"
        height={300}
        src={image}
        width={300}
      />
      <div className="absolute top-1 left-1 z-20">
        <div className="px-2 flex gap-1 items-center justify-center rounded-md bg-gradient-to-br from-[#00597B] to-[#47E0E6] border-small border-white/50 shadow-[#47E0E6]/30">
          <BsFillStarFill color="white" size={16} />
          <p className="text-white text-md">{averageScore}%</p>
        </div>
      </div>
      <CardFooter className="flex gap-1 flex-col items-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h3 className="text-xl font-bold p-0 m-0 leading-none">{title}</h3>
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-white text-md p-0 m-0 leading-none">
            Category: {category}
          </p>
          <p className="text-white text-md p-0 m-0 leading-none">
            Studio: {studio}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

// AnimeCardGrid Component
const AnimeCardGrid: React.FC = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [animeList, setAnimeList] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 30;
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadAnimeData = async (page: number) => {
    try {
      setLoading(true);
      if (pathname === '/recommendation') {
        const data = await fetchRecommendedAnimeData(page, itemsPerPage);
        setAnimeList(
          data.Page.recommendations.map((rec) => rec.mediaRecommendation)
        );
        setTotalPages(data.Page.recommendations.length);
      } else {
        const data = (await fetchAnimeData(
          page,
          itemsPerPage
        )) as DataStructure;
        setAnimeList(data.Page.media);
        setTotalPages(data.Page.pageInfo.lastPage);
      }
    } catch (err) {
      setError('Failed to fetch anime data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimeData(currentPage);
  }, [currentPage, pathname]);

  const handleChangePage = (page: number) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
    });
    setCurrentPage(page);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div>{error}</div>;

  return (
    <main className="w-full justify-center flex flex-col sm:gap-4 gap-4 px-2 sm:px-4 py-2 sm:py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        {animeList.map((anime) => {
          const studio = anime.studios?.nodes[0]?.name || 'Unknown';
          return (
            <AnimeCard
              key={anime.id}
              title={anime.title.romaji || anime.title.english}
              category={anime.genres[0]}
              studio={studio}
              image={anime.coverImage.large}
              averageScore={anime.averageScore}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center sm:mb-0 md:mb-0 mb-4">
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
