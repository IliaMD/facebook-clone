import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import { PostType } from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const unSubcribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((obj) => ({
            id: obj.id,
            ...obj.data(),
          })) as PostType[]
        );
      }
    );

    return () => {
      unSubcribe();
    };
  }, [db]);

  return (
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[29rem] mx-auto">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userName={post.userName}
            profileImg={post.profileImg}
            caption={post.caption}
            timestamp={post.timestamp}
            image={post.image}
            video={post.video}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
