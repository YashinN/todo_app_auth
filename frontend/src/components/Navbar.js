const Navbar = (props) => {
  // handles  logout
  const handleLogout = () => {
    // removes user from local storage
    localStorage.removeItem("user");
    // sets logged in state to false
    props.setLoggedIn(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <span className="navbar-brand">toDo's</span>

        {props.user ? (
          <div className="logout-display">
            <p className="text-light m-0 mx-3">{props.user.email}</p>
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
