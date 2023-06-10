const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todos", todosSchema);
