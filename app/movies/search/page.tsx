import { fetchTmdb, getTmdbImageUrl } from "@/lib/tmdb-utils";
import { TmdbListResponse } from "@/lib/types";
import { MovieGrid } from "@/components/MovieGrid";
import Image from "next/image";

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

  return (
    <div>
      <MovieGrid
        movies={trending.results.map((res) => ({
          id: res.id,
          imageUrl: getTmdbImageUrl(res.poster_path),
          mediaType: res.media_type,
          releaseDate: res.release_date ?? res.first_air_date ?? "",
          title: res.title ?? res.name ?? "",
        }))}
      />
      <div className="flex flex-row gap-1">
        <span className="text-xs">Using</span>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image alt="TMDB logo" src="/tmdb_logo.svg" width={35} height={15} />
        </a>
      </div>
    </div>
  );
}
