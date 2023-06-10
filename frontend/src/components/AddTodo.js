import { useState } from "react";
// css
import "./AddTodo.css";

const AddTodo = (props) => {
  // stores user to do
  const [addEntry, setAddEntry] = useState("");
  // sets error message
  const [error, setError] = useState(null);

  // clears or resets states.
  const clear = () => {
    setAddEntry("");
    setError(null);
  };

  // Request to add todo to db.
  // Takes user a arg.
  const addTodoRequest = async (user) => {
    // stores user entry
    const todo = addEntry;
    try {
      // sends todo and auth token to server.
      const response = await fetch(
        "https://murky-stamp-production.up.railway.app/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ todo }),
        }
      );

      // gets all todos from server.
      const data = await response.json();
      // if res issue sets error.
      if (!response.ok) {
        // sets error with server error
        setError(data.error);
      }

      //  if res ok sets todo data from server.
      if (response.ok) {
        props.setUserTodos(data);
        // clears states.
        clear();
      }
    } catch (error) {
      console.log("sfsdfs");
    }
  };

  // handles click when add button is clicked , makes request to server to add todo.
  const addTodoHandler = async () => {
    // gets user from local storage with auth token.
    const user = JSON.parse(localStorage.getItem("user"));
    // request to add todo , user is used as arg.
    addTodoRequest(user);
    // sets clear this resets the state of buttons.
    await props.setClearEdit(true);
    // sets clear to default.
    props.setClearEdit(null);
  };

  // stores user input and limits number of characters.
  const handleAddChange = (e, set) => {
    // set used to set state with input value.
    set(e.target.value);
    // checks if input value is less than 140 characters else sets error message.
    if (e.target.value.length >= 140) {
      setError("Maxlength 140 Characters");
    } else {
      setError(null);
    }
  };

  return (
    <form className="addTodo-form container px-0">
      <div className="addTodo-title-container mb-3">
        <h3 className="m-0 ">Add toDo</h3>
        {error && (
          <div className="add-error-container">
            <p className="m-0">{error}</p>
          </div>
        )}
      </div>

      <div className="form-group add-group ">
        <input
          type="text"
          className="form-control p-1"
          id="newTodo"
          placeholder="Enter Todo"
          value={addEntry}
          onChange={(e) => handleAddChange(e, setAddEntry)}
          maxLength={140}
        />
        <button
          type="button"
          className="btn btn-secondary add-btn"
          onClick={addTodoHandler}
        >
          <span className="material-symbols-outlined add-symbol">add</span>
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
