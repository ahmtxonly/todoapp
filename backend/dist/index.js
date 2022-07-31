"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("./Routes/todo");
const mongoose = require("mongoose");
const configs = require("./Config/db");
const cors = require("cors");
const app = (0, express_1.default)();
const port = 4000;
app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(todo_1.todoRouter);
mongoose.connect(configs.mongo_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("connected to database");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
