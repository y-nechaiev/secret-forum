/* eslint-disable import/no-named-as-default */
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Container from "./components/Container";

import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";
import "react-toastify/dist/ReactToastify.css";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Container>
  );
}

export default App;
