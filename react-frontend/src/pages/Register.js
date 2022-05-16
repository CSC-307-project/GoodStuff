import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import { Container } from "@mui/material";

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center"
};

const Register = (props) => {
  window.scrollTo(0, 0);

  const [user, setUser] = useState( 
    {
        username: "", 
        email: "",
        password: "", 
    }
  );

  function handleChange(event) {
    console.log(user)
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function register(){
    console.log(user);
    const result = props.handleSubmit(user);
    setUser({username:"", email: "", password: ""}); 
    console.log(result);
  }

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
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="text" placeholder="Username" value={user.username} name="username" onChange={handleChange}/>
          <input type="email" placeholder="Email" value={user.email} name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" value={user.password} name="password" onChange={handleChange}/>

          <button type="submit" onClick = {register}>Register</button>
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