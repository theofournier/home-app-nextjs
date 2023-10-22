import { MovieType } from "@/lib/types";
import { MovieItem } from "./MovieItem";

type Props = {
  movies: MovieType[];
};

export const MovieGrid = ({ movies }: Props) => {
  return (
    <div
      className="px-10 py-3 gap-2 grid items-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
    >
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
