import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/indexRouter";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
