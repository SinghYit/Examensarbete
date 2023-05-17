import { React, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions";

const Navbar = () => {
  //Create ref to navbar-links
  const toggleRef = useRef();

  //Toggle active class
  const showNavbar = () => {
    toggleRef.current.classList.toggle("active");
  };

  //Fetch value of isLoggedIn from Redux store
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav class="navbar">
      <a class="toggle-button" onClick={showNavbar}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </a>
      <div class="navbar-links" ref={toggleRef}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {
            //Conditionally render login/logout buttons
            isLoggedIn ? (
              <li onClick={() => dispatch(logout())}>
                <a className="logButton">Log out</a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
