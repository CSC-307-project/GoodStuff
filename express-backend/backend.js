const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const port = 5001;

const userServices = require("./models/user-services");

let users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Macs",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! GoodStuff ");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body.person;
  //let result = await userServices.findUserByEmailAndPassword(email, password);
  let result = await userServices.findUserByEmail(email);
  console.log(result);
  if (result === null) {
    res.status(404).json({ message: "User Not Registered" });
  } else if (result !== null && password !== result.password) {
    res.status(404).json({ message: "Password Incorrect" });
  } else {
    res.status(200).send(result);
  }
});
/*
app.get('/users', (req, res) => {
    const name = req.query.name; 
    console.log(name) 
    if (name != undefined){
        let result = findUserByName(name); 
        result = {users_list: result}; 
        res.send(result);
    }
    else{
        res.send(users);
    }
});
*/

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};
// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   const job = req.query.job;
//   if (name != undefined && job != undefined) {
//     let result = findUserByNameAndJob(name, job);
//     result = { users_list: result };
//     res.send(result);
//   } else if (name != undefined && job == undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else if (name == undefined && job != undefined) {
//     let result = findUserByJob(job);
//     result = { user_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

app.get("/users", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  console.log("email --> " + email);
  console.log("Password --> " + password);
  try {
    const result = await userServices.getUser(email, password);
    console.log("result --> " + result);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

// app.get("/users/:id", (req, res) => {
//   const id = req.params["id"];
//   let result = findUserById(id);
//   if (result === undefined || result.length == 0)
//     res.status(404).send("Resource not found.");
//   else {
//     result = { users_list: result };
//     res.send(result);
//   }
// });

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id);
  //or
  //return users['users_list'].filter( (user) => user['id'] === id);
}

// app.post("/users", (req, res) => {
//   console.log(req.body)
//   const userToAdd = req.body;
//   console.log("app.post" + userToAdd);
//   /* prompt 2*/
//   new_user = {
//     id: uuidv4().slice(0, 8),
//     name: userToAdd.name,
//     job: userToAdd.job,
//   };
//   console.log(new_user.id)
//   addUser(new_user);
//   //res.status(200).end();
//   //res.status(201).end();
//   res.status(201).send(new_user); //prompt 1 + 3
// });

app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

function addUser(user) {
  //Add the ID field with a random ID
  users["users_list"].push(new_user);
}

//app.delete("/users/", (req, res) => {

// app.delete("/users/:id", (req, res) => {
//     //const result = removeUser(req.body.id)
//     const result = removeUser(req.params.id);
//     console.log(users);
//     if (result == 0) {
//         //prompt 4: successful delete
//         res.status(204).end();
//     } else {
//         //resource not found
//         res.status(404).end();
//     }
// });

app.delete("/users/:id", async (req, res) => {
  //const result = removeUser(req.body.id)
  console.log(req.params.id);
  const result = await userServices.deleteUser(req.params.id);
  console.log(result);
  //removeUser(req.params.id);
  if (result) {
    //prompt 4: successful delete
    res.status(204).end();
  } else {
    //resource not found
    res.status(404).end();
  }
});

// app.delete("/users", (req, res) => {

//     console.log(req.body);
//     const { id } = req.body;

//     // console.log(user_id)
//     // const result = removeUser(req.body.user_id);
//     // console.log(users);
//     // if (result == 0) {
//     //     res.status(204).send();
//     // } else {
//     //     res.status(404).send();
//     // }
// });

function removeUser(user_to_delete_id) {
  user_to_delete = users["users_list"].find(
    (user) => user["id"] === user_to_delete_id
  );
  if (user_to_delete) {
    users["users_list"].splice(users["users_list"].indexOf(user_to_delete), 1);
    return 0;
  } else {
    return 1;
  }
}

app.listen(port, () => {
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
