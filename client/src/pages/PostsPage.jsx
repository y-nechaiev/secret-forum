/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import axios from "../utils/axios";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [posts]);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts.length === 0 ? (
        <div className="text-xl text-center text-white py-10">
          You dont have any post...
        </div>
      ) : (
        posts.map((post, idx) => <PostItem post={post} key={idx} />)
      )}
    </div>
  );
}

export default PostsPage;
