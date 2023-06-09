/* eslint-disable react/prop-types */
import React from "react";

function PopularPosts({ post }) {
  return (
    <div className="bg-gray-600 my-1">
      <div className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white">
        {post.items}
      </div>
    </div>
  );
}

export default PopularPosts;
