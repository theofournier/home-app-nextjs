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
    status: movie.status,
  }));

  const groupMovies = movieFavorites
    ?.sort((a, b) => (a.isFavorite ? -1 : 1))
    .reduce<{
      watchlist: MovieType[];
      watching: MovieType[];
      watched: MovieType[];
      other: MovieType[];
    }>(
      (group, current) => {
        if (current.status === "watchlist") {
          return { ...group, watchlist: [...group.watchlist, current] };
        }
        if (current.status === "watching") {
          return { ...group, watching: [...group.watching, current] };
        }
        if (current.status === "watched") {
          return { ...group, watched: [...group.watched, current] };
        }
        return { ...group, other: [...group.other, current] };
      },
      { watchlist: [], watching: [], watched: [], other: [] }
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
