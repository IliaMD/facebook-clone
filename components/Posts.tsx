import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import React, { FC, useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import { PostType } from "./Post";
import Skeleton from "./Skeleton";

interface PostsI {}

const Posts: FC<PostsI> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoadPost, setIsLoadPost] = useState(true);

  useEffect(() => {
    onSnapshot(
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
    setIsLoadPost(false);
  }, [db]);

  return (
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[29rem] mx-auto">
        {isLoadPost
          ? Array(3)
              .fill("0")
              .map((_, index) => <Skeleton key={index} />)
          : posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userName={post.userName}
                profileImg={post.profileImg}
                caption={post.caption}
                timestamp={post.timestamp}
                image={post.image}
                video={post.video}
                isLoaded={post.isLoaded}
                haveMedia={post.haveMedia}
              />
            ))}
      </div>
    </div>
  );
};

export default Posts;
