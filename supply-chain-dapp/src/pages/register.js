import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = new URLSearchParams(location.search).get("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password, role);
      navigate(`/${role}`);
    } catch (error) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Register as {role}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <div className="login-links">
        <Link to={`/login?role=${role}`}>Already have an account? Login</Link>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Register;
