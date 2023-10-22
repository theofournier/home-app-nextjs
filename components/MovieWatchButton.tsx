import { Button } from "@nextui-org/react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/supabase.schema";
import { MovieType } from "@/lib/types";
import { CheckCircleOutline } from "./CheckCircleOutline";
import { CheckCircle } from "./CheckCircle";

type Props = {
  isWatched: boolean;
  movie: MovieType;
};

export const MovieWatchButton = ({ isWatched, movie }: Props) => {
  const toggleWatch = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      console.log("Not authorized");
      return;
    }

    const { data } = await supabase
      .from("movie_favorites")
      .select("*")
      .eq("movie_id", movie.id)
      .eq("user_id", session.user.id)
      .single();

    if (data) {
      const { error } = await supabase
        .from("movie_favorites")
        .update({ is_watched: !data.is_watched })
        .eq("id", data.id);
      console.log("UPDATE", error);
    } else {
      const { error } = await supabase.from("movie_favorites").insert({
        movie_id: movie.id,
        user_id: session.user.id,
        image_url: movie.imageUrl,
        is_watched: true,
        media_type: movie.mediaType,
        release_date: movie.releaseDate,
        title: movie.title,
      });
      console.log("INSERT", error);
    }
    revalidatePath("/movies");
    return;
  };

  return (
    <form action={toggleWatch}>
      <Button
        type="submit"
        isIconOnly
        color="secondary"
        aria-label="Watch"
        size="sm"
      >
        {isWatched ? <CheckCircle /> : <CheckCircleOutline />}
      </Button>
    </form>
  );
};
