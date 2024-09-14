import { gql } from '@apollo/client';
import client from './apollo-client';
import { DataStructure } from '@/types';

export const FETCH_ANIME_DATA = gql`
  query GetAnimeList($page: Int!, $perPage: Int!) {
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

export async function fetchAnimeData(page: number = 1, perPage: number = 12): Promise<DataStructure> {
  const response = await client.query({
    query: FETCH_ANIME_DATA,
    variables: { page, perPage },
  });

  return response.data;
}