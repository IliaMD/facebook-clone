import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";

import camera from "../../assets/camera.png";
import photos from "../../assets/photos.png";
import smile from "../../assets/smile.png";
import nouser from "../../assets/nouser.png";

export const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [captionValue, setCaptionValue] = useState("");
  const [image, setImage] = useState<any>("");
  const [video, setVideo] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const uploadPost = async () => {
    if (session) {
      setIsEmojiOpen(false);

      if (captionValue.trim() || image || video) {
        setLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
          profileImg: session?.user.image,
          userName: session?.user.name,
          caption: captionValue,
          timestamp: serverTimestamp(),
          haveMedia: false,
        });

        const imagePath = ref(storage, `/posts/${docRef.id}/image`);

        if (image) {
          await updateDoc(doc(db, "posts", docRef.id), {
            haveMedia: true,
          });
          await uploadString(imagePath, image, "data_url").then(async () => {
            const downloadUrl = await getDownloadURL(imagePath);
            if (downloadUrl) {
              await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadUrl,
                isLoaded: false,
              });
            }
          });
        }

        if (video) {
          await updateDoc(doc(db, "posts", docRef.id), {
            haveMedia: true,
          });
          await uploadString(imagePath, video, "data_url").then(async () => {
            const downloadUrl = await getDownloadURL(imagePath);
            if (downloadUrl) {
              await updateDoc(doc(db, "posts", docRef.id), {
                video: downloadUrl,
                isLoaded: false,
              });
            }
          });
        }

        setCaptionValue("");
        setImage("");
        setVideo("");
        setLoading(false);
      }
    } else {
      router.push("/auth/signin");
    }
  };

  const addImagetoState = (e: any) => {
    const reader = new FileReader();

    if (e.target.files[0] !== undefined && e.target.files[0].size < 5097152) {
      if (e.target.files[0].type?.includes("video")) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (readerEvent) => {
          setVideo(readerEvent.target?.result);
          setImage("");
        };
      }

      if (e.target.files[0].type?.includes("image")) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (readerEvent) => {
          setImage(readerEvent.target?.result);
          setVideo("");
        };
      }
    } else alert("You can upload image or video less then 5MB");
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setCaptionValue((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="w-screen sm:w-full">
      <div className="mx-auto max-w-[25rem] sm:max-w-[29rem] bg-white rounded-[1rem]  ">
        <div className="mt-8 flex items-center w-full p-3 pt-4 relative">
          <div className="w-12 h-12 shrink-0">
            <img
              src={session ? session.user.image : nouser.src}
              alt="user"
              className="rounded-full"
            />
          </div>
          <div className="flex items-center ml-5 w-full ">
            <input
              type="text"
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] rounded-full p-4 w-full h-12 truncate
             "
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
            />
          </div>

          <div
            className={`flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4 
          hover:bg-blue-600 active:bg-blue-400 ${loading}`}
          >
            <button
              onClick={uploadPost}
              className="font-bold text-white "
              disabled={loading}
            >
              {loading ? "Loading" : "Post"}
            </button>
          </div>
        </div>
        <div className="flex justify-end mx-1">
          {image && (
            <div className="m-2 w-full h-full" onClick={() => setImage("")}>
              <img
                src={image}
                alt="your image"
                className="max-w-[10rem] max-h-[10rem] w-full h-full shrink-0"
              />
            </div>
          )}
          {video && (
            <div className="m-2 w-full h-full" onClick={() => setVideo("")}>
              <video
                className="max-w-[10rem] max-h-[10rem] w-full h-full shrink-0"
                controls
              >
                <source src={video} />
              </video>
            </div>
          )}
          {isEmojiOpen && (
            <div className="">
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                emojiStyle={EmojiStyle.GOOGLE}
                skinTonesDisabled
                searchDisabled
                height={250}
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          )}
        </div>

        <div className="border-b mb-4 mt-2"></div>

        <div className="flex justify-between mx-3  pb-3 ">
          <div className="flex  items-center">
            <div className="w-7 h-7">
              <Image src={camera} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live video</p>
          </div>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              imageRef.current?.click();
            }}
          >
            <div className="w-7 h-7">
              <Image src={photos} alt="photos" />
            </div>

            <p className="pl-2 whitespace-nowrap text-[14px]">Photo/Video</p>
          </div>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          >
            <div className="w-7 h-7">
              <Image src={smile} alt="smile" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">
              Feeling/Activity
            </p>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={imageRef}
          onChange={addImagetoState}
          accept="image/*, video/*"
        />
      </div>
    </div>
  );
};
