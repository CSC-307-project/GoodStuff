import React from "react";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import Header from "./Components/Header";
import Imglist from "./Components/Imglist";
import ProductHero from "./Components/ProductHero";
import Cookies from 'js-cookie'; 
import ProductCategories from './Components/ProductCategories';

const HomePage = () => {
  console.log(Cookies.get('user_id'));

  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <ProductHero />
      <ProductCategories />
      <Footer /> 
    </React.Fragment>
  );
};

export default HomePage;
