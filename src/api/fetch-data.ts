import { gql } from '@apollo/client';
import client from './apollo-client';
import { DataStructure } from '@/types';

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

export async function fetchAnimeData(page: number, perPage: number): Promise<DataStructure> {
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