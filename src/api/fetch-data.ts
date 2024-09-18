import { gql } from '@apollo/client';
import client from './apollo-client';
import {
  DataStructure,
  RecommendationDataStructure,
  FetchFormatsResponse,
  SearchAnimeParams,
} from '@/types';

const FETCH_ANIME_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        genres
        averageScore
        startDate {
          year
        }
        format
        studios {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

const FETCH_RECOMMENDED_ANIME_QUERY = gql`
  query FetchRecommendedAnimeOrManga($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      recommendations {
        mediaRecommendation {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
          }
          genres
          averageScore
          studios {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const FETCH_POPULAR_ANIME_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        genres
        averageScore
        studios {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

const FETCH_FORMATS_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        format
      }
    }
  }
`;

const FETCH_GENRES_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        genres
      }
    }
  }
`;

const SEARCH_ANIME_QUERY = gql`
  query (
    $page: Int
    $perPage: Int
    $search: String
    $genres: [String]
    $year: Int
    $formats: [MediaFormat]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        sort: POPULARITY_DESC
        search: $search
        genre_in: $genres
        format_in: $formats
        seasonYear: $year
      ) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        genres
        averageScore
        startDate {
          year
        }
        format
        studios {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export async function fetchSearchAnime({
  page = 1,
  perPage = 30,
  search = '',
  genres = [],
  year = null,
  formats = null,
}: SearchAnimeParams): Promise<DataStructure> {
  try {
    const variables: any = {
      page,
      perPage,
      search: search || undefined,
      genres: genres.length > 0 ? genres : undefined,
      formats: formats && formats.length > 0 ? formats : undefined,
    };

    if (year) {
      variables.year = parseInt(year as string);
    }

    const { data } = await client.query<DataStructure>({
      query: SEARCH_ANIME_QUERY,
      variables,
    });
    return data;
  } catch (error) {
    console.error('Error fetching search anime data:', error);
    throw new Error('Failed to fetch search anime data');
  }
}

export async function fetchRecommendedAnimeData(
  page: number,
  perPage: number
): Promise<RecommendationDataStructure> {
  try {
    const { data } = await client.query<RecommendationDataStructure>({
      query: FETCH_RECOMMENDED_ANIME_QUERY,
      variables: { page, perPage },
    });
    return data;
  } catch (error) {
    console.error('Error fetching recommended anime data:', error);
    throw new Error('Failed to fetch recommended anime data');
  }
}

export async function fetchPopularAnimeData(
  search: string,
  format: string,
  page: number,
  perPage: number
): Promise<DataStructure> {
  try {
    const { data } = await client.query({
      query: FETCH_POPULAR_ANIME_QUERY,
      variables: { search, format, page, perPage },
    });
    return data as DataStructure;
  } catch (error) {
    console.error('Error fetching popular anime data:', error);
    throw new Error('Failed to fetch popular anime data');
  }
}

export async function fetchAnimeData(
  page: number,
  perPage: number
): Promise<DataStructure> {
  try {
    const { data } = await client.query({
      query: FETCH_ANIME_QUERY,
      variables: { page, perPage },
    });
    return data as DataStructure;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw new Error('Failed to fetch anime data');
  }
}

export async function fetchGenres(): Promise<string[]> {
  try {
    const { data } = await client.query({
      query: FETCH_GENRES_QUERY,
      variables: { page: 1, perPage: 50 },
    });

    const genresArray: string[] = [];

    data.Page.media.forEach((media: { genres: string[] }) => {
      media.genres.forEach((genre: string) => {
        if (!genresArray.includes(genre)) {
          genresArray.push(genre);
        }
      });
    });

    const uniqueGenres = genresArray.sort();
    return uniqueGenres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
}

export async function fetchFormats(): Promise<string[]> {
  try {
    const { data } = await client.query<FetchFormatsResponse>({
      query: FETCH_FORMATS_QUERY,
      variables: { page: 1, perPage: 50 },
    });

    const formatsArray: string[] = [];
    data.Page.media.forEach((media) => {
      if (media.format && !formatsArray.includes(media.format)) {
        formatsArray.push(media.format);
      }
    });

    return formatsArray.sort();
  } catch (error) {
    console.error('Error fetching formats:', error);
    throw new Error('Failed to fetch formats');
  }
}
