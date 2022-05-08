import { textAlign } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center"
};

const Login = (props) => {
  window.scrollTo(0, 0);

  function handleChange(event) {
    console.log(person);
    const { name, value } = event.target;
    if (name === "password") setPerson({ email: person["email"], password: value, username: person["username"] });
    else setPerson({ email: value, password: person["password"], username: person["username"] });
  }

  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });

  function login(){
    console.log(person);
    const result = props.verify(person);
    setPerson({ email: "", password: "", username: "" });
    console.log(result);
  } 

  return (
    <>
      <div>
      <h1 style ={styles}> GoodStuff </h1> 
      <span className="container d-flex flex-column justify-content-center align-items-center login-center">
        
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="email" name="email" placeholder="Email" value={person.email} onChange={handleChange}/>
          <input type="password" name="password" placeholder="Password" value={person.password} onChange={handleChange}/>
          <button type="submit" onClick={login}>Login</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </form>
      </span>
      </div> 
    </>
  );
};

export default Login;
