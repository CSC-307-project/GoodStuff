import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./MyApp.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import PostItem from "./pages/PostItem";
import Profile from "./pages/Components/Profile";
import Product from "./pages/ProductPage";
import SearchResult from "./pages/SearchResult";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function verifyAccount(person) {
    try {
      const response = await axios.get("http://localhost:5001/users", {
        params: {
          email: person.email,
          password: person.password,
        },
      });
      console.log(response.data.users_list);
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5001/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    console.log("update list");
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
  }

  return (
    // <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login verify={verifyAccount} />} />
        <Route
          path="/register"
          element={<Register handleSubmit={updateList} />}
        />
        <Route path="/post" element={<PostItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/searchresult" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default MyApp;
