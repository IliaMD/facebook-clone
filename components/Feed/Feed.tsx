import React from "react";
import { LeftSideBar, Stories, CreatePost, Posts, RightSideBar } from "../";

export const Feed = () => {
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
