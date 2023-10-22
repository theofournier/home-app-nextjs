import { MovieGrid } from "@/components/MovieGrid";
import { getUserMovieFavorites } from "@/lib/supabase-server";
import { MovieType } from "@/lib/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";

export default async function Movies() {
  const movieFavorites = (await getUserMovieFavorites())?.map((movie) => ({
    id: movie.movie_id,
    imageUrl: movie.image_url,
    mediaType: movie.media_type,
    releaseDate: movie.release_date,
    title: movie.title,
    isFavorite: movie.is_favorite,
    isWatched: movie.is_watched,
  }));

  const groupMovies = movieFavorites?.reduce<{
    favorites: MovieType[];
    watched: MovieType[];
    others: MovieType[];
  }>(
    (group, current) => {
      if (current.isFavorite && !current.isWatched) {
        return { ...group, favorites: [...group.favorites, current] };
      }
      if (current.isWatched) {
        return { ...group, watched: [...group.watched, current] };
      }
      return { ...group, others: [...group.others, current] };
    },
    { favorites: [], watched: [], others: [] }
  );

  return (
    <div>
      <div className="px-10 py-4">
        <Card isBlurred shadow="sm">
          <CardBody>
            <div className="flex gap-2 items-center">
              <span className="text-lg font-medium">
                Looking for new movies or TV series to watch?
              </span>
              <Button as={Link} href="/movies/search" color="primary">
                Go to search
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      {!groupMovies ? (
        <div>
          <span>No favorites</span>
        </div>
      ) : (
        <div>
          <div>
            <div className="w-full px-10">
              <div className="rounded-full p-2 bg-background/50 backdrop-blur-md backdrop-saturate-150 text-center">
                <span className="text-xl font-semibold">Watchlist</span>
              </div>
            </div>
            <MovieGrid movies={groupMovies?.favorites} />
          </div>
          <div>
            <div className="w-full px-10">
              <div className="rounded-full p-2 bg-background/50 backdrop-blur-md backdrop-saturate-150 text-center">
                <span className="text-xl font-semibold">Already watched</span>
              </div>
            </div>
            <MovieGrid movies={groupMovies?.watched} />
          </div>
          <div>
            <div className="w-full px-10">
              <div className="rounded-full p-2 bg-background/50 backdrop-blur-md backdrop-saturate-150 text-center">
                <span className="text-xl font-semibold">Others</span>
              </div>
            </div>
            <MovieGrid movies={groupMovies?.others} />
          </div>
        </div>
      )}
    </div>
  );
}
