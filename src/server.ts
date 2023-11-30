// import express, { Express, Request, Response, Application, json } from "express";
// import dotenv from "dotenv";
// import indexRouter from "./routes/indexRouter";

// //For env File
// dotenv.config();

// const app: Application = express();
// const port = process.env.PORT || 8000;
// app.use(json());
// app.use(indexRouter);

// app.listen(port, () => {
//   console.log(`Server is Fire at http://localhost:${port}`);
// });

import express, { Application, json } from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv";
dotenv.config();
import indexRouter from "./routes/indexRouter";


// Set up Express
const app: Application = express();
const port = process.env.PORT;

// Middleware to parse JSON
app.use(json());

// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/streamingDB", {});

// Check MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use the index router
app.use(indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
