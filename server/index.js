require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const DBService = require("./dbservice.js");
app.use(cors());
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
TODOROUTER = require("./routes/todo");

app.use("/todo", TODOROUTER);
const dbService = new DBService();

var Port = process.env.PORT || 1335;

app.listen(Port, async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      const testConfig = require("./test.config");
      mongoose.connect(testConfig.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } else {
      dbService.connect();
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
  console.log(`Server is running on port ${Port}`);
});
