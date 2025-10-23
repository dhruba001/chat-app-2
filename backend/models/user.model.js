// Here we will make the table skeleton for user table, later we will make one for messages.
// here we will make the schema or class for user, with name, email, password and other

import mongoose from "mongoose";

// this is how each instance of an users collection [i.e table] entry will look like
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  userNmae: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"], // use it when input must match predefined values
  },
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema); // make an users collection with userschema as reference, User -> users automatically

export default User; // exporting user model
// now we can use this user model in our file
