import React from "react";
import Footer from "./Components/Footer";
// import Header from "./Components/Header";
// import Imglist from "./Components/Imglist";
import SearchBar from "./Components/SearchBar";
//import { Link } from "react-router-dom";
import Header from "./Header";
import Imglist from "./Imglist";

const HomePage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <SearchBar />
      <Imglist />
      <Footer />
    </div>
  );
};

export default HomePage;
