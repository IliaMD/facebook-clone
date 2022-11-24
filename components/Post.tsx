import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import Comment from "./Comment";
import Loader from "./Loader";

import dots from "../assets/dots.png";
import hearth from "../assets/hearth.png";
import like from "../assets/like.png";
import bluelike from "../assets/25like.png";
import blacklike from "../assets/2unlike.png";
import { BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import nouser from "../assets/nouser.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

export type PostType = {
  id: string;
  userName: string;
  profileImg: string;
  caption: string;
  timestamp: Timestamp;
  isLoaded: boolean;
  haveMedia: boolean;
  image?: string;
  video?: string;
  /* onImageIsLoad: boolean; */
  /*  onSetImgLoad: (value: boolean) => void; */
};

export type LikeType = {
  username: string;
  id: string;
};

export type CommentsType = {
  username: string;
  profileImg: string;
  comment: string;
  timestamp: Timestamp;
  id: string;
};

const Post: FC<PostType> = ({
  id,
  userName,
  profileImg,
  caption,
  timestamp,
  image,
  video,
  isLoaded,
  haveMedia,

  /* onImageIsLoad */
  /*  onSetImgLoad, */
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState<LikeType[]>([]);
  const [comments, setComments] = useState<CommentsType[]>();
  const [singleComment, setSingleComment] = useState("");

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [isEmojiOpenComment, setIsEmojiOpenComment] = useState(false);
  // const [imgIsLoad, setImgIsLoad] = useState(false);
  const { data: session } = useSession();
  /*  const [onIsLoaded, setIsLoaded] = useState(false);
   */
  // onSetImgLoad = (value: boolean) => {
  //   setImgIsLoad(value);
  // };
  // console.log(imgIsLoad);

  //update post from loading to picture
  useEffect(() => {
    if (haveMedia) {
      updateDoc(doc(db, "posts", id), {
        isLoaded: true,
      });
    }
  }, [image, video]);

  // send comments to db on click post
  const sendComment = async (e: any) => {
    e.preventDefault();
    setIsEmojiOpenComment(false);

    if (singleComment.trim()) {
      await addDoc(collection(db, "posts", id, "comments"), {
        comment: singleComment,
        username: session?.user.name,
        profileImg: session?.user.image,
        timestamp: serverTimestamp(),
        commentId: uuidv4(),
      });
    }
    setSingleComment("");
  };

  // send comments to db on enter
  const sendCommentOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      sendComment(e);
    }
  };

  // update comments in app from db
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts", id, "comments"), orderBy("timestamp")),
      (snapshot) => {
        setComments(
          snapshot.docs.map((obj) => ({
            id: obj.id,
            ...obj.data(),
          })) as CommentsType[]
        );
      }
    );
  }, [db]);

  // updating likes in app from db
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(
        snapshot.docs.map((obj) => ({
          id: obj.id,
          ...obj.data(),
        })) as LikeType[]
      );
    });
  }, [db]);

  // checking if user has liked already
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  // delete and add like to db
  const handleLikePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session?.user.name,
        });
      }
    }
  };

  // delete post
  const handleDeletePost = async () => {
    if (session?.user.name === userName) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  //update value of comment with like
  const onEmojionCommentClick = (emojiObject: EmojiClickData) => {
    setSingleComment((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="bg-white rounded-[1rem] p-5 mt-4">
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
              <BiWorld className="ml-1 shrink-0 " />
            </div>
          </div>
        </div>
        <div className="w-10 h-10 relative cursor-pointer">
          <Image
            src={dots}
            alt="dots"
            onClick={() => setVisibleDelete(!visibleDelete)}
          />

          {visibleDelete && (
            <div
              className="flex w-[150px] absolute right-0 top-8 z-50
               bg-white p-3 items-center cursor-pointer justify-between"
              onClick={handleDeletePost}
            >
              <p className="">Удалить пост</p>
              <MdOutlineDeleteForever className="shrink-0 w-7 h-7" />
            </div>
          )}
        </div>
      </div>
      {/* Input */}
      <div className="mt-3 mb-2">
        <p>{caption}</p>
      </div>
      {/* Image */}
      {/* {isLoaded && image} */}
      {/*    true и картинка то рисуй картинку если картинка и фолс то рисуй лоадер
      если нет картинки то ничего */}

      {haveMedia &&
        (isLoaded ? (
          (image && (
            <div className="-mx-5 max-h-[650px] max-w-[464px]">
              <img src={image} alt="Your post" className="object-contain" />
            </div>
          )) ||
          (video && (
            <div className="mx-5 max-h-[650px] max-w-[464px] ">
              <video controls className="object-contain">
                <source src={video} />
              </video>
            </div>
          ))
        ) : (
          <Loader />
        ))}

      {/* {image && isLoaded ? (
        <div className="-mx-5 max-h-[650px] max-w-[464px]">
          <img src={image} alt="Your post" className="object-contain" />
        </div>
      ) : (
        <Loader />
      )}

      {video && isLoaded ? (
        <div className="mx-5 max-h-[650px] max-w-[464px] ">
          <video controls className="object-contain">
            <source src={video} />
          </video>
        </div>
      ) : (
        <Loader />
      )} */}
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
              {likes.length > 0
                ? `${likes[0]?.username} and another ${likes.length - 1}`
                : "No one has liked yet"}
            </p>
          </div>
          <p className="whitespace-nowrap text-[15px] sm:text-[16px]">
            {comments?.length} comments
          </p>
        </div>
        <div className="border-b my-2"></div>
        <div className="flex justify-between items-center mx-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLikePost}
          >
            <img
              src={hasLiked ? bluelike.src : blacklike.src}
              className="w-6 h-6"
            />
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
          <p>See {comments?.length} previous comments</p>
          <div className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </div>
        </div>

        <div className="max-h-40 overflow-y-auto">
          {/* Comments */}
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              userName={comment.username}
              text={comment.comment}
              profileImg={comment.profileImg}
              postId={id}
            />
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center mt-4 relative">
        {isEmojiOpenComment && (
          <div className="absolute bottom-[2.55rem] left-[6rem]">
            <EmojiPicker
              onEmojiClick={onEmojionCommentClick}
              emojiStyle={EmojiStyle.GOOGLE}
              skinTonesDisabled
              searchDisabled
              height={200}
              width={300}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
        <div className="w-10 h-10 shrink-0">
          <img
            src={session ? session.user.image : nouser.src}
            alt="user"
            className="rounded-full "
          />
        </div>
        <div className="flex justify-between items-center ml-2 w-full bg-[#f2f3f7] rounded-full relative">
          <input
            type="text"
            placeholder="Write a comment"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full w-full "
            value={singleComment}
            onChange={(e) => setSingleComment(e.target.value)}
            onKeyDown={sendCommentOnEnter}
          />
          <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile
              onClick={() => setIsEmojiOpenComment(!isEmojiOpenComment)}
            />
          </div>
          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold px-2 " onClick={sendComment}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
