require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
TODOROUTER = require("./routes/todo");

app.use("/todo", TODOROUTER);

var Port = process.env.PORT || 1336;

// app.listen(1337, () => {
//   console.log("Server started on 1337");
// });

app.listen(Port, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
  console.log(`Server is running on port ${Port}`);
});
