import { getSession } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  return <div className="h-full px-5 sm:px-10 py-4 backdrop-blur-md backdrop-saturate-150">{children}</div>;
}
