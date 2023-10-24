import { MovieType } from "@/lib/types";
import { MovieItem } from "./MovieItem";

type Props = {
  movies: MovieType[];
};

export const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
