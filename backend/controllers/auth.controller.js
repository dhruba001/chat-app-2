// user authentication
// will be used as a api descriptiosn for authentication api's only

import User from "../models/user.model";

// descriptions of api's used in authentication part

//signup api
export const signupUser = async (req, res) => {
  try {
    const { firstName, userNmae, password, gender } = req.body; // getting data as user enters in frontend form
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
