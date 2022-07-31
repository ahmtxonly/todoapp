"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const todo_1 = require("../Models/todo");
const router = express_1.default.Router();
exports.todoRouter = router;
router.get("/api/getTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todo_1.Todo.find({}).sort({ createdAt: -1 });
    return res.status(200).send(todo);
}));
router.post("/api/setTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const todo = todo_1.Todo.build({ title });
    yield todo
        .save()
        .then((result) => res.status(201).json({
        status: "success",
    }))
        .catch((err) => res.status(400).json({
        status: "error",
    }));
}));
router.post("/api/deleteTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    todo_1.Todo.deleteOne({ _id: id })
        .then((result) => res.status(201).json({
        status: "success",
    }))
        .catch((err) => res.status(400).json({
        status: "error",
    }));
}));
router.post("/api/completeTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, complate } = req.body;
    todo_1.Todo.updateOne({ _id: id }, { complete: complate })
        .then((result) => res.status(201).json({
        status: "success",
    }))
        .catch((err) => res.status(400).json({
        status: "error",
    }));
}));
router.post("/api/updateTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title } = req.body;
    todo_1.Todo.updateOne({ _id: id }, { title })
        .then((result) => res.status(201).json({
        status: "success",
    }))
        .catch((err) => res.status(400).json({
        status: "error",
    }));
}));
