import React from "react";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import Header from "./Components/Header";
import Imglist from "./Components/Imglist";
import ProductHero from "./Components/ProductHero";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [product_list, setProductList] = useState([]);
  const [searchField, setSearchField] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  const searchByKey = (searchKey) => {
    setSearchMode(true);
    if (searchKey === null) {
      setSearchMode(false);
    } else {
      searchKey = searchKey.trim();
    }
    const filteredProducts = product_list.filter((product) => {
      const tags = product.tags;
      let index = -1;
      if (searchKey !== null) {
        index = tags.findIndex((element) => {
          return element.toLowerCase() === searchKey.toLowerCase();
        });
      }
      return product.title.toLowerCase().includes(searchKey) || index !== -1;
    });
    setSearchField(filteredProducts);
  };

  useEffect(() => {
    async function getProductsList() {
      await axios
        .get("http://localhost:5001/post")
        .then((response) => {
          const data_list = response.data;
          setProductList(data_list);
        })
        .catch((res) => {
          console.error(res);
        });
    }
    getProductsList();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <ProductHero searchByKey={searchByKey} />
      {searchField !== [] && searchMode ? (
        <Imglist product_list={searchField} />
      ) : (
        <Imglist product_list={product_list} />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
