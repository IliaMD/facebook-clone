import React from "react";
import Image, { StaticImageData } from "next/image";

import albert from "../assets/1albert.jpg";
import arnold from "../assets/1arnold.jpg";
import drphil from "../assets/1drphil.webp";
import elon from "../assets/1elon.webp";
import kobe from "../assets/1kobe.webp";
import miketyson from "../assets/1miketyson.jpg";
import mrbeast from "../assets/1mrbeast.jpg";
import rihana from "../assets/1rihana.jpg";
import therock from "../assets/1rock.jpg";

import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import dots from "../assets/dots.png";
import { Interface } from "readline";

type ProfilesType = {
  name: string;
  photo: StaticImageData;
};

const RightSideBar = () => {
  const profiles: ProfilesType[] = [
    { name: "Albert E.", photo: albert },
    { name: "Arnold S.", photo: arnold },
    { name: "Dr Phill", photo: drphil },
    { name: "Elon Musk", photo: elon },
    { name: "Kobe Briant", photo: kobe },
    { name: "Mike Tyson", photo: miketyson },
    { name: "Mr Beast", photo: mrbeast },
    { name: "Rihana", photo: rihana },
    { name: "The Rock", photo: therock },
  ];
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

export default RightSideBar;
