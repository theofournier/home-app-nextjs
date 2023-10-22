import { Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/supabase.schema";
import { MovieType } from "@/lib/types";

type Props = {
  isFavorite: boolean;
  movie: MovieType;
};

export const MovieFavoriteButton = ({ isFavorite, movie }: Props) => {
  const toggleFavorite = async () => {
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
        .update({ is_favorite: !data.is_favorite })
        .eq("id", data.id);
      console.log("UPDATE", error);
    } else {
      const { error } = await supabase.from("movie_favorites").insert({
        movie_id: movie.id,
        user_id: session.user.id,
        image_url: movie.imageUrl,
        is_favorite: true,
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
    <form action={toggleFavorite}>
      <Button
        type="submit"
        isIconOnly
        color="danger"
        aria-label="Favorite"
        size="sm"
      >
        <HeartIcon fill={isFavorite} />
      </Button>
    </form>
  );
};
