// gets Todo schema.
const Todo = require("../models/todosModel");

// function to handle request to add todo to db
const createTodo = async (req, res) => {
  // stores todo from body.
  const { todo } = req.body;

  // checks if to todo is empty, sends appropriate message.
  if (todo.length === 0) {
    return res.status(400).json({ error: "Please fill in todo." });
  }

  try {
    // gets user id from req, this is recevied via auth middleware.
    const user_id = req.user._id;
    // creates new todo in db with usr data and id.
    const newTodo = await Todo.create({ todo, user_id });
    // gets updates user todo list from db.
    const allTodos = await Todo.find({ user_id });
    // sends all user todos.
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
};

// gets all user todos from db
const getAllTodos = async (req, res) => {
  try {
    // gets user id via middleware auth.
    const user_id = req.user._id;
    // gets all user todos from db by id.
    const todos = await Todo.find({ user_id });
    // sends all user todos.
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
  }
};

// removes todo from db
const deleteTodo = async (req, res) => {
  // gets user id via middleware auth.
  const user_id = req.user._id;
  // get id of todo to delete.
  const { id } = req.params;
  try {
    // finds todo by id and deletes from db
    const todo = await Todo.findOneAndDelete({ _id: id });
    // sends all user todos.
    const allTodos = await Todo.find({ user_id });
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
};

const editTodo = async (req, res) => {
  const user_id = req.user._id;
  // gets user todo
  const { todo } = req.body;
  // gets id of todo
  const { id } = req.params;

  // checks if todo is empty or exists.
  if (todo.length === 0 || !todo) {
    // if empty or does not exists sends error.
    return res.status(400).json({ error: "Please fill in todo." });
  }

  try {
    // finds to todo by id and updates.
    const updateTodo = await Todo.findOneAndUpdate({ _id: id }, { todo });
    // sends all user todos.
    const allTodos = await Todo.find({ user_id });
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
};
