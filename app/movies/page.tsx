import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Login() {
  return (
    <div>
      <Button as={Link} href="/movies/search">
        Search
      </Button>
    </div>
  );
}
