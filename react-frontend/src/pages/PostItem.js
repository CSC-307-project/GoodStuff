import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center",
};

const Register = (props) => {
  const [errorPost, setErrorPost] = useState(null);
  // window.scrollTo(0, 0);

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

  //----Item to post to database---//
  const [item, setUser] = useState({
    sellerId: "",
    title: "",
    price: "",
    address: "",
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
      sellerId: item["sellerId"],
      title: item["title"],
      price: item["price"],
      address: item["address"],
      description: item["description"],
      image: item["image"],
      tags: updatedList,
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
      sellerId: get_user_id,
      title: item["title"],
      price: item["price"],
      address: item["address"],
      description: item["description"],
      image: item["image"],
      tags: item["tags"].concat(item["title"].split(" ")),
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
            description: "",
            image: "",
            tags: [],
          });
          setErrorPost("");
          // window.location = "/";
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
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />
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
