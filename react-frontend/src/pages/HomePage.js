import React from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Imglist from "./Components/Imglist";

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

