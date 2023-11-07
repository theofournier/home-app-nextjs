import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./supabase.schema";
import { cache } from "react";

export async function getSession() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getUserMovieFavorites = cache(async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("movie_favorites")
    .select("*")
    .eq("user_id", session.user.id)
    .order("title", { ascending: true });

  if (error) {
    return null;
  }

  return data;
});
