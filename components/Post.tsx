import React, { FC } from "react";
import Image from "next/image";
import Moment from "react-moment";

import guy from "../assets/guy7.jpg";
import dots from "../assets/dots.png";
import car from "../assets/c-class.jpg";
import hearth from "../assets/hearth.png";
import like from "../assets/like.png";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

export type PostType = {
  id: string;
  userName: string;
  profileImg: string;
  caption: string;
  timestamp: any;
  image: string;
};

const Post: FC<PostType> = ({
  id,
  userName,
  profileImg,
  caption,
  timestamp,
  image,
}) => {
  return (
    <div className="bg-white rounded-[1rem] p-5 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="w-12 h-12">
            <img src={profileImg} alt="user" className="rounded-full" />
          </div>
          <div className="ml-3">
            <p className="font-bold ">{userName}</p>
            <div className="flex items-center">
              <p className="text-xs">
                <Moment fromNow>{timestamp?.toDate()}</Moment> &#8226;
              </p>
              <BiWorld className="ml-1 shrink-0" />
            </div>
          </div>
        </div>
        <div className="w-10 h-10">
          <Image src={dots} alt="dots" />
        </div>
      </div>

      {/* Input */}
      <div className="mt-3 mb-2">
        <p>{caption}</p>
      </div>

      {/* Image */}
      <div className="-mx-5">
        <img src={image} alt="Your post" />
      </div>

      {/* NumberOfLikes and Buttons */}
      <div className="">
        <div className="flex justify-between text-[#8e8d8d] mt-1">
          <div className="flex items-center">
            <div className="w-[1.1rem] h-[1.1rem]">
              <Image src={like} alt="likes" />
            </div>
            <div className=" ml-[2px] w-5 h-5">
              <Image src={hearth} alt="likes" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[15px] sm:text-[16px]">
              Emily Doe and another 21,200
            </p>
          </div>
          <p className="whitespace-nowrap text-[15px] sm:text-[16px]">
            372 comments
          </p>
        </div>
        <div className="border-b my-2"></div>
        <div className="flex justify-between items-center mx-4">
          <div className="flex items-center">
            <BiLike className="w-6 h-6" />
            <p className="pl-2 text-[18px]">Like</p>
          </div>

          <div className="flex items-center">
            <FaRegCommentAlt className="w-5 h-5" />
            <p className="pl-2 text-[18px]">Comment</p>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6">
              <Image src={share} alt="share" />
            </div>
            <p className="pl-2 text-[18px]">Share</p>
          </div>
        </div>

        <div className="border-b my-2"></div>
      </div>

      {/* Comment Section */}
      <div className="">
        <div className="flex justify-between text-[#8e8d8d] ">
          <p>See 371 previous comments</p>
          <div className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </div>
        </div>

        <div className="max-h-40 overflow-y-auto">
          {/* First Comment */}
          <div className="">
            <div className="flex items-center mt-3 ">
              <div className="w-10 h-10">
                <Image src={guy} alt="user" className="rounded-full " />
              </div>
              <p className="ml-2 font-bold">Joe Doe</p>
              <p className="ml-2">Wow! What a nice car! </p>
            </div>
          </div>
          <div className="ml-[3rem] flex -mt-1.5">
            <p className="mr-2">Like</p>
            <p className="">Replay</p>
          </div>

          {/* Second Comment */}
          <div className="">
            <div className="flex items-center mt-3 ">
              <div className="w-10 h-10">
                <Image src={guy} alt="user" className="rounded-full " />
              </div>
              <p className="ml-2 font-bold">Cristin Doe</p>
              <p className="ml-2">I love color! </p>
            </div>
          </div>
          <div className="ml-[3rem] flex -mt-1.5">
            <p className="mr-2">Like</p>
            <p className="">Replay</p>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center mt-4">
        <div className="w-10 h-10 shrink-0">
          <Image src={guy} alt="user" className="rounded-full " />
        </div>
        <div className="flex justify-between items-center ml-2 w-full bg-[#f2f3f7] rounded-full relative">
          <input
            type="text"
            placeholder="Write a comment"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full w-full"
          />
          <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile />
            <AiOutlineCamera />
            <AiOutlineGif />
          </div>
          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold px-2 ">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
