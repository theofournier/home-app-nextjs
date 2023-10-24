import { fetchTmdb, getTmdbImageUrl } from "@/lib/tmdb-utils";
import {
  MovieType,
  SearchParams,
  TmdbFindIdResponse,
  TmdbListResponse,
  TmdbResult,
} from "@/lib/types";
import { MovieGrid } from "@/components/movie/MovieGrid";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { redirect } from "next/navigation";
import { FindIdComponent } from "./FindIdComponent";

const getTrending = async () => {
  const res = await fetchTmdb<TmdbListResponse>("/trending/all/week");
  return res;
};
const getSearch = async (query: string) => {
  const res = await fetchTmdb<TmdbListResponse>(`/search/multi?query=${query}`);
  return res;
};
const getFindId = async (externalId: string, externalSource = "imdb_id") => {
  const res = await fetchTmdb<TmdbFindIdResponse>(
    `/find/${externalId}?external_source=${externalSource}`
  );
  return res;
};

const getMovies = async (
  searchParams: SearchParams
): Promise<MovieType[] | null> => {
  const searchQuery = searchParams["query"] as string;
  const externalSource = searchParams["externalSource"] as string;
  const externalId = searchParams["externalId"] as string;

  let tmdbMovies: TmdbResult[] = [];

  if (searchQuery) {
    const movies = await getSearch(searchQuery);
    if (!movies || movies.results.length === 0) return null;
    tmdbMovies = movies.results;
  } else if (externalSource && externalId) {
    const movies = await getFindId(externalId, externalSource);
    if (!movies) return null;
    tmdbMovies = [...movies.movie_results, ...movies.tv_results];
  } else {
    const movies = await getTrending();
    if (!movies || movies.results.length === 0) return null;
    tmdbMovies = movies.results;
  }

  return tmdbMovies
    .filter((movie) => ["movie", "tv"].includes(movie.media_type))
    .map((res) => ({
      id: res.id,
      imageUrl: res.poster_path ? getTmdbImageUrl(res.poster_path) : undefined,
      mediaType: res.media_type,
      releaseDate: res.release_date ?? res.first_air_date ?? "",
      title: res.title ?? res.name ?? "",
    }));
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchQuery = searchParams["query"] as string;
  const externalSource = searchParams["externalSource"] as string;
  const externalId = searchParams["externalId"] as string;
  const movies = await getMovies(searchParams);

  const search = async (formData: FormData) => {
    "use server";

    const query = formData.get("query");

    if (!query) {
      redirect("/movies/search");
    }

    redirect(`/movies/search?query=${query}`);
  };

  const findId = async (formData: FormData) => {
    "use server";

    const externalSource = formData.get("externalSource");
    const externalId = formData.get("externalId");

    if (!externalId || !externalSource) {
      redirect("/movies/search");
    }

    redirect(
      `/movies/search?externalSource=${externalSource}&externalId=${externalId}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-16 z-10 flex flex-wrap-reverse gap-2">
        <div className="flex flex-col">
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
              endContent={
                <Button
                  type="submit"
                  radius="full"
                  variant="flat"
                  color="secondary"
                >
                  Search
                </Button>
              }
            />
          </form>
          <div className="flex flex-row mt-1 justify-end">
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
        <div>
          <FindIdComponent
            findIdAction={findId}
            externalId={externalId}
            externalSource={externalSource}
          />
        </div>
      </div>

      {!movies || movies.length === 0 ? (
        <div>
          <span>No results</span>
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}
