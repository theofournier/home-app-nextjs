export type TmdbResult = {
  id: string;
  title?: string; // movie
  name?: string; // tv
  first_air_date?: string; // tv
  release_date?: string; // movie
  poster_path: string;
  media_type: "movie" | "tv";
};

export type TmdbListResponse = {
  page: number;
  results: TmdbResult[];
  total_pages: number;
  total_results: number;
};

export type TmdbImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";
