import { fetchTmdb, getTmdbImageUrl } from "@/lib/tmdb-utils";
import { TmdbListResponse } from "@/lib/types";
import { MovieGrid } from "@/components/MovieGrid";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { SearchIcon } from "@/components/SearchIcon";
import { redirect } from "next/navigation";

const getTrending = async () => {
  const res = await fetchTmdb<TmdbListResponse>("/trending/all/week");
  return res;
};
const getSearch = async (query: string) => {
  const res = await fetchTmdb<TmdbListResponse>(`/search/multi?query=${query}`);
  return res;
};

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = searchParams["query"] as string;
  const movies = searchQuery
    ? await getSearch(searchQuery)
    : await getTrending();

  if (!movies || movies.results.length === 0) {
    return (
      <div>
        <span>No results</span>
      </div>
    );
  }

  const search = async (formData: FormData) => {
    "use server";

    const query = formData.get("query");

    if (!query) {
      return;
    }

    redirect(`/movies/search?query=${query}`);
  };

  return (
    <div>
      <div className="px-10 py-3 sticky top-16 z-10 flex">
        <div className="flex flex-col flex-grow">
          <form action={search}>
            <Input
              size="lg"
              type="search"
              name="query"
              placeholder="Type to search..."
              defaultValue={searchQuery}
              startContent={
                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </form>
          <div className="flex flex-row gap-1 mt-1 justify-end">
            <span className="text-xs">Using</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="TMDB logo"
                src="/tmdb_logo.svg"
                width={35}
                height={15}
              />
            </a>
          </div>
        </div>
        <div className="ml-2">
          <Card isBlurred shadow="sm">
            <CardBody className="p-2">
              <Button color="primary">Look for a specific ID</Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <MovieGrid
        movies={movies.results
          .filter((movie) => ["movie", "tv"].includes(movie.media_type))
          .map((res) => ({
            id: res.id,
            imageUrl: res.poster_path
              ? getTmdbImageUrl(res.poster_path)
              : undefined,
            mediaType: res.media_type,
            releaseDate: res.release_date ?? res.first_air_date ?? "",
            title: res.title ?? res.name ?? "",
          }))}
      />
    </div>
  );
}
