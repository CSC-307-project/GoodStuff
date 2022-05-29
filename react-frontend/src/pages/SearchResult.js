import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { useState, useEffect } from "react";
import axios from "axios";

//sample data
const products = [
  {
    _id: "1",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 89,
    countInStock: 3,
  },
  {
    _id: "2",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 599,
    countInStock: 10,
    rating: 2,
    numReviews: 2,
  },
  {
    _id: "3",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 929,
    countInStock: 0,
  },
  {
    _id: "4",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 399,
    countInStock: 10,
  },
  {
    _id: "5",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 49,
    countInStock: 7,
  },
  {
    _id: "6",
    name: "Bike",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    description: "",
    price: 29,
    countInStock: 0,
  },
];

const ShopSection = () => {
  const [product_list, setProductList] = useState([]);
  useEffect(() => {
    async function getProductsList() {
      await axios
        .get("http://localhost:5001/post")
        .then((response) => {
          const data_list = response.data;
          setProductList(data_list);
          console.log("Product Data received");
        })
        .catch((res) => {
          console.log("Not receiving data");
        });
    }
    getProductsList();
  }, []);

  return (
    <>
      <SearchBar
        onChange={() => console.log("onChange")}
        onRequestSearch={() => console.log("onRequestSearch")}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      />
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {products.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>
                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>
                        <h3>${product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  sample */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item active`}>
            <Link className="page-link" to={"#"}>
              1
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              2
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              3
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              4
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              5
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShopSection;
