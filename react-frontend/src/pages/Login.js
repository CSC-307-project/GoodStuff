//import { textAlign } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../img/logo.png"
import { Container } from "@mui/material";

// const styles = {
//   color: "blue",
//   //background: "#0f0",
//   fontSize: "39px",
//   textAlign: "center",
// };

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const Login = (props) => {
  const [errorLogin, setErrorLogin] = useState(null);
  window.scrollTo(0, 0);

  function handleChange(event) {
    console.log(person);
    const { name, value } = event.target;
    if (name === "password")
      setPerson({
        email: person["email"],
        password: value,
        username: person["username"],
      });
    else
      setPerson({
        email: value,
        password: person["password"],
        username: person["username"],
      });
  }

  // function handleEntailmentRequest(e) {
  //   e.preventDefault();

  // }

  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });

  // async function login(){
  //   //console.log(person);
  //   const response = await axios.post("http://localhost:5001/login", { person });
  //   console.log(response);
  //   // const result = props.verify(person);
  //   // setPerson({ email: "", password: "", username: "" });
  //   // console.log(result);
  // }
  const login = async (e) => {
    e.preventDefault();
    console.log(person);
    //const result = props.verify(person);
    //setPerson({ email: "", password: "", username: "" });
    //console.log(result);

    await axios
      .post("http://localhost:5001/login", {
        person,
      })
      .then((res) => {
        deleteAllCookies();
        document.cookie = `${res.data._id}`;
        console.log(document.cookie);
        window.location = "/";
      })
      .catch((err) => {
        setErrorLogin(err.response.data.message);
      });

    // const result = props.verify(person);
    // setPerson({ email: "", password: "", username: "" });
    // console.log(result);
  };

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5001/users");
      // console.log(response.data.users_list);
      return response.data.users_list;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(fetchAll());
  });

  return (
    <>
      <div>
        <Container
        sx={{
          mt: 3,
          mb: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src= {logo}
          alt="logo"
          width="180"
          height="180"
        />
        </Container>
        <span className="container d-flex flex-column justify-content-center align-items-center login-center">
          <form className="Login col-md-8 col-lg-4 col-11" onSubmit={login}>
            {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={person.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={person.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
            <p>
              <Link to={"/register"}>
                Create an Account <strong>Register</strong>
              </Link>
            </p>
          </form>
        </span>
      </div>
    </>
  );
};

export default Login;
