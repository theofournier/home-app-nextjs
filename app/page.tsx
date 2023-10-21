import { Clock } from "@/components/Clock";
import Image from "next/image";
import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

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

export default async function Home() {
  const image = await getRandomImage();
  return (
    <main>
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
      <div className="absolute bottom-0 w-full">
        <div className="flex justify-between items-end p-6 bg-gradient-to-b from-black/0 to-black/50">
          <div className="flex flex-col">
            <span className="text-white text-2xl">
              {image.locationName ?? ""}
            </span>
            <span className="text-white text-sm italic">
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
          <div>
            <Clock />
          </div>
        </div>
      </div>
    </main>
  );
}
