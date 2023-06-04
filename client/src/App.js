import "./App.css";
import { Card, Typography, Button, Divider, TextField } from "@mui/material";
import SingleItem from "./components/SingleItem";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
function App() {
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  const addtodoitem = async () => {
    try {
      const response = await fetch("http://localhost:1335/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: userInput }),
      });
      const jsonData = await response.json();
      if (jsonData) {
        setUserInput("");
        getItems();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deletetodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:1335/todo/${id}`, {
        method: "DELETE",
      });
      const dataobtained = await response.json();
      if (dataobtained.status === "ok") {
        getItems();
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addtodoitem();
    }
  };

  const updatecompleted = async (id) => {
    try {
      const response = await fetch(`http://localhost:1335/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const dataobtained = await response.json();
      if (dataobtained.status === "ok") {
        getItems();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const undoupdatecomplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1335/todo/undo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const dataobtained = await response.json();
      if (dataobtained.status === "ok") {
        getItems();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:1335/todo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const dataobtained = await response.json();
      if (dataobtained.status === "ok") {
        setItems(dataobtained.todos);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // const addItem = async () => {
  // try {
  //   const response = await fetch("http://localhost:1335/todo", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: "Test" }),
  //   });
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  // } catch (err) {
  //   console.error(err.message);
  // }
  // };

  return (
    <div className="app">
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="headertodo"
          style={{ width: "20%", marginBottom: "10px" }}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
              alignItems: "center",
              backgroundColor: "transparent",
              // boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",

              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25) ",
            }}
          >
            <div
              className="leftsection"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className="menu">
                <AiOutlineMenu style={{ color: "#8F8771", fontSize: "24px" }} />
              </div>
              <div className="headertitle">
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "17px",
                    marginLeft: "10px",
                    color: "white",
                  }}
                >
                  To do today
                </Typography>
              </div>
            </div>

            <div className="rightsec">
              <RiArrowDownSLine
                style={{ color: "#8F8771", fontSize: "24px" }}
              />
            </div>
          </Card>
        </div>

        <div style={{ width: "20%" }}>
          <Card
            style={{
              backgroundColor: "#e3e0d3",
              borderRadius: "12px",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "5px",
            }}
          >
            {items.map((item) => (
              <>
                <SingleItem
                  key={item._id}
                  todoitem={item}
                  deletetodo={deletetodo}
                  updatecompletion={updatecompleted}
                  undoupdate={undoupdatecomplete}
                />
                <Divider />
              </>
            ))}

            <div
              className="inputuser"
              style={{
                marginLeft: "15px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <TextField
                placeholder="Add a new task"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
                onKeyPress={handleKeyPress}
              />
            </div>
          </Card>
        </div>
        <div
          className="buttontoadd"
          style={{
            marginTop: "25px",
            width: "20%",
            marginLeft: "12%",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              color: "green",
              paddingLeft: "25px",
              paddingRight: "25px",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundImage: "linear-gradient(#75A995, #4D8B86)",
            }}
            onClick={addtodoitem}
          >
            <Typography
              variant="h6"
              style={{ fontSize: "17px", color: "white" }}
            >
              Add Item
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
