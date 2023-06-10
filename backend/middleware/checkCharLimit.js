const limitTodo = (req, res, next) => {
  // gets user todo
  const { todo } = req.body;

  // checks if to do exists
  if (!todo || todo.length === 0) {
    next();
  }

  // checks if number of charactes is within limit
  if (todo.length > 140) {
    return res.status(400).json({ error: "Maxlength 140 Characters" });
  }

  next();
};

module.exports = { limitTodo };
