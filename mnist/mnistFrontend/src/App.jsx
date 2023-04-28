import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import DigitRecognizer from "./components/DigitRecognizer";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { isAuthenticated } from "./auth";

function Home() {
  return (
    <>
      <Background />
      <DigitRecognizer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleHamburgerClick = () => {
    setShowDropdown(!showDropdown);
  };

  const isLoggedIn = isAuthenticated(user?.token);

  return (
    <Router>
      <Navbar
        onLoginClick={handleLoginClick}
        onHamburgerClick={handleHamburgerClick}
        isLoggedIn={isLoggedIn}
        showDropdown={showDropdown}
      />
      <div
        className={`login-form-container${showLoginForm ? " show-login-form" : ""}`}
      >
        {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample-route-1" element={<h2>Sample Route 1</h2>} />
        <Route path="/sample-route-2" element={<h2>Sample Route 2</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
