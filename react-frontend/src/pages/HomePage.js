import React from "react";
import Footer from "./Components/Footer";
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
}

export default HomePage;

