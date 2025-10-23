// user authentication
export const loginUser = (req, res) => {
  res.send("login route");
  console.log("login");
};

export const logoutUser = (req, res) => {
  res.send("logout route");
};

export const signupUser = (req, res) => {
  res.send("signup route");
};
