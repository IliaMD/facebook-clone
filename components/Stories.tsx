import React from "react";
import Image, { StaticImageData } from "next/image";

import therock from "../assets/therock.jpg";
import therock2 from "../assets/therock2.webp";
import therock20 from "../assets/therock20.jpg";
import mike from "../assets/1miketyson.jpg";
import mikeprofile from "../assets/mikeprofile.webp";
import mrbeastbackground from "../assets/mrbeastbackground.webp";
import mrbeast from "../assets/1mrbeast.jpg";
import kobebackground from "../assets/kobebackground.jpg";
import kobe from "../assets/1kobe.webp";
import arnoldbackground from "../assets/arnoldbackground.webp";
import arnold from "../assets/1arnold.jpg";

type StoriesType = {
  profile: StaticImageData;
  background: StaticImageData;
};

const Stories = () => {
  const stories: StoriesType[] = [
    { profile: therock, background: therock20 },
    { profile: mikeprofile, background: mike },
    { profile: mrbeast, background: mrbeastbackground },
    { profile: kobe, background: kobebackground },
    { profile: arnold, background: arnoldbackground },
  ];

  return (
    <div className="w-screen h-36 flex items-center  sm:w-full px-2 mt-4 sm:mt-8">
      <div
        className="w-full flex justify-between space-x-2 mx-auto max-w-[25rem] sm:max-w-[29rem] 
      p-2 bg-white rounded-[1rem]"
      >
        {stories.map((story) => (
          <div className="flex relative w-[4.4rem] h-32  sm:w-24 sm:h-40">
            <div className="flex">
              <Image
                src={story.background}
                alt="background"
                className="object-cover rounded-[1rem]"
              />
              <div className="flex absolute top-1 left-1 p-1 bg-blue-500 rounded-full w-9 h-9">
                <Image
                  src={story.profile}
                  alt="profile"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
