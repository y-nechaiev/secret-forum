/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { deletePost } from "../redux/features/post/postSlice";

function PostPage() {
  const [post, setActivePost] = useState({});
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setActivePost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const removePostHandler = () => {
    try {
      dispatch(deletePost(params.id));
      toast("Пост был удален");
      navigate("/posts");
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="flex justify-center items-center bg-gray-600 text-white text-sm py-2 px-4"
        type="button"
      >
        <Link to="/">Back</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:5000/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>
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
              <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
            </button>
          </div>
          {user?._id === post.author && (
            <div className="flex gap-3 mt-4">
              <button
                className="flex items-center justify-center gap-2 text-white opacity-50"
                type="button"
              >
                <Link to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button
                onClick={removePostHandler}
                className="flex items-center justify-center gap-2  text-white opacity-50"
                type="button"
              >
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>
        <div className="w-1/3">COMMENTS</div>
      </div>
    </div>
  );
}

export default PostPage;
