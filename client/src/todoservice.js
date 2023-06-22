const API_BASE_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;

async function addtodoitem(userInput) {
  try {
    const response = await fetch(`${API_BASE_URL}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: userInput }),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error adding todo item:", error);
    throw error;
  }
}

async function deletetodo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "DELETE",
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error deleting todo item:", error);
    throw error;
  }
}

async function updatecompleted(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error updating todo completion:", error);
    throw error;
  }
}

async function undoupdatecomplete(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/undo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error undoing todo completion:", error);
    throw error;
  }
}

async function getItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/todo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    return jsonData.todos;
  } catch (error) {
    console.error("Error getting todo items:", error);
    throw error;
  }
}

const todoService = {
  addtodoitem,
  deletetodo,
  updatecompleted,
  undoupdatecomplete,
  getItems,
};

export default todoService;
