// user authentication
// will be used as a api descriptiosn for authentication api's only

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// descriptions of api's used in authentication part

//signup api
export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body; // getting data as user enters in frontend form

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exist" });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Here we're calling a api service who will give us random profile pic, but with constant username the profile pic will be static
    // https://avatar.iran.liara.run/public/boy?username=dhruba --> this will be fixed everytime we refresh
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // making a new user from the data we got, directly adding the fullname  and other variable
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      // making jwt token
      generateTokenAndSetCookie(newUser._id, res);
      // making final db entry
      await newUser.save();
      /*
    Now newUser.fullName is the value as it exists in the MongoDB document after Mongoose has processed it — including:
    any schema-level transformations or defaults,
    validations or virtuals,
    potential middleware modifications.
    By using newUser.fullName, you ensure you’re returning the authoritative, saved value from the database, not just echoing the input.
    If you used { fullName }, you’d return the raw request data, which might differ from the stored document if any schema logic or transformations were applied.
     */
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.send(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signUp controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

//login user api
export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordValid) {
      return res.status(200).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

//logout user api
export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
