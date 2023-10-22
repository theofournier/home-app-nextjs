import { getSession } from "@/lib/supabase-server";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { redirect } from "next/navigation";
import { Input } from "@nextui-org/input";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export default async function Login() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });

    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    redirect("/");
  };

  return (
    <div className="flex justify-center items-center mt-20 mx-4">
      <Card isBlurred shadow="sm">
        <CardBody>
          <form action={signIn}>
            <div className="flex flex-col items-center gap-4">
              <Input type="email" name="email" placeholder="Email" />
              <Input type="password" name="password" placeholder="Password" />

              <Button type="submit" color="primary" variant="shadow">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
