import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  // function gets user from localstorage
  const setUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // gets user
      return user;
    }
    return null;
  };

  // store if user exists
  const [isUser, setIsUser] = useState(setUser());
  // stores login state of user.
  const [loggedIn, setLoggedIn] = useState(null);
  // stores all todos
  const [userTodos, setUserTodos] = useState([]);

  // gets all user todos from db, user as arg.
  const allTodosRequest = async (user) => {
    try {
      // req to fetch todos from db
      const response = await fetch("/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // recieves user todos from db
      const data = await response.json();
      setUserTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // use effect run everytime a user logs in/out or sign up
  useEffect(() => {
    // gets user from local storage.
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // if user exists sets isUser state.
      setIsUser(user);
      // gets user todos from DB.
      allTodosRequest(user);
    } else {
      setIsUser(null);
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={isUser} setLoggedIn={setLoggedIn} />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                isUser ? (
                  <Todos
                    userTodos={userTodos}
                    setUserTodos={setUserTodos}
                    user={isUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isUser ? (
                  <Login setLoggedIn={setLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
