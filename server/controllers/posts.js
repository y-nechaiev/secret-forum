/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      const fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();

      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    });

    await newPostWithoutImage.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: 'Something went wrong on create post action.' });
  }
};

// Get All Posts
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({ message: 'No posts.' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: 'Something went wrong on get all posts action.' });
  }
};

// Get Post By Id
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json(post);
  } catch (error) {
    res.json({ message: 'Something went wrong on get single post by id.' });
  }
};

// Get All Posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => Post.findById(post._id)),
    );

    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong on get users posts action.' });
  }
};

// Remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'This post does not exist.' });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: 'The post has been removed.' });
  } catch (error) {
    res.json({ message: 'Something went wrong on remove post action.' });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      const fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
      post.imgUrl = fileName || '';
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json(post);
  } catch (error) {
    res.json({ message: 'Something went wrong on update post action.' });
  }
};

// Get Post Comments
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      (post.comments || []).map((comment) => Comment.findById(comment)),
    );
    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong on get post comments action.' });
  }
};
