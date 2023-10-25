import { MovieGrid } from "@/components/movie/MovieGrid";
import { getUserMovieFavorites } from "@/lib/supabase-server";
import { MovieType } from "@/lib/types";
import { Button, Card, CardBody } from "@nextui-org/react";
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
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Card shadow="sm" className="bg-background/80">
          <CardBody className="p-2">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-medium font-medium">
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
        <div className="flex flex-col gap-4">
          {Object.entries(groupMovies).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex">
                <div className="rounded-full px-14 py-2 bg-primary/80 text-center">
                  <span className="text-xl font-semibold">{key}</span>
                </div>
              </div>
              {value && <MovieGrid movies={value} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
