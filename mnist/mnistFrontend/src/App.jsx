import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import DigitRecognizer from "./components/DigitRecognizer";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { isAuthenticated } from "./auth";
import Homepage from "./components/Homepage";

function App() {
  // The 'user' state holds the user's authentication token, if available.
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return { token };
    } else {
      return null;
    }
  });
  // The showLoginForm state determines whether to display the login form
  const [showLoginForm, setShowLoginForm] = useState(false);

  // The showDropdown state determines whether to show the dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  //The handleLogin function is called when the user successfully logs in
  //Updates the user state and stores the token in localStorage
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  //The handleLoginCLock function toggles the visibility of the login form
  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
    
  };
  // The handleHamburgerClick function toggles the visibility of the dropdown menu
  const handleHamburgerClick = () => {
    setShowDropdown(!showDropdown);
    
  };
  // isLoggedIn variable is determined using the isAuthenticated function
  const isLoggedIn = isAuthenticated();

  // function handles when the user logs out and clears user state + removes token from local storage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // function toggles to hide login form
  const hideLoginForm = () => {
    setShowLoginForm(false);
  };


  return (
    <Router>
      <Background />
      <Navbar
        onLoginClick={handleLoginClick}
        onHamburgerClick={handleHamburgerClick}
        isLoggedIn={isLoggedIn}
        showDropdown={showDropdown}
        onLogout={handleLogout}
        user={user}
        hideLoginForm={() => setShowLoginForm(false)}
      />
      <div
        className={`login-form-container${showLoginForm ? " show-login-form" : ""}`}
      >
        {!isLoggedIn && <LoginForm onLogin={handleLogin} hideLoginForm={hideLoginForm}/>}
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Digit-Recognizer" element={<DigitRecognizer isLoggedIn={isLoggedIn} user={user} />} />
        <Route path="/Number-Recognizer" element={<h2>Number-Recognizer</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
