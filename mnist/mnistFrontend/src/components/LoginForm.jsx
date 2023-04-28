import { useState } from "react";
import { loginUser, registerUser } from "../auth";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      let userData;
      if (isRegistering) {
        userData = await registerUser(username, password);
      } else {
        userData = await loginUser(username, password);
      }
      onLogin(userData);
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      <button type="button" onClick={toggleRegistering}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </form>
  );
}

export default LoginForm;
