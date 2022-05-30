const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
//mongoose.set("debug", true);

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

async function findUserByEmail(email) {
  let query = await userModel.findOne({ email: email }).exec();
  return query;
}

async function findUserByEmailAndPassword(email, password) {
  var query = await userModel
    .findOne({ email: email, password: password })
    .exec();
  //console.log(query);
  return query;
}

// Improve error codes
async function addUser(user) {
  const userToAdd = new userModel(user);
  const savedUser = await userToAdd.save();
  //console.log(savedUser);
  return savedUser;
}

async function findUserByUsername(username) {
  var query = await userModel.findOne({ username: username });
  //console.log(query);
  return query;
}

async function updateUserAvatar(user_id, avatar) {
  //console.log(user_id);
  //console.log(avatar);
  return await userModel.updateOne(
    { _id: user_id },
    {
      $set: { avatar: avatar },
    }
  );
}

async function findUserById(user_id) {
  let user = await userModel.findOne({ _id: user_id });
  return user;
}

// async function findUserListings(user_id){ 
//   return await productModel.find({ 
//     _id: user_id
//   })
// }

async function updateUserListings(sellerid, listingId) {
  //console.log(sellerid);
  //console.log(listingId);
  let user = await userModel.updateOne(
    { _id: sellerid },
    { $push: { listingId: listingId } }
  );
  return user;
}

async function updateUserPurchases(buyerId, listingId) {
  //console.log(buyerId);
  //console.log(listingId);
  let user = await userModel.updateOne(
    { _id: buyerId },
    { $push: { purchaseId: listingId } }
  );
  return user;
}

// *** should only be used for unitTesting (services.test.js) ***
async function deleteUser(userId) {
  let deletedUserStat = userModel.deleteOne({ _id: userId });
  return deletedUserStat;
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.findUserByEmailAndPassword = findUserByEmailAndPassword;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.updateUserAvatar = updateUserAvatar;
exports.findUserById = findUserById;
exports.updateUserListings = updateUserListings;
exports.updateUserPurchases = updateUserPurchases;
exports.deleteUser = deleteUser;
