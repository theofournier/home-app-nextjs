import { MovieType } from "@/lib/types";
import { getUserMovieFavorites } from "@/lib/supabase-server";
import { MovieWatchStatusButton } from "./MovieWatchStatusButton";

type Props = {
  movie: MovieType;
};

export const MovieWatchStatus = async ({ movie }: Props) => {
  const movieFavorites = await getUserMovieFavorites();

  return (
    <MovieWatchStatusButton
      movie={movie}
      status={
        movieFavorites?.find((favorite) => favorite.movie_id === movie.id)
          ?.status
      }
    />
  );
};
