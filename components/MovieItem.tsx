import { MovieType } from "@/lib/types";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import NextImage from "next/image";
import { MovieFavorite } from "./MovieFavorite";
import { MovieWatch } from "./MovieWatch";
import { ImageOffOutline } from "./ImageOffOutline";
import Link from "next/link";

type Props = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: Props) => {
  return (
    <Card
      isBlurred
      className="bg-transparent w-[150px]"
      shadow="sm"
      key={movie.id}
    >
      <CardHeader className="absolute z-10 justify-end p-0">
        <div className="flex flex-row  gap-1 bg-background/50 p-2 rounded-es-lg">
          <MovieFavorite movie={movie} />
          <MovieWatch movie={movie} />
        </div>
      </CardHeader>
      <CardBody className="p-0 h-[200px] justify-center items-center">
        {movie.imageUrl ? (
          <NextImage
            alt={movie.title ?? "Movie image"}
            src={movie.imageUrl}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <ImageOffOutline width={50} height={50} />
        )}
      </CardBody>
      <CardFooter
        as={Link}
        href={`https://themoviedb.org/${movie.mediaType}/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start p-2"
      >
        <span className="text-sm font-medium line-clamp-2">{movie.title}</span>
        <span className="text-xs">{movie.releaseDate}</span>
      </CardFooter>
    </Card>
  );
};
