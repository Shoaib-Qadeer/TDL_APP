const mongoose = require("mongoose");

class DBService {
  constructor() {
    this.dbUrl =
      process.env.MONGODB_URI ||
      "mongodb+srv://shoaibqadeer:shoaibqadeer@cluster0.auqtfqg.mongodb.net/?retryWrites=true&w=majority";
  }

  async connect() {
    try {
      await mongoose.connect(this.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await mongoose.connect(this.dbUrl);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1); // Terminate the application if the connection fails
    }
  }

  disconnect() {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = DBService;
