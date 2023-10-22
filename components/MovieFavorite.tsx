import { MovieFavoriteButton } from "./MovieFavoriteButton";
import { MovieType } from "@/lib/types";
import { getUserMovieFavorites } from "@/lib/supabase-server";

type Props = {
  movie: MovieType;
};

export const MovieFavorite = async ({ movie }: Props) => {
  const movieFavorites = await getUserMovieFavorites();

  return (
    <MovieFavoriteButton
      movie={movie}
      isFavorite={Boolean(
        movieFavorites?.find((favorite) => favorite.movie_id === movie.id)
          ?.is_favorite
      )}
    />
  );
};
