import React from "react";
import LeftSideBar from "./LeftSideBar";
import Stories from "./Stories";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import RightSideBar from "./RightSideBar";

const Feed = () => {
  return (
    <div className="flex bg-[#f2f3f7] flex-1 min-h-screen">
      <LeftSideBar />
      <div className="mx-auto ">
        <Stories />
        <CreatePost />
        <Posts />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Feed;
