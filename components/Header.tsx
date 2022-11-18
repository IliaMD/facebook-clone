import Image from "next/image";
import React from "react";
import facebook from "../assets/facebook1.png";
import user from "../assets/guy7.jpg";

import { MdHome } from "react-icons/md";
import { FiPlayCircle, FiFlag, FiMessageCircle } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GrGroup, GrAppsRounded } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

const Header = () => {
  return (
    <div className="p-4 flex items-center justify-between border-b lg:px-10">
      {/* LeftSide */}
      <div className="flex items-center mr-2">
        <div className="w-10 h-10">
          <Image src={facebook} alt="Логотип" />
        </div>
        <div className="ml-2">
          <input
            type="text"
            placeholder="Search Facebook"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full pl-4 hidden sm:block"
          />
        </div>
      </div>

      {/* MidleSide */}
      <div className="flex items-center space-x-7">
        <MdHome className="w-9 h-9" />
        <FiFlag className="w-7 h-7" />
        <FiPlayCircle className="w-7 h-7" />
        <BsCart3 className="w-7 h-7" />
        <GrGroup className="w-7 h-7" />
      </div>

      {/* RightSide */}
      <div className="flex space-x-6 items-center">
        <div className="md:flex space-x-6 hidden ">
          <GrAppsRounded className="w-7 h-7" />
          <FaBell className="w-7 h-7" />
          <AiOutlineMessage className="w-7 h-7" />
        </div>
        <div className="w-10 h-10">
          <Image src={user} alt="user" className="rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
