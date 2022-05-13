import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Imglist from "./Imglist";

const HomePage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <Imglist />
    </div>
  );
}

export default HomePage;

