// import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/updateBlog/:id" element={<UpdateBlog />} />
            <Route path="/newblog" element={<NewBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
