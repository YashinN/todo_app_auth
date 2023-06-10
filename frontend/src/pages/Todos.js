import { useState } from "react";

// components.
import AddTodo from "../components/AddTodo";
import NewTodo from "../components/NewTodo";
// css
import "./Todos.css";

const Todos = (props) => {
  // state to handle or reset buttons.
  const [clearEdit, setClearEdit] = useState(null);

  return (
    <div className="todos-container">
      <div className="container todos-wrapper pt-5">
        <div className="container mb-5">
          <AddTodo
            setUserTodos={props.setUserTodos}
            setClearEdit={setClearEdit}
          />
        </div>

        {props.userTodos.length === 0 ? null : (
          <div className="container">
            <h3 className="m-0 mb-5">Your toDo's</h3>
            {props.userTodos.map((todo, index) => (
              <NewTodo
                key={index}
                todo={todo}
                setUserTodos={props.setUserTodos}
                clearEdit={clearEdit}
                setClearEdit={setClearEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
