import React, { FC, useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";

interface CommentI {
  userName: string;
  profileImg: string;
  text: string;
  commentId: string;
  postId: string;
}

const Comment: FC<CommentI> = ({
  userName,
  profileImg,
  text,
  commentId,
  postId,
}) => {
  const [isEditComment, setIsEditComment] = useState(false);
  const [editableComment, setEditableComment] = useState(text);

  const { data: session } = useSession();

  const onEnterSaveEditableComment = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      onBlurSaveEditableComment();
    }
  };

  const onBlurSaveEditableComment = async () => {
    if (editableComment !== text) {
      await updateDoc(doc(db, "posts", postId, "comments", commentId), {
        comment: editableComment,
      });
    }
    setIsEditComment(false);
  };

  const handleDeleteComment = async () => {
    if (session) {
      await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    }
  };
  return (
    <div className="flex justify-between items-center my-3">
      <div className="flex items-center">
        <div className="w-10 h-10">
          <img src={profileImg} alt="user" className="rounded-full " />
        </div>
        {isEditComment ? (
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
            <p className="ml-2 font-bold">{userName}</p>
            <p className="ml-2">{text}</p>
          </div>
        )}
      </div>

      {session?.user.name === userName && (
        <div className="flex items-center">
          <CiEdit
            className="mr-1 w-[22px] h-[20px] cursor-pointer"
            onClick={() => setIsEditComment(!isEditComment)}
          />
          <div onClick={handleDeleteComment} className="cursor-pointer">
            <TiDeleteOutline className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
