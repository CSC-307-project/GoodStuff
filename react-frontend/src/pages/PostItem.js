import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
//import address from "./Components/AddressAutocomplete/inputField";
import useInput from "./Components/AddressAutocomplete/useInput";
import styled from "styled-components";

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center",
};

const Register = (props) => {
  const [errorPost, setErrorPost] = useState(null);

  const tags = [
    "Car",
    "Electronics",
    "Games",
    "Bicycle",
    "Parts",
    "Furniture",
    "Tools",
  ];
  const [checked, setChecked] = useState([]);

  const address = useInput("");

  //----Item to post to database---//
  const [item, setUser] = useState({
    sellerId: "",
    title: "",
    price: "",
    address: "",
    cordinates: [],
    description: "",
    image: "",
    tags: [],
  });

  //---Makes a list of checked tags----//
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setUser({
      ...item,
      ["tags"]: updatedList,
    });
    console.log(item);
    setChecked(updatedList);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...item,
      [name]: value,
    });
  }

  const updateFields = () => {
    const get_user_id = Cookies.get("user_id");
    setUser({
      ...item,
      sellerId: get_user_id,
      tags: [...new Set([...item["tags"], ...(item["title"].split(" ")), ...(item["address"].replace(/[0-9]/g, '').split(", ")), ...[""]])],
    });
  }

  const post = async (e) => {
    e.preventDefault();
    console.log(item);

    await axios
      .post("http://localhost:5001/postitem", item)
      .then((res) => {
        if (res.status === 201) {
          setUser({
            sellerId: "",
            title: "",
            price: "",
            address: "",
            cordinates: [],
            description: "",
            image: "",
            tags: [],
          });
          setErrorPost("");
          window.location = "/";
        } else {
          setErrorPost(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorPost(err.response.data.message);
      }); 
  };

  return (
    <>
      <h1 style={styles}> GoodStuff </h1>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onClick={updateFields} onSubmit={post}>
          {errorPost && <p style={{ color: "red" }}>{errorPost}</p>}
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price, $"
            onKeyPress={(event) => {
              if (!/[\.0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={handleChange}
          />

          <Wrapper>
            <Input
              placeholder="Address"
              {...address}
              isTyping={address.value !== ""}
            />
            {address.suggestions?.length > 0 && (
              <SuggestionWrapper>
                {address.suggestions.map((suggestion, index) => {
                  return (
                    <Suggestion
                      key={index}
                      onClick={() => {
                        address.setValue(suggestion.place_name);
                        address.setSuggestions([]);

                        item.address = suggestion.place_name;
                        item.cordinates = suggestion.center;
                        console.log(item);                    
                      }}
                    >
                      {suggestion.place_name}
                    </Suggestion>
                  );
                })}
              </SuggestionWrapper>
            )}
          </Wrapper>
          
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <div style={{ textAlign: "left" }} classname="checkList">
            <h4> Tags:</h4>
            <div classname="list-container">
              {tags.map((item, index) => (
                <div key={index}>
                  <div>
                    <input
                      name={item}
                      value={item}
                      type="checkbox"
                      onChange={handleCheck}
                    />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Post</button>
          <p>
            <Link to={"/"}>
              <strong>Exit</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

const Wrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0 auto;
  `;
  
  const Input = styled.input`
    width: 400px;
    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    position: relative;
    display: grid;
    justify-self: center;
    &:focus {
      outline: none;
      border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
    }
  `;
  
  const SuggestionWrapper = styled.div`
    background: gainsboro;
    position: absolute;
    width: 400px;
    padding: 10px 20px;
    border-radius: 0px 0px 10px 10px;
  `;
  
  const Suggestion = styled.p`
    cursor: pointer;
    max-width: 400px;
  `;