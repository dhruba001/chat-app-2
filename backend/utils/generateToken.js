// will create jwt and set it to cookie

import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // set the token in cookie
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // in milliseconds
    httpOnly: true, // prevents xss attack
    sameSite: "strict", // cors attack
    secure: process.env.NODE_ENV !== "development", // in dev it's flase in prod it's true
  });
};

export default generateTokenAndSetCookie;
