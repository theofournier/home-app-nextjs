import { getTmdbImageUrl } from "@/lib/tmdb-utils";
import { TmdbResult } from "@/lib/types";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import NextImage from "next/image";

type Props = {
  item: TmdbResult;
};

export const MovieItem = ({ item }: Props) => {
  const title = item.title ?? item.name;
  const date = item.release_date ?? item.first_air_date;
  return (
    <Card
      isBlurred
      className="bg-transparent h-[300px] w-[200px] m-auto"
      shadow="sm"
      key={item.id}
    >
      <CardBody className="p-0">
        <NextImage
          alt={title ?? "Movie image"}
          src={getTmdbImageUrl(item.poster_path)}
          fill
          sizes="100vw"
          style={{
            objectFit: "fill",
          }}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start p-2">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs">{date}</span>
      </CardFooter>
    </Card>
  );
};
