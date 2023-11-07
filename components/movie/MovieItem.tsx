import { MovieType } from "@/lib/types";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import NextImage from "next/image";
import { MovieFavorite } from "./MovieFavorite";
import { MovieWatchStatus } from "./MovieWatchStatus";
import { ImageOffOutlineIcon } from "../icons/ImageOffOutlineIcon";
import Link from "next/link";

type Props = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: Props) => {
  return (
    <Card className="bg-background/80 w-[150px]" shadow="sm" key={movie.id}>
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
          <ImageOffOutlineIcon width={50} height={50} />
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
        <div className="flex flex-row gap-1 mt-1">
          <MovieFavorite movie={movie} />
          <MovieWatchStatus movie={movie} />
        </div>
      </CardFooter>
    </Card>
  );
};
