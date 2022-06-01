import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import ProductCategories from "./Components/ProductCategories";

const ShopSection = () => {
  const [product_list, setProductList] = useState([]);
  let navigate = useNavigate();
  const user_id = Cookies.get("user_id");
  useEffect(() => {
    async function getProductsList() {
      await axios
        .get("http://localhost:5001/post")
        .then((response) => {
          const data_list = response.data;
          setProductList(data_list);
          console.log("Product Data received");
        })
        .catch(() => {
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
      <ProductCategories />
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {product_list.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <div className="shopBack">
                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className="shoptext">
                        <p>{product.title}</p>
                        <h3>${product.price}</h3>
                      </div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          console.log(user_id);
                          console.log(product.sellerId);
                          if (user_id === product.sellerId) {
                            alert("This is your own listing");
                          } else {
                            navigate("/product", {
                              state: { product_info: product },
                            });
                          }
                          //navigate("/product");
                        }}
                      >
                        purchase
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
