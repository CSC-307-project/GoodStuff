import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import { Container } from "@mui/material";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@mui/material/IconButton";

// const styles = {
//   color: "blue",
//   //background: "#0f0",
//   fontSize: "39px",
//   textAlign: "center",
// };

const Register = (props) => {
  const [errorRegister, setErrorRegister] = useState(null);
  window.scrollTo(0, 0);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [verifyPassword, setVerifyPassword] = useState({
    verifyPassword: "",
  })

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "verifyPassword") {
      setVerifyPassword({
        [name]: value,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  }

  const register = async (e) => {
    e.preventDefault();
    console.log(user);
    console.log(verifyPassword);
    if (verifyPassword.verifyPassword !== user.password) {
      setErrorRegister("Verify Password does not match with Password");
    } else {
      setErrorRegister("");
      await axios
        .post("http://localhost:5001/register", user)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setUser({ username: "", email: "", password: "" });
            setVerifyPassword({ password: "" });
            window.location = "/login";
          } else {
            setErrorRegister(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorRegister(err.response.data.message);
        });
      }
  };

  return (
    <>
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
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={register}>
          {errorRegister && <p style={{ color: "red" }}>{errorRegister}</p>}
          <input
            type="username"
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Verify Password"
            value={user.verifyPassword}
            name="verifyPassword"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
