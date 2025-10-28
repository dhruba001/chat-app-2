import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // we are using cookie parser in server.js for this
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no token provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /*
Every incoming HTTP request creates a req (request) object in Express.
It’s a plain JavaScript object representing the client’s request (headers, body, cookies, etc.).
You can freely attach new properties to it during middleware execution. 
so here we added req.user as our custom property that we can access */

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route middleware", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default protectRoute;
