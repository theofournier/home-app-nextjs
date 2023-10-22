import { TmdbImageSize } from "./types";

export const getTmdbUrl = (path: string): string => {
  return `${process.env.TMDB_BASE_URL}/${path}`;
};

export const fetchTmdb = async <T>(path: string): Promise<T | null> => {
  const response = await fetch(getTmdbUrl(path), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      accept: "application/json",
    },
  });
  const result = (await response.json()) as T;
  if (!response.ok) return null;
  return result;
};

export const getTmdbImageUrl = (
  path: string,
  size: TmdbImageSize = "w500"
): string => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
