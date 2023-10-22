import { MovieGrid } from "@/components/MovieGrid";
import { Database } from "@/lib/supabase.schema";
import { Button } from "@nextui-org/button";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Movies() {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.log("Not authorized");
    return null;
  }

  const { data } = await supabase
    .from("movie_favorites")
    .select("*")
    .eq("user_id", session.user.id);

  if (!data || data.length === 0) {
    return (
      <div>
        <span>No favorites</span>
      </div>
    );
  }

  return (
    <div>
      <Button as={Link} href="/movies/search">
        Search
      </Button>
      <MovieGrid
        movies={data?.map((movie) => ({
          id: movie.movie_id,
          imageUrl: movie.image_url,
          mediaType: movie.media_type,
          releaseDate: movie.release_date,
          title: movie.title,
        }))}
      />
    </div>
  );
}
