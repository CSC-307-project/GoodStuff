const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
mongoose.set("debug", true);

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getUser(email, password) {
  if (email === undefined || password === undefined) {
    return undefined;
  } else {
    return await findUserByEmailAndPassword(email, password);
  }
}

async function findUserByEmailAndPassword(email, password) {
  // console.log(email);
  // console.log(password);
  var query = await userModel
    .findOne({ email: email, password: password })
    .exec();
  console.log(query);
  if (query !== null) {
    // console.log("found");
    return query;
  } else {
    // console.log("Not FOund");
    return query;
  }
  //return await userModel.find({email: email, password: password});
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function findUserById(id) {
//   try {
//     return await userModel.findById(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

// async function deleteUser(id){
//   try{
//     return await userModel.findByIdAndDelete(id);
//   }catch(error){
//     console.log(error);
//     return undefined;
//   }
// }

exports.getUser = getUser;
exports.addUser = addUser;
exports.findUserByEmailAndPassword = findUserByEmailAndPassword;
