import { MovieType } from "@/lib/types";
import { MovieItem } from "./MovieItem";

type Props = {
  movies: MovieType[];
};

export const MovieGrid = ({ movies }: Props) => {
  const groupMovies = movies.reduce<{
    tv: MovieType[];
    movie: MovieType[];
    others: MovieType[];
  }>(
    (group, current) => {
      if (current.mediaType === "movie") {
        return { ...group, movie: [...group.movie, current] };
      }
      if (current.mediaType === "tv") {
        return { ...group, tv: [...group.tv, current] };
      }
      return { ...group, others: [...group.others, current] };
    },
    { movie: [], tv: [], others: [] }
  );

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(groupMovies)
        .filter(([key, value]) => value.length !== 0)
        .map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <div className="flex">
              <div className="rounded-full px-4 bg-secondary/80 text-center">
                <span className="text-sm">{key}</span>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              {value.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
