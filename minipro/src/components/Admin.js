import React, { useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation logic
    if (name === "" || email === "") {
      alert("Please fill in all required fields (Name and Email) before submitting.");
      return;
    }

    // Here, you can handle the submission of the admin contact information
    // For this example, we're just logging the values to the console
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

    // You can also send this data to a server for processing

    // Set the flag to indicate successful submission
    setIsSubmitted(true);

    // Show the alert after successful submission
    alert("Submitted successfully!");
  };

  return (
    <div className="admin-contact-form">
      <h2>Contact Admin</h2>
      {isSubmitted ? (
        <div className="tq"> 
          <p>Thank you for your submission!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
