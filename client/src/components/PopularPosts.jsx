/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function PopularPosts({ post }) {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`${post._id}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
}

PopularPosts.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PopularPosts;
