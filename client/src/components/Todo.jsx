import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // Demo content for initial todos
  const demoTodos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

  useEffect(() => {
    setTodos(demoTodos);
  }, []);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.trim() !== "") {
      setTodos([...todos, title]);
      setTitle("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleCheckboxClick = (index) => {
    const todoTitle = todos[index];
    alert(`Task: ${todoTitle}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter task title"
        />
        <IconButton onClick={handleAddTodo} color="primary">
          Add
        </IconButton>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Checkbox
                color="primary"
                onClick={() => handleCheckboxClick(index)}
              />
              {todo}
              <IconButton
                onClick={handleMenuOpen}
                edge="end"
                aria-label="menu"
                sx={{ marginLeft: "auto" }}
              >
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </MenuItem>
                </Menu>
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Todo;
