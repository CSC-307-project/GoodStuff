import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";

const styles = {
  color: "blue",
  //background: "#0f0",
  fontSize: "39px",
  textAlign: "center"
};

const Register = (props) => {
  window.scrollTo(0, 0);

  const tags = ["Car", "Electronics", "Games"];
  const [checked, setChecked] = useState([]);

  //----Item to post to database---//
  const [item, setUser] = useState( 
    {
        title: "", 
        price: "",
        description: "", 
        image: "",
        tags: []
    }
  );


  //---Makes a list of checked tags----//
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if(event.target.checked){
        updatedList = [...checked, event.target.value];
    }
    else{
        updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setUser({
        title: item["title"],
        price: item["price"],
        description: item["description"],
        image: item["image"],
        tags: updatedList
    });
    console.log(item);
    setChecked(updatedList);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title")
      setUser({
        title: value,
        price: item["price"],
        description: item["description"],
        image: item["image"],
        tags: item["tags"]
      });
    else if(name === "price"){
        setUser({
            title: item["title"],
            price: value,
            description: item["description"],
            image: item["image"],
            tags: item["tags"]
        });
    }
    else if(name === "description"){
        setUser({
            title: item["title"],
            price: item["price"],
            description: value,
            image: item["image"],
            tags: item["tags"]
        });
    }
    else{
        setUser({
            title: item["title"],
            price: item["price"],
            description: item["description"],
            image: value,
            tags: item["tags"]
        });
    }    
  }

  return (
    <>
      <h1 style={styles}> GoodStuff </h1>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="text" name="title" placeholder="Title" onChange={handleChange}/>
          <input type="text" name="price" placeholder="Price" onChange={handleChange}/>
          <input type="text" name="description" placeholder="Description" onChange={handleChange}/>
          <input type="text" name="image" placeholder="Image URL" onChange={handleChange}/>

          <button type="submit">Post</button>
          <p>
            <Link to={"/"}>
              <strong>Exit</strong>
            </Link>
          </p>
        </form>
      </div>
      <div classname="checkList">
          <div classname="title">Tags:</div>
          <div classname="list-container">
            {tags.map((item, index) => (
                <div key={index}>
                    <input value={item} type="checkbox" onChange={handleCheck}/>
                    <span>{item}</span>
                </div>
                ))}
          </div>
      </div>
    </>
  );
};

export default Register;