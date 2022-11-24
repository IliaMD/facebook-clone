import React from "react";
import Image from "next/image";
import { stories } from "../utils/mock";

const Stories = () => {
  return (
    <div className="w-screen h-36 flex items-center  sm:w-full px-2 mt-4 sm:mt-8">
      <div
        className="w-full flex justify-between space-x-2 mx-auto max-w-[25rem] sm:max-w-[29rem] 
      p-2 bg-white rounded-[1rem]"
      >
        {/* Stories */}
        {stories.map((story, index) => (
          <div
            className="flex relative w-[4.4rem] h-32  sm:w-24 sm:h-40"
            key={index}
          >
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
