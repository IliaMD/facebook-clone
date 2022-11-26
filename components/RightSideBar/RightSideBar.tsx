import React from "react";
import Image from "next/image";
import { profiles } from "../..//utils/mock";

import dots from "../../assets/dots.png";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export const RightSideBar = () => {
  return (
    <div>
      <div className="pt-4 sm:pt-8 pr-7 hidden lg:block">
        <div className="flex items-center ">
          <p className="pr-4 font-bold">Contacts</p>
          <div className="flex items-center space-x-2">
            <BsFillCameraVideoFill />
            <FiSearch />
            <div className="w-7 h-7">
              <Image src={dots} alt="dots" />
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4 ">
          {profiles.map((profile, index) => (
            <div className="flex items-center " key={index}>
              <div className="w-12 h-12 flex relative">
                <img
                  src={profile.photo.src}
                  alt="users"
                  className="rounded-full object-cover "
                />
                <div
                  className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5
              border-2 border-white"
                ></div>
              </div>

              <p className="pl-3 font-semibold">{profile.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
