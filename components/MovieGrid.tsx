import { TmdbResult } from "@/lib/types";
import { MovieItem } from "./MovieItem";

type Props = {
  items: TmdbResult[];
};

export const MovieGrid = ({ items }: Props) => {
  return (
    <div
      className="p-10 gap-2 grid items-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
    >
      {items.map((item) => (
        <MovieItem key={item.id} item={item} />
      ))}
    </div>
  );
};
