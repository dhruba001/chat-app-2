import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    ); // find all user from db but remove password
    // except the one currently loggedin i.e me, so that we don't see our own name in sidebar
    res.status(200).json(allUser);
    //
  } catch (error) {
    console.log("error in get user for sidebar controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
