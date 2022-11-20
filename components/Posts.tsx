import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";

interface PostsType {
  profileImg: string;
  userName: string;
  caption: string;
  timestamp: any;
  id: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<PostsType[]>([]);

  console.log(posts);

  useEffect(() => {
    const unSubcribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as PostsType[]
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
            userImg={post.profileImg}
            caption={post.caption}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
