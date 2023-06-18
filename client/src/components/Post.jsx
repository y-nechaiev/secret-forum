/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Post({ post }) {
  if (!post) {
    return (
      <div className="text-xs text-white opacity-50">
        This post has been removed!
      </div>
    );
  }

  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:5000/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">{post.username}</div>
          <div className="text-xs text-white opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-white text-xl">{post.title}</div>
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
          {post.text}
        </p>

        <div className="flex gap-3 items-center mt-2">
          <button
            className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
            type="button"
          >
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
            type="button"
          >
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  );
}

Post.defaultProps = {
  post: null,
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    username: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default Post;
