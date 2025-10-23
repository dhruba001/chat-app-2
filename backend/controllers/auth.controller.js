// user authentication
// will be used as a api descriptiosn for authentication api's only

import User from "../models/user.model.js";

// descriptions of api's used in authentication part

//signup api
export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body; // getting data as user enters in frontend form

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      res.status(400).json({ error: "Username already exist" });
    }

    // todo: password hashing

    // Here we're calling a api service who will give us random profile pic, but with constant username the profile pic will be static
    // https://avatar.iran.liara.run/public/boy?username=dhruba --> this will be fixed everytime we refresh
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // making a new user from the data we got
    const newUser = new User({
      fullName,
      userName,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    // making final db entry
    await newUser.save();
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {}
};

//login user api
export const loginUser = (req, res) => {
  res.send("login route");
};

//logout user api
export const logoutUser = (req, res) => {
  res.send("logout route");
};
