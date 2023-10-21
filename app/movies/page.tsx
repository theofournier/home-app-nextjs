import { getSession } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  return <span>MOVIES</span>;
}
