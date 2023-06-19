const TODO = require("../models/todo.model.js");

class TodoService {
  async getAllTodos() {
    try {
      const todos = await TODO.find();
      return todos;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createTodo(title) {
    const todo = new TODO({
      title: title,
    });

    try {
      const savedTodo = await todo.save();
      return savedTodo;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async completeTodo(id) {
    try {
      const currentTime = new Date();
      const updatedTodo = await TODO.findByIdAndUpdate(
        id,
        { CompletionTime: currentTime, Completed: true },
        { new: true }
      );

      if (!updatedTodo) {
        throw new Error("TODO item not found");
      }

      return updatedTodo;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async undoCompleteTodo(id) {
    try {
      const updatedTodo = await TODO.findByIdAndUpdate(
        id,
        { CompletionTime: null, Completed: false },
        { new: true }
      );

      if (!updatedTodo) {
        throw new Error("TODO item not found");
      }

      return updatedTodo;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async deleteTodo(id) {
    try {
      const deletedTodo = await TODO.findByIdAndDelete(id);

      if (!deletedTodo) {
        throw new Error("TODO item not found");
      }

      return { message: "TODO item deleted successfully" };
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = TodoService;
