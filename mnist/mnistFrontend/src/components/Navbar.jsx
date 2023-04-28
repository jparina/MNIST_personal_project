import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLoginClick, onHamburgerClick, isLoggedIn, showDropdown }) {
  const toggleMenu = () => {
    onHamburgerClick();
  };

  return (
    <header className="navbar">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <h1 className="navbar-title">MNIST Project</h1>
      <nav className="navbar-right">
        {!isLoggedIn && (
          <button onClick={onLoginClick} className="navbar-link login-link">
            Login
          </button>
        )}
      </nav>
      <div className={`dropdown${showDropdown ? " show-dropdown" : ""}`}>
        <Link to="/sample-route-1" className="dropdown-link">
          Sample Route 1
        </Link>
        <Link to="/sample-route-2" className="dropdown-link">
          Sample Route 2
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
