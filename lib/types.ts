export type MediaType = "movie" | "tv" | string;

export type TmdbResult = {
  id: number;
  title?: string; // movie
  name?: string; // tv
  first_air_date?: string; // tv
  release_date?: string; // movie
  poster_path?: string;
  media_type: MediaType;
};

export type TmdbListResponse = {
  page: number;
  results: TmdbResult[];
  total_pages: number;
  total_results: number;
};

export type TmdbFindIdResponse = {
  tv_results: TmdbResult[];
  movie_results: TmdbResult[];
};

export type TmdbImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type MovieType = {
  id: number;
  imageUrl?: string | null;
  mediaType: MediaType;
  releaseDate: string;
  title: string;
};

export type SearchParams = { [key: string]: string | string[] | undefined };
