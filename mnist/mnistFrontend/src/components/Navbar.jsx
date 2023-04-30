import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLoginClick, onHamburgerClick, isLoggedIn, showDropdown, onLogout, user }) {
  const toggleMenu = () => {
    onHamburgerClick();
  };

  return (
    <header className="navbar">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <Link to="/" className="navbar-title">MNIST Project</Link>
      <nav className="navbar-right">
        {!isLoggedIn ? (
          <button onClick={onLoginClick} className="navbar-link login-link">
            Login
          </button>
        ) : (
          <>
            <span>Welcome, {user.username} </span>
            <button onClick={onLogout} className="navbar-link logout-link">
              Logout
            </button>
          </>
      )}
      </nav>
      <div className={`dropdown${showDropdown ? " show-dropdown" : ""}`}>
        <Link to="/Digit-Recognizer" className="dropdown-link">
          Digit Recognizer
        </Link>
        <Link to="/sample-route-2" className="dropdown-link">
          Number Recognizer
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
