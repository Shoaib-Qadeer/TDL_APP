const express = require("express");

const TODO = require("../models/todo.model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await TODO.find();
    // res.status(200).json({ alldata: todos });
    res.json({ status: "ok", todos: todos });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const todo = new TODO({
    title: req.body.title,
  });

  try {
    const savedTodo = await todo.save();
    res.status(201).json({ resp: savedTodo });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const currentTime = new Date();
    const updatedTodo = await TODO.findByIdAndUpdate(
      id,
      { CompletionTime: currentTime, Completed: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO item not found" });
    }

    res.json({ status: "ok", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.patch("/undo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTodo = await TODO.findByIdAndUpdate(
      id,
      { CompletionTime: null, Completed: false },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO item not found" });
    }

    res.json({ status: "ok", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await TODO.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "TODO item not found" });
    }

    res.json({ message: "TODO item deleted successfully", status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
