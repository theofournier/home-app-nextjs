import { fetchTmdb, getTmdbImageUrl } from "@/lib/tmdb-utils";
import { TmdbListResponse } from "@/lib/types";
import { Card, CardFooter, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import NextImage from "next/image";
import { MovieGrid } from "@/components/MovieGrid";

const getTrending = async () => {
  const res = await fetchTmdb<TmdbListResponse>("/trending/all/week");
  return res;
};

export default async function Search() {
  const trending = await getTrending();

  if (!trending || trending.results.length === 0) {
    return (
      <div>
        <span>No results</span>
      </div>
    );
  }

  return <MovieGrid items={trending.results} />;
}
