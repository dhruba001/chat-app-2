import express from "express";
// import controller functions
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// api routes
router.get("/login", loginUser);

router.get("/signup", signupUser);

router.get("/logout", logoutUser);

// export the middleware to server.js : authRoutes
export default router;
