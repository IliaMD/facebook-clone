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

import dots from "../assets/dots.png";
import hearth from "../assets/hearth.png";
import like from "../assets/like.png";
import bluelike from "../assets/25like.png";
import blacklike from "../assets/2unlike.png";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import nouser from "../assets/nouser.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";

export type PostType = {
  id: string;
  userName: string;
  profileImg: string;
  caption: string;
  timestamp: Timestamp;
  image?: string;
  video?: string;
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
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  const [likes, setLikes] = useState<LikeType[]>([]);
  const [comments, setComments] = useState<CommentsType[]>();
  const [singleComment, setSingleComment] = useState("");
  const [visibleDelete, setVisibleDelete] = useState(false);

  const [isEmojiOpenComment, setIsEmojiOpenComment] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [editableComment, setEditableComment] = useState("");
  const [editableCommentId, setEditableCommentId] = useState("");

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

  // delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (session) {
      await deleteDoc(doc(db, "posts", id, "comments", commentId));
    }
  };

  //update value of comment with like
  const onEmojionCommentClick = (emojiObject: EmojiClickData) => {
    setSingleComment((prev) => prev + emojiObject.emoji);
  };

  const handleChangeComment = (commentId: string, comment: string) => {
    setEditableCommentId(commentId);
    setIsEditComment(!isEditComment);
    setEditableComment(comment);
  };

  const onEnterSaveEditableComment = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      onBlurSaveEditableComment();
    }
  };

  const onBlurSaveEditableComment = async () => {
    if (editableComment !== singleComment) {
      await updateDoc(doc(db, "posts", id, "comments", editableCommentId), {
        comment: editableComment,
      });
    }
    setIsEditComment(false);
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
      {image && (
        <div className="-mx-5 max-h-[650px] max-w-[464px]">
          <img src={image} alt="Your post" className="object-contain" />
        </div>
      )}

      {video && (
        <div className="mx-5 max-h-[650px] max-w-[464px] ">
          <video controls className="object-contain">
            <source src={video} />
          </video>
        </div>
      )}

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
          {comments?.map((comment, index) => (
            <div key={index} className="flex justify-between items-center my-3">
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <img
                    src={comment.profileImg}
                    alt="user"
                    className="rounded-full "
                  />
                </div>
                {isEditComment && comment.id === editableCommentId ? (
                  <div className="ml-2">
                    <input
                      type="text"
                      className="outline-0 bg-[#f2f3f7] p-2 rounded-full w-full"
                      value={editableComment}
                      autoFocus
                      onBlur={onBlurSaveEditableComment}
                      onKeyDown={onEnterSaveEditableComment}
                      onChange={(e) => setEditableComment(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex">
                    <p className="ml-2 font-bold">{comment.username}</p>
                    <p className="ml-2">{comment.comment}</p>
                  </div>
                )}
              </div>

              {session?.user.name === comment.username && (
                <div className="flex items-center">
                  <CiEdit
                    className="mr-1 w-[22px] h-[20px] cursor-pointer"
                    onClick={() =>
                      handleChangeComment(comment.id, comment.comment)
                    }
                  />
                  <div
                    onClick={() => handleDeleteComment(comment.id)}
                    className="cursor-pointer"
                  >
                    <TiDeleteOutline className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
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
