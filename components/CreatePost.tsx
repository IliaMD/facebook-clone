import React, { useRef } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import guy from "../assets/guy7.jpg";
import camera from "../assets/camera.png";
import photos from "../assets/photos.png";
import smile from "../assets/smile.png";

const CreatePost = () => {
  const { data: session } = useSession();

  const captionRef = useRef<HTMLInputElement>(null);

  const uploadPost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      profileImg: session?.user.image,
      userName: session?.user.name,
      caption: captionRef.current?.value,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="w-screen sm:w-full">
      <div className="mx-auto max-w-[25rem] sm:max-w-[29rem] bg-white rounded-[1rem]  ">
        <div className="mt-8 flex items-center w-full p-3 pt-4">
          <div className="w-12 h-12 shrink-0">
            <img
              src={session?.user.image}
              alt="user"
              className="rounded-full"
            />
          </div>
          <div className="flex items-center ml-5 w-full ">
            <input
              type="text"
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
              ref={captionRef}
            />
          </div>

          <div className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4">
            <button onClick={uploadPost} className="font-bold text-white">
              Post
            </button>
          </div>
        </div>
        <div className="border-b mb-4 mt-2"></div>

        <div className="flex justify-between mx-3  pb-3">
          <div className="flex  items-center">
            <div className="w-7 h-7">
              <Image src={camera} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live video</p>
          </div>

          <div className="flex items-center">
            <div className="w-7 h-7">
              <Image src={photos} alt="photos" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Photo/Video</p>
          </div>

          <div className="flex items-center">
            <div className="w-7 h-7">
              <Image src={smile} alt="smile" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">
              Feeling/Activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
