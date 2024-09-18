export interface DataStructure {
  Page: Page;
}

export interface RecommendationDataStructure {
  Page: RecommendationPage;
}

interface Page {
  media: Media[];
  pageInfo: {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
  };
}

interface RecommendationPage {
  recommendations: Recommendation[];
  pageInfo: PageInfo;
}


export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  genres: string[];
  studios: StudioConnection;
  coverImage: CoverImage;
  averageScore: number;
  startDate: {
    year: number;
  };
  format: string;
}

export interface Title {
  romaji: string;
  english: string;
}

export interface CoverImage {
  large: string;
}

export interface StudioConnection {
  nodes: Studio[];
}

export interface Studio {
  id: string;
  name: string;
}

export interface Recommendation {
  mediaRecommendation: Media;
}

export interface FetchFormatsResponse {
  Page: {
    media: {
      format?: string;
    }[];
  };
}

export interface FetchGenresResponse {
  Page: {
    media: {
      genres: string[];
    }[];
  };
}

export interface MediaQueryRange {
  min?: string;
  max?: string;
}

export interface SearchAnimeParams {
  page?: number;
  perPage?: number;
  search?: string;
  genres?: string[];
  year?: string | null;
  formats?: string[];
}