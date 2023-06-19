const express = require("express");
const TodoService = require("../service/todo.service.js");

const router = express.Router();
const todoService = new TodoService();

router.get("/", async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json({ status: "ok", todos: todos });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title } = req.body;

  try {
    const savedTodo = await todoService.createTodo(title);
    res.status(201).json({ resp: savedTodo });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await todoService.completeTodo(id);

    res.json({ status: "ok", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/undo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await todoService.undoCompleteTodo(id);

    res.json({ status: "ok", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodo(id);

    res.json({ message: result.message, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
