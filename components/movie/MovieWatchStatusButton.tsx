import { Button, ButtonGroup } from "@nextui-org/react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/supabase.schema";
import { MovieType, WatchStatus, isOfTypeWatchStatus } from "@/lib/types";
import { CheckCircleOutlineIcon } from "../icons/CheckCircleOutlineIcon";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { BookmarkOutlineIcon } from "../icons/BookmarkOutlineIcon";
import { BookmarkIcon } from "../icons/BookmarkIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeOutlineIcon } from "../icons/EyeOutlineIcon";

type Props = {
  status?: WatchStatus | null;
  movie: MovieType;
};

export const MovieWatchStatusButton = ({ status, movie }: Props) => {
  const toggleWatch = async (formData: FormData) => {
    "use server";

    const statusSubmit = formData.get("status") as string;

    if (!statusSubmit || !isOfTypeWatchStatus(statusSubmit)) {
      console.log("No status submitted");
      return;
    }

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
        .update({ status: statusSubmit === data.status ? null : statusSubmit })
        .eq("id", data.id);
      console.log("UPDATE", error);
    } else {
      const { error } = await supabase.from("movie_favorites").insert({
        movie_id: movie.id,
        user_id: session.user.id,
        image_url: movie.imageUrl,
        media_type: movie.mediaType,
        release_date: movie.releaseDate,
        title: movie.title,
        status: statusSubmit,
      });
      console.log("INSERT", error);
    }
    revalidatePath("/movies");
    return;
  };

  return (
    <form action={toggleWatch}>
      <ButtonGroup>
        <Button
          type="submit"
          isIconOnly
          color={status === "watchlist" ? "success" : undefined}
          aria-label="Watchlist"
          size="sm"
          name="status"
          value="watchlist"
        >
          {status === "watchlist" ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
        </Button>
        <Button
          type="submit"
          isIconOnly
          color={status === "watching" ? "success" : undefined}
          aria-label="Watching"
          size="sm"
          name="status"
          value="watching"
        >
          {status === "watching" ? <EyeIcon /> : <EyeOutlineIcon />}
        </Button>
        <Button
          type="submit"
          isIconOnly
          color={status === "watched" ? "success" : undefined}
          aria-label="Watched"
          size="sm"
          name="status"
          value="watched"
        >
          {status === "watched" ? (
            <CheckCircleIcon />
          ) : (
            <CheckCircleOutlineIcon />
          )}
        </Button>
      </ButtonGroup>
    </form>
  );
};
