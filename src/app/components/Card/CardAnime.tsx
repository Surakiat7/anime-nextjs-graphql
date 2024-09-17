import React, { useState, useEffect,useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  Pagination,
  Card,
  CardFooter,
  Image,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  fetchAnimeData,
  fetchRecommendedAnimeData,
  fetchPopularAnimeData,
  fetchGenres,
  fetchFormats,
} from '@/api/fetch-data';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import { DataStructure, Media } from '@/types';
import { BsFillStarFill } from 'react-icons/bs';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { LuSearch } from 'react-icons/lu';

gsap.registerPlugin(ScrollToPlugin);

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

const AnimeCardGrid: React.FC = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allAnimeList, setAllAnimeList] = useState<Media[]>([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 30;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genres, setGenres] = useState<Set<string>>(new Set<string>());
  const [year, setYear] = useState<Set<string>>(new Set<string>());
  const [format, setFormat] = useState<Set<string>>(new Set<string>());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genresOptions, setGenresOptions] = useState<string[]>([]);
  const [formatsOptions, setFormatsOptions] = useState<string[]>([]);
  const [yearsOptions, setYearsOptions] = useState<string[]>([]);

  const generateYearOptions = (
    startYear: number,
    endYear: number
  ): string[] => {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year.toString());
    }
    return years;
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const genresData = await fetchGenres();
        setGenresOptions(genresData);

        const formatsData = await fetchFormats();
        setFormatsOptions(formatsData);

        const yearsList = generateYearOptions(2000, 2025);
        setYearsOptions(yearsList);
      } catch (error) {
        console.error('Error fetching options:', error);
        setError('Failed to fetch options.');
      }
    };

    fetchOptions();
  }, []);

  const loadAllAnimeData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      let data;
      if (pathname === '/recommendation') {
        data = await fetchRecommendedAnimeData(page, itemsPerPage);
        setAllAnimeList(
          data.Page.recommendations.map((rec) => rec.mediaRecommendation)
        );
        setTotalPages(
          Math.ceil(data.Page.recommendations.length / itemsPerPage)
        );
      } else if (pathname === '/trending') {
        data = await fetchPopularAnimeData('', '', page, itemsPerPage);
        setAllAnimeList(data.Page.media);
        setTotalPages(data.Page.pageInfo.lastPage);
      } else {
        data = (await fetchAnimeData(page, itemsPerPage)) as DataStructure;
        setAllAnimeList(data.Page.media);
        setTotalPages(data.Page.pageInfo.lastPage);
      }
    } catch (err) {
      setError('Failed to fetch anime data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  const filterAnimeData = useCallback(() => {
    let filteredList = [...allAnimeList];

    // Apply filters
    if (searchTerm) {
      filteredList = filteredList.filter(
        (anime) =>
          anime.title.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (anime.title.english &&
            anime.title.english
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    if (genres.size) {
      filteredList = filteredList.filter((anime) =>
        anime.genres.some((genre) => genres.has(genre))
      );
    }

    if (year.size) {
      filteredList = filteredList.filter(
        (anime) =>
          anime.startDate &&
          anime.startDate.year &&
          year.has(anime.startDate.year.toString())
      );
    }

    if (format.size) {
      filteredList = filteredList.filter((anime) =>
        format.has(anime.format || '')
      );
    }

    // Update filtered list
    setFilteredAnimeList(filteredList);
  }, [allAnimeList, searchTerm, genres, year, format]);

  useEffect(() => {
    loadAllAnimeData(currentPage);
  }, [currentPage, pathname, loadAllAnimeData]);

  useEffect(() => {
    filterAnimeData();
  }, [filterAnimeData]);

  const handleChangePage = async (page: number) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
    });
    setCurrentPage(page);
    await loadAllAnimeData(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectionChange = (keys: Set<string>, type: string) => {
    switch (type) {
      case 'genres':
        setGenres(new Set<string>(keys));
        break;
      case 'year':
        setYear(new Set<string>(keys));
        break;
      case 'format':
        setFormat(new Set<string>(keys));
        break;
      default:
        break;
    }
  };

  const convertSelection = (keys: any): string[] => {
    if (Array.isArray(keys)) {
      return keys;
    }
    if (keys instanceof Set) {
      return Array.from(keys);
    }
    return [];
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div>{error}</div>;

  return (
    <main className="w-full justify-center flex flex-col sm:gap-4 gap-4 px-2 sm:px-4 py-2 sm:py-4">
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base text-white font-medium">Search</label>
          <Input
            variant="flat"
            placeholder="Enter your text to search"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                aria-label="search button"
              >
                <LuSearch />
              </button>
            }
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base text-white font-medium">Genres</label>
          <Select
            placeholder="Select genre"
            selectionMode="multiple"
            selectedKeys={Array.from(genres)}
            onSelectionChange={(keys) =>
              handleSelectionChange(
                new Set<string>(convertSelection(keys)),
                'genres'
              )
            }
          >
            {genresOptions.map((genre) => (
              <SelectItem className="text-slate-950" key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base text-white font-medium">Year</label>
          <Select
            selectionMode="multiple"
            placeholder="Select year"
            selectedKeys={Array.from(year)}
            onSelectionChange={(keys) => {
              handleSelectionChange(
                new Set<string>(convertSelection(keys)),
                'year'
              );
            }}
          >
            {yearsOptions.map((year) => (
              <SelectItem key={year} className="text-slate-950">
                {year}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base text-white font-medium">Format</label>
          <Select
            selectionMode="multiple"
            placeholder="Select format"
            selectedKeys={Array.from(format)}
            onSelectionChange={(keys) =>
              handleSelectionChange(
                new Set<string>(convertSelection(keys)),
                'format'
              )
            }
          >
            {formatsOptions.map((format) => (
              <SelectItem key={format} className="text-slate-950">
                {format}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        {filteredAnimeList.length > 0 ? (
          filteredAnimeList.map((anime) => {
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
          })
        ) : (
          <div className="w-full h-screen">
            <p className="text-xl text-rose-500 font-bold">No Results.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center sm:mb-0 md:mb-0 mb-4">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </main>
  );
};

export default AnimeCardGrid;
