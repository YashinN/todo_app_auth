import { useState, useEffect, useRef } from "react";
import "./NewTodo.css";

const NewTodo = (props) => {
  // sets edit state , if in edit mode. true if not in edit mode.
  const [isEdit, setIsEdit] = useState(true);
  //  stores user entry and uses current todo value as default.
  const [entry, setEntry] = useState(props.todo.todo);
  // stores error message.
  const [error, setError] = useState(null);
  // input ref to access current todo edit input.
  const inputRef = useRef();

  // takes user as arg to get auth token, performs request to remove user from DB
  const deleteTodoRequest = async (user) => {
    // fetch req with todo id in params.
    try {
      const response = await fetch("/todos/" + props.todo._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      // recevies updated todos from db
      const data = await response.json();
      // sets new list of todos.
      props.setUserTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // request to edit todo on db
  const editTodoRequest = async (user) => {
    // gets user edited entry.
    const todo = entry;
    try {
      // patch request to server uses token for auth. sends updated to do
      const response = await fetch("/todos/" + props.todo._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ todo }),
      });

      // receives update todo list from db
      const data = await response.json();

      // if res not ok sets error and focuses on todo edit input.
      if (!response.ok) {
        setError(data.error);
        inputRef.current.focus();
      }

      // if res ok sets todo data
      if (response.ok) {
        props.setUserTodos(data);
        // sets edit to true ie exit edit mode
        setIsEdit(true);
        // removes error message.
        setError(null);
      }
    } catch {
      console.log(error);
    }
  };

  // useEffect runs when clear state is changed , this is used to reset buttons.
  useEffect(() => {
    // turns off in edit mode.
    setIsEdit(true);
    // removes all erros.
    setError(null);
    // sets existing todo to default value.
    setEntry(props.todo.todo);
  }, [props.clearEdit]);

  // handles initial edit button click .
  const handleEdit = async (e) => {
    // focuses on to do input to edit.
    inputRef.current.focus();
    // clears all other buttons to default
    await props.setClearEdit(true);
    //  sets clear to default after buttons have been reset.
    await props.setClearEdit(null);
    // sets edit mode for selected todo.
    setIsEdit(false);
  };

  // removes item from DB when delete button clicked.
  const handleDelete = async () => {
    // gets user from local storage.
    const user = JSON.parse(localStorage.getItem("user"));
    // clears all other buttons to default
    await props.setClearEdit(true);
    //  sets clear to default after buttons have been reset.
    await props.setClearEdit(null);
    // makes req to delete todo from DB
    deleteTodoRequest(user);
  };

  // handles click when apply confirm button is clicked.
  const handleApply = () => {
    // gets user from localstorage.
    const user = JSON.parse(localStorage.getItem("user"));
    // makes req to edit todo.
    editTodoRequest(user);
  };

  const handleCancel = () => {
    // sets edit mode of current to do off.
    setIsEdit(true);
    // resets user entry.
    setEntry(null);
    // removes error.
    setError(null);
  };

  // stores user edited entry and checks for character limit.
  const handleEditChange = (e, set) => {
    // sets user entry
    set(e.target.value);
    // checks if entered characters below 140
    if (e.target.value.length === 140) {
      // sets error
      setError("Max length 140 character");
    } else {
      setError(null);
    }
  };

  return (
    <form className="newTodo-form container px-0 pb-5">
      <div className="newTodo-title-container mb-3">
        {error && (
          <div className="newTdo-error-container">
            <p className="m-0">{error}</p>
          </div>
        )}
      </div>
      <div className="form-group edit-group ">
        <input
          type="text"
          className={`form-control p-1 ${!isEdit ? "active-edit" : "null"}`}
          id="newTodo"
          placeholder="Enter Todo"
          value={!isEdit ? entry : props.todo.todo}
          readOnly={isEdit}
          onChange={(e) => handleEditChange(e, setEntry)}
          ref={inputRef}
          maxLength={140}
        />

        {isEdit && (
          <>
            <button
              type="button"
              className="btn btn-secondary control-btn "
              onClick={handleEdit}
              id="edit"
            >
              <span className="material-symbols-outlined control-symbol">
                edit
              </span>
            </button>
            <button
              type="button"
              className="btn btn-dark control-btn "
              onClick={handleDelete}
            >
              <span className="material-symbols-outlined control-symbol">
                delete
              </span>
            </button>
          </>
        )}

        {!isEdit && (
          <>
            <button
              type="button"
              className="btn btn-info control-btn "
              onClick={handleApply}
            >
              <span className="material-symbols-outlined control-symbol">
                done
              </span>
            </button>
            <button
              type="button"
              className="btn btn-dark control-btn "
              onClick={handleCancel}
            >
              <span className="material-symbols-outlined control-symbol">
                close
              </span>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default NewTodo;
