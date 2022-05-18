const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: "Username already exist",
      required: "Username is required",
      validate(value) {
        if (value.length < 1)
          throw new Error("Invalid username, must be at least 1 character.");
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: "Email address already exist",
      required: "Email address is required",
      validate: [validateEmail, "Please enter a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required",
      validate(value) {
        if (value.length < 4)
          throw new Error("Invalid password, must be at least 4 character.");
      },
    },
    // list of product objects id
    listings: [
      {
        type: ObjectId,
        trim: true,
      },
    ],
    purchases: [
      {
        type: ObjectId,
        trim: true,
      },
    ],
    avatar: {
      type: String,
      default: "v1652716035/yynsno17xatmuag7nitr.jpg",
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
