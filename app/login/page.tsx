import { getSession } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <form action="/api/auth/sign-in" method="post">
      <label htmlFor="email">Email</label>
      <input name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>
  );
}
