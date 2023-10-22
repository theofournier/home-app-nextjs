import { MovieType } from "@/lib/types";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import NextImage from "next/image";
import { MovieFavorite } from "./MovieFavorite";
import { MovieWatch } from "./MovieWatch";
import { ImageOffOutline } from "./ImageOffOutline";

type Props = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: Props) => {
  return (
    <Card
      isBlurred
      className="bg-transparent w-[200px] mx-auto"
      shadow="sm"
      key={movie.id}
    >
      <CardHeader className="absolute z-10 justify-end gap-1">
        <MovieFavorite movie={movie} />
        <MovieWatch movie={movie} />
      </CardHeader>
      <CardBody className="p-0 h-[300px] justify-center items-center">
        {movie.imageUrl ? (
          <NextImage
            alt={movie.title ?? "Movie image"}
            src={movie.imageUrl}
            fill
            sizes="100vw"
            style={{
              objectFit: "fill",
            }}
          />
        ) : (
          <ImageOffOutline width={50} height={50} />
        )}
      </CardBody>
      <CardFooter className="flex flex-col items-start p-2">
        <span className="text-sm font-bold">{movie.title}</span>
        <span className="text-xs">{movie.releaseDate}</span>
      </CardFooter>
    </Card>
  );
};
