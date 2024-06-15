import React from "react";
import BlogCard from "../components/BlogCard";
import "./styles/dasboard.css";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="home">
      <Header/>
      <BlogCard />
    </div>
  );
};

export default Dashboard;
