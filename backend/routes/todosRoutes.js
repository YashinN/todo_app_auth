const express = require("express");

// contoller functions
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
} = require("../controllers/todosController");

// middleware
const { authToken } = require("../middleware/authenticate");
const { limitTodo } = require("../middleware/checkCharLimit");

// express router.
const router = express.Router();

// todo routes with authtoken middleware.
router.post("/", authToken, limitTodo, createTodo);
router.get("/", authToken, getAllTodos);
router.delete("/:id", authToken, deleteTodo);
router.patch("/:id", authToken, limitTodo, editTodo);

module.exports = router;
