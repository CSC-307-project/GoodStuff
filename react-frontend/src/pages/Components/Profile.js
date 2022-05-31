import React from "react";
import Dashboard from "./Dashboard";
import Listings from "./Listings";
import Purchasings from "./Purchasings";
import Button from "@mui/material/Button";

import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const myStyle = {
  backgroundImage:
    "url('https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95c5218ea.png')",
  height: "195vh",
  marginTop: "-70px",
  fontSize: "50px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Profile = () => {
  const [user_listings, setUserListings] = useState([]);
  const [user_purchasings, setUserPurchasings] = useState([]);

  let user_id = Cookies.get("user_id");
  useEffect(() => {
    async function getbuysell() {
      await axios
        .get("http://localhost:5001/sellbuy", {
          params: { user_id: user_id },
        })
        .then((response) => {
          console.log(response.data);
          setUserListings(response.data.data.sell);
          setUserPurchasings(response.data.data.buy);
        })
        .catch((res) => {
          console.error(res);
        });
    }
    getbuysell();
  }, []);

  const handleClick = () => {
    window.location = "/";
  };

  return (
    <div style={myStyle}>
      <div className="fixed-top">
        {" "}
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: "#5f9ea0" }}
        >
          Home
        </Button>
      </div>
      <Dashboard />
      <Listings sell={user_listings} />
      <Purchasings buy={user_purchasings} />
    </div>
  );
};

export default Profile;
