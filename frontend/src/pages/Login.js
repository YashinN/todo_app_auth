import { useState } from "react";
import "./Login.css";

const Login = (props) => {
  // stores user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // sets if login or sign up
  const [signup, setSignup] = useState("Log In");
  // stores all empty fields.
  const [emptyFields, setEmptyFields] = useState([]);
  // sets error
  const [error, setError] = useState(null);

  // clears states to default.
  const clearStates = () => {
    setEmail("");
    setPassword("");
    setEmptyFields([]);
    setError(null);
  };

  // makes request to server sends user credentials
  const loginRequest = async () => {
    try {
      const response = await fetch(
        "https://murky-stamp-production.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // recieves auth token and user email from db
      const data = await response.json();

      // if res not ok sets error and recevies list of empty inputs from server.
      if (!response.ok) {
        // sets empty fields.
        setEmptyFields(data.emptyFields);
        setError(data.error);
      }

      // if res ok.
      if (response.ok) {
        // sets empty fields to default.
        setEmptyFields([]);
        // resets error.
        setError(null);
        // stores user token and email in local storage.
        localStorage.setItem("user", JSON.stringify(data));
        // sets login state.
        props.setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // request to create new user in db.
  const signupRequest = async () => {
    try {
      // post req with user email and password.
      const response = await fetch(
        "https://murky-stamp-production.up.railway.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // receives user email and auth token.
      const data = await response.json();

      if (!response.ok) {
        // sets empty fields to default.
        setEmptyFields(data.emptyFields);
        // sets error.
        setError(data.error);
      }

      if (response.ok) {
        setEmptyFields([]);
        setError(null);
        localStorage.setItem("user", JSON.stringify(data));
        props.setLoggedIn(true);
      }
    } catch (eror) {
      console.log(error);
    }
  };

  // login button clicked, makes call to login request.
  const handleLogin = () => {
    loginRequest();
  };

  // sign up button clicked makes request to sign up user.
  const handleSignUp = () => {
    signupRequest();
  };

  // toggles menu from signup to login
  const handleMenu = (e) => {
    if (signup === "Log In") {
      setSignup("Sign Up");
    } else {
      setSignup("Log In");
    }
    clearStates();
  };

  return (
    <div className="login-container">
      <form className="p-5 login-form">
        <div className="login-title-container">
          <h3 className="m-0">{signup}</h3>

          {error && (
            <div className="error-container">
              <p className="m-0">{error}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${
              emptyFields.includes("email") ? "error" : ""
            }`}
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className={`form-control ${
              emptyFields.includes("password") ? "error" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-btn-container mt-4">
          {signup === "Log In" && (
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleLogin}
            >
              Log In
            </button>
          )}

          {signup === "Sign Up" && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          )}

          <button
            type="button"
            onClick={handleMenu}
            className="toggle-btn mx-3 text-secondary"
          >
            {signup === "Log In" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
