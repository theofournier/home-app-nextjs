import { MovieType } from "@/lib/types";
import { getUserMovieFavorites } from "@/lib/supabase-server";
import { MovieWatchButton } from "./MovieWatchButton";

type Props = {
  movie: MovieType;
};

export const MovieWatch = async ({ movie }: Props) => {
  const movieFavorites = await getUserMovieFavorites();

  return (
    <MovieWatchButton
      movie={movie}
      isWatched={Boolean(
        movieFavorites?.find((favorite) => favorite.movie_id === movie.id)
          ?.is_watched
      )}
    />
  );
};
