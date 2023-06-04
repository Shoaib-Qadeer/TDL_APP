const mongoose = require("mongoose");

const TODO = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "To do Title is required"],
  },
  Completed: {
    type: Boolean,
    default: false,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  CompletionTime: {
    type: Date,
  },
});

const model = mongoose.model("TODO", TODO);
module.exports = model;
