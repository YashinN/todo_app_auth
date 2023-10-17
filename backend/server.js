const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 4000;

// routes.
const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");

// express app
const app = express();

// middleware to check request content type
const { checkContentType } = require("./middleware/checkContent");

// connect to mongoDb
connectDB();

app.use(cors());

// use json
app.use(express.json());
// access user routes
app.use("/user", checkContentType, userRoutes);
// access todo routes
app.use("/todos", checkContentType, todosRoutes);

// start express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
