//package imports
import express from "express";
import dotenv from "dotenv";
//file imports
import connectToMongoDB from "./DB/connectToMongoDB.js";
import authRoutes from "../backend/routes/auth.routes.js";
//variables
const app = express(); // making express app instance
const PORT = process.env.PORT || 5000; // getting port from env variable

// it loads environment variables from a file named .env into process.env.
// Then these values become available throughout your code as environment variables:
dotenv.config();

app.use(express.json()); // middleware : allows server to understand and handle data sent in JSON format from frontend in backend
//from req.body as frontend data gets to backend in json format
app.use("/api/auth", authRoutes); // middleware

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
