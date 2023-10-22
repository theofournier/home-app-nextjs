import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./supabase.schema";
import { cache } from "react";

export const createServerSupabaseClient = () =>
  createServerComponentClient<Database>({ cookies });

export async function getSession() {
  const supabase = createServerSupabaseClient();
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
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie_favorites")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    return null;
  }

  return data;
});
