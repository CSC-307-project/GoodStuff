import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
// import Imglist from "./Components/Imglist";
// import SearchBar from "./Components/SearchBar";
//import { Link } from "react-router-dom";
// import Header from "./Header";
// import Imglist from "./Imglist";
import SearchBar from "./Components/SearchBar";
//import Header from "./Components/Header";
import Imglist from "./Components/Imglist";
import ProductHero from "./Components/ProductHero";
import Cookies from 'js-cookie'; 

const HomePage = () => {
  console.log(Cookies.get('user_id'));

  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <ProductHero />
      <Imglist />
      <Footer /> 
    </React.Fragment>
  );
};

export default HomePage;
