import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import "./Signup.css";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const history = useHistory(); // Initialize history

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8081/admin-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          setMessage("Login successful!");
          clearForm(); // Clear the form on successful login

          // Redirect to the "Welcome" page after successful login
          history.push("/AdminDashboard"); // Push the new route to history
        } else {
          const responseData = await response.json();
          if (responseData.error) {
            setMessage("Login failed: " + responseData.error);
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setMessage("Error logging in");
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup-page">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
