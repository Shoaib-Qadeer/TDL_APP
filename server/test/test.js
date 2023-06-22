const mongoose = require("mongoose");
const TodoService = require("../service/todo.service");
const TODO = require("../models/todo.model");

// Custom test database connection string
const testDBConnectionString = "mongodb://localhost:27017/testDB";

describe("TodoService", () => {
  let todoService;

  beforeAll(async () => {
    await mongoose.connect(testDBConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    todoService = new TodoService();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await TODO.deleteMany({});
  });

  describe("Get all tasks", () => {
    it("should return all tasks", async () => {
      // Create sample tasks
      const task1 = new TODO({ title: "Task 1" });
      const task2 = new TODO({ title: "Task 2" });
      await task1.save();
      await task2.save();

      // Call the getAllTodos method
      const todos = await todoService.getAllTodos();

      // Assert that the returned tasks match the created tasks
      expect(todos.length).toBe(2);
      expect(todos[0].title).toBe("Task 1");
      expect(todos[1].title).toBe("Task 2");
    });
  });

  describe("Create a Task", () => {
    it("should create a new task", async () => {
      // Call the createTodo method
      const savedTodo = await todoService.createTodo("New Task");

      // Assert that the created task has the correct title
      expect(savedTodo.title).toBe("New Task");
    });
  });

  describe("Update a Task", () => {
    it("should update an existing task", async () => {
      // Create a sample task
      const task = new TODO({ title: "Task" });
      await task.save();

      // Call the completeTodo method
      const updatedTodo = await todoService.completeTodo(task._id);

      // Assert that the task is completed
      expect(updatedTodo.Completed).toBe(true);
    });
  });

  describe("Delete a Task", () => {
    it("should delete an existing task", async () => {
      // Create a sample task
      const task = new TODO({ title: "Task" });
      await task.save();

      // Call the deleteTodo method
      const result = await todoService.deleteTodo(task._id);

      // Assert that the task is deleted and a success message is returned
      expect(result.message).toBe("TODO item deleted successfully");
    });
  });
});
