import { gql } from '@apollo/client';
import client from './apollo-client';
import {
  DataStructure,
  RecommendationDataStructure,
  FetchFormatsResponse,
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

export async function fetchGenres(): Promise<string[]> {
  try {
    const { data } = await client.query({
      query: FETCH_GENRES_QUERY,
      variables: { page: 1, perPage: 50 },
    });

    const genresSet = new Set<string>();

    // Collect genres from all media items
    data.Page.media.forEach((media: { genres: string[] }) => {
      media.genres.forEach((genre: string) => {
        genresSet.add(genre);
      });
    });

    // Convert Set to Array and sort
    const uniqueGenres = Array.from(genresSet).sort();
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

    const formatsSet = new Set<string>();
    data.Page.media.forEach((media) => {
      if (media.format) {
        formatsSet.add(media.format);
      }
    });

    return [...formatsSet].sort();
  } catch (error) {
    console.error('Error fetching formats:', error);
    throw new Error('Failed to fetch formats');
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

export async function fetchRecommendedAnimeData(
  page: number,
  perPage: number
): Promise<RecommendationDataStructure> {
  try {
    const { data } = await client.query({
      query: FETCH_RECOMMENDED_ANIME_QUERY,
      variables: { page, perPage },
    });
    return data as RecommendationDataStructure;
  } catch (error) {
    console.error('Error fetching recommended anime data:', error);
    throw new Error('Failed to fetch recommended anime data');
  }
}
