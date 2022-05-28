//const { response } = require("express");
const express = require("express");
//const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const port = 5001;
const userServices = require("./models/user-services");
const productServices = require("./models/product-services");

// let users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor",
//     },
//     {
//       id: "abc123",
//       name: "Macs",
//       job: "Bouncer",
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor",
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress",
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender",
//     },
//   ],
// };

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! GoodStuff ");
});

// look into using "...app.get("/searchitem")..." instead, want to consolidate, all tags have "", so put that in for same functionality
// - does not consider whether product is archived...
// gets all post
app.get("/post", async (req, res) =>{ 
  const products_list = await productServices.getProducts(); 
  console.log(products_list);
  if (products_list === undefined || products_list === null){ 
    res.status(404).send({message:"No product posted yet"})
  }else{
    res.status(200).send(products_list); 
  }
});

// verifies user by email and password -> returns a user object if valid
app.post("/login", async (req, res) => {
  const { email, password } = req.body.person;
  let result = await userServices.findUserByEmail(email);
  console.log(result);
  if (result === null) {
    res.status(404).json({ message: "User Not Registered" });
  } else if (result !== null && password !== result.password) {
    res.status(404).json({ message: "Password Incorrect" });
  } else {
    res.status(200).send(result.toObject());
  }
});

// updates a user profile picture 
app.patch("/profile", async (req, res) => { 
  // console.log("hello patch"); 
  console.log(req.body); 
  const{user_id, avatar_url} = req.body; 
  // console.log(user_id); 
  // console.log(avatar_url); 
  let result = await userServices.updateUserAvatar(user_id, avatar_url); 
}); 

// gets a user by a username
app.get("/username", async(req, res) => { 
  const user_id = req.query.user_id; 
  let user = await userServices.findUserById(user_id); 
  if (user === null) { 
    res.status(404).send({message: "User not found"}); 
  } else{ 
    res.status(200).send(user);  
  }
});

// gets the avatar url image from the user
app.get("/avatar", async (req, res) => {
  // console.log(req.query.user_id); 
  const user_id = req.query.user_id; 
  let avatar_url = await userServices.findUserById(user_id); 
  console.log(avatar_url);
  if(avatar_url === null || avatar_url === undefined){ 
    res.status(200).send("v1652716035/yynsno17xatmuag7nitr.jpg");
  }
  else{
    //console.log(avatar_url);
    res.status(200).send(avatar_url['avatar']); 
  }
});

// searches for items by matching the search string to anything in the tags array
app.get("/searchItem", async (req, res) => {
  let userSearchBarInput = req.query.userSearchBarInput;
  userSearchBarInput = userSearchBarInput.split(/[, ]+/);
  // findProductsByTags takes in an array of tags to filter and a boolean for archieved to filter
  let filteredProducts = await productServices.findProductsByTags(userSearchBarInput, false); 
  console.log(filteredProducts);

  if (filteredProducts === null || filteredProducts === undefined) { 
    res.status(200).send(filteredProducts);
  } else {
    res.status(404).json({ message: "No products found" }).end(); 
  }
})

// gets a user from the database, verifies password and email match in the backend
app.get("/users", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  // console.log("email --> " + email);
  // console.log("Password --> " + password);
  try {
    const result = await userServices.getUser(email, password);
    // console.log("result --> " + result);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name && user["job"] === job
//   );
// };

// app.get("/users/:id", async (req, res) => {
//   const id = req.params["id"];
//   const result = await userServices.findUserById(id);
//   if (result === undefined || result === null)
//     res.status(404).send("Resource not found.");
//   else {
//     res.send({ users_list: result });
//   }
// });

// post a new user object, returns errors if unable to complete process 
app.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    console.log("Success: " + savedUser);
    res.status(201).send(savedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(404).json({ message: err.message }).end();
    } else if (err.code && err.code === 11000) {
      res
        .status(404)
        .json({
          message: "DuplicationError: Username and/or Email Already Exist",
        })
        .end();
    } else {
      res.status(500).json({ message: "An unknown error occurred" }).end();
    }
  }
});

// post an product and updates user listing arr
app.post("/postitem", async (req, res) => {
  try {
    const item = req.body;
    const sellerId = item.sellerId;
    const savedItem = await productServices.addItem(item);
    const sellerObj = await userServices.findUserById(sellerId);
    const updateUserListings = await userServices.updateUserListings(sellerObj._id, savedItem._id);
    console.log("Success: " + savedItem + updateUserListings);
    res.status(201).send(updateUserListings);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message }).end();
  }
});

// purchases item by appending productid to buyer object's purchaseId arr and removes item by setting "archived" value to true
app.post("/purchaseitem", async (req, res) => {
  try {
    const item = req.body;
    const itemId = item.itemId;
    const buyerId = item.buyerId;
    console.log('Hello' + itemId); 
    console.log('Hey' + buyerId); 
    const updateUserPurchases = await userServices.updateUserPurchases(buyerId, itemId);
    const archiveProduct = await productServices.archiveProduct(itemId); 
    res.status(201).send(updateUserPurchases + archiveProduct);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message }).end();
  }
})

// removes item by setting "archived" value to true
app.post("/removeitem", async (req, res) => {
  try {
    const item = req.body;
    const itemId = item.itemId;
    const archiveProduct = await productServices.archiveProduct(itemId);
    res.status(201).send(archiveProduct);
  } catch (error) {
    console.log(err);
    res.status(404).json({ message: err.message }).end();
  }
})

// app.delete("/users/:id", async (req, res) => {
//   //const result = removeUser(req.body.id)
//   console.log(req.params.id);
//   const result = await userServices.deleteUser(req.params.id);
//   console.log(result);
//   //removeUser(req.params.id);
//   if (result) {
//     //prompt 4: successful delete
//     res.status(204).end();
//   } else {
//     //resource not found
//     res.status(404).end();
//   }
// });

// function removeUser(user_to_delete_id) {
//   user_to_delete = users["users_list"].find(
//     (user) => user["id"] === user_to_delete_id
//   );
//   if (user_to_delete) {
//     users["users_list"].splice(users["users_list"].indexOf(user_to_delete), 1);
//     return 0;
//   } else {
//     return 1;
//   }
// }

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
/*
Trying to make a fecth call and have recent user added to the list 

useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id))
        .then(data => setPostName(data.name))
        .then(data => setPostJob(data.job));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
*/
