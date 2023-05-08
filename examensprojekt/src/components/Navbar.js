import { React, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const toggleRef = useRef();

  const showNavbar = () => {
    toggleRef.current.classList.toggle("active");
  };

  return (
    <nav class="navbar">
      <a href="#" class="toggle-button" onClick={showNavbar}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </a>
      <div class="navbar-links" ref={toggleRef}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quote">My quotes</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
