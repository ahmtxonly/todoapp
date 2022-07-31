import express, { Request, Response } from "express";
import { Todo } from "../Models/todo";

const router = express.Router();

router.get("/api/getTodo", async (req: Request, res: Response) => {
  const todo = await Todo.find({}).sort({ createdAt: -1 });

  return res.status(200).send(todo);
});

router.post("/api/setTodo", async (req: Request, res: Response) => {
  const { title } = req.body;

  const todo = Todo.build({ title });
  await todo
    .save()
    .then((result) =>
      res.status(201).json({
        status: "success",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "error",
      })
    );
});

router.post("/api/deleteTodo", async (req: Request, res: Response) => {
  const { id } = req.body;

  Todo.deleteOne({ _id: id })
    .then((result) =>
      res.status(201).json({
        status: "success",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "error",
      })
    );
});

router.post("/api/completeTodo", async (req: Request, res: Response) => {
  const { id, complate } = req.body;

  Todo.updateOne({ _id: id }, { complete: complate })
    .then((result) =>
      res.status(201).json({
        status: "success",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "error",
      })
    );
});

router.post("/api/updateTodo", async (req: Request, res: Response) => {
  const { id, title } = req.body;

  Todo.updateOne({ _id: id }, { title })
    .then((result) =>
      res.status(201).json({
        status: "success",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "error",
      })
    );
});

export { router as todoRouter };
