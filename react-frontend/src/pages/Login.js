import { textAlign } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center"
};

const Login = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <div>
      <h1 style ={styles}> GoodStuff </h1> 
      <span className="container d-flex flex-column justify-content-center align-items-center login-center">
        
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
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
