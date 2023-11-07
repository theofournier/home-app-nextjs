import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { Clock } from "@/components/Clock";
import Image from "next/image";
import NextLink from "next/link";
import { Providers } from "./providers";
import { getSession } from "@/lib/supabase-server";
import { Button, Navbar, NavbarContent, NavbarItem, Tooltip, Link } from "@nextui-org/react";

export const revalidate = 60;

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getRandomImage = async () => {
  const result = await unsplash.photos.getRandom({
    orientation: "landscape",
    topicIds: ["wallpapers", "travel", "nature"],
  });

  if (result.errors) {
    throw new Error(result.errors.join(","));
  }
  const image = result.response as Random;
  return {
    imageUrl: image.urls.full,
    locationName: image.location.name,
    username: image.user.username,
    usernameFull: image.user.name,
  };
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome Theo Fournier",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const image = await getRandomImage();
  const session = await getSession();
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="fixed h-screen w-screen overflow-hidden -z-10">
            <Image
              alt="Background image"
              src={image.imageUrl}
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <Navbar maxWidth="full">
            <NavbarContent className="gap-4" justify="center">
              {!session && (
                <NavbarItem>
                  <Button
                    as={NextLink}
                    color="primary"
                    href="/login"
                    variant="shadow"
                  >
                    Login
                  </Button>
                </NavbarItem>
              )}
              {session && (
                <>
                  <NavbarItem>
                    <form action="/api/auth/sign-out" method="post">
                      <Button type="submit" color="danger" variant="flat">
                        Logout
                      </Button>
                    </form>
                  </NavbarItem>
                  <NavbarItem>
                    <Link as={NextLink} color="foreground" href="/movies">
                      Movies
                    </Link>
                  </NavbarItem>
                </>
              )}
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Tooltip
                  content={
                    <div className="flex flex-col">
                      <span className="text-xl">
                        {image.locationName ?? ""}
                      </span>
                      <span className="text-xs italic">
                        Photo by{" "}
                        <a
                          href={`https://unsplash.com/@${image.username}?utm_source=home-app-theofournier&utm_medium=referral`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {image.usernameFull}
                        </a>{" "}
                        on{" "}
                        <a
                          href="https://unsplash.com/?utm_source=home-app-theofournier&utm_medium=referral"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Unsplash
                        </a>
                      </span>
                    </div>
                  }
                >
                  <NextLink href="/">
                    <Clock />
                  </NextLink>
                </Tooltip>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
