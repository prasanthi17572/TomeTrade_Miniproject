import React, { useState } from "react";
import "./Signup.css";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // To display a success message

  const validateForm = () => {
    const newErrors = {};

    if (username.trim() === "") {
      newErrors.username = "Username is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8081/admin-register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          // Registration successful, show a success message
          setMessage("Registration successful!");
          // Clear the input fields
          setUsername("");
          setEmail("");
          setPassword("");
        } else {
          const responseData = await response.json();
          if (responseData.error) {
            // Registration failed, display the error message
            console.error("Registration failed:", responseData.error);
          }
        }
      } catch (error) {
        console.error("Error registering admin:", error);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup-page">
        <h2>Admin Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
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
          <button type="button" onClick={handleSignup}>
            Register
          </button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
