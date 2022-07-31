import express, { Express } from "express";
import { todoRouter } from "./Routes/todo";
const mongoose = require("mongoose");
const configs = require("./Config/db");

const cors = require("cors");
const app: Express = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(todoRouter);

mongoose.connect(
  configs.mongo_string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
