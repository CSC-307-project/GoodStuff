import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./MyApp.css";
import "./responsive.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import PostItem from "./pages/PostItem";

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
      //prompt 3
      console.log(response.data.users_list);
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) setCharacters(result);
  //   });
  // }, []);

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

  // async function makeDeleteCall(user_id) {
  //   try {
  //     console.log(user_id);
  //     //const response = await axios.delete("http://localhost:5001/users", {id: user_id});
  //     //prompt 4
  //     const response = await axios.delete(
  //       `http://localhost:5001/users/${user_id}`
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // function removeOneCharacter(index) {
  //   //console.log(characters[index].id)
  //   makeDeleteCall(characters[index]._id).then((result) => {});
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  return (
    <div className="container">
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/login" element={<Login verify={verifyAccount}/>} />
           <Route path="/register" element={<Register handleSubmit={updateList}/>} />
           <Route path="/post" element={<PostItem />} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default MyApp;
