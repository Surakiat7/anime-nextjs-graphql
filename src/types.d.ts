export interface DataStructure {
  [x: string]: any;
  data: Data;
}

export interface Data {
  Page: Page;
}

export interface Page {
  pageInfo: PageInfo;
  media: Media[];
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface Media {
  id: string;
  title: Title;
  description: string;
  coverImage: CoverImage;
  genres: string[];
  averageScore: number;
  studios: StudioConnection;
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

export interface MediaQueryRange {
  min: string;
  max?: string;
}