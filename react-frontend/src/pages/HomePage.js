import React from "react";
import Footer from "./Components/Footer";
// import Header from "./Components/Header";
// import Imglist from "./Components/Imglist";
// import SearchBar from "./Components/SearchBar";
//import { Link } from "react-router-dom";
// import Header from "./Header";
// import Imglist from "./Imglist";
import Header from "./Components/Header";
import Imglist from "./Components/Imglist";
import ProductHero from "./Components/ProductHero";

const HomePage = () => {
  return (
    <React.Fragment>
      <Header />
      <ProductHero />
      <Imglist />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
