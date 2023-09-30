import React from "react";
import { useHistory } from "react-router-dom";
import "./AdminDashboard.css"; // Import your dashboard CSS

const AdminDashboard = () => {
  const history = useHistory();

  const handleAddBooksClick = () => {
    // Navigate to the "Add Books" route
    history.push("/add-books");
  };

  const handleRequestedBooksClick = () => {
    // Navigate to the "Requested Books" route
    history.push("/requested-books");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
      <div className="card-container">
        <div className="card" onClick={handleAddBooksClick}>
          <h2>Add Books</h2>
          <button className="card-button">Add Books</button>
        </div>
        <div className="card" onClick={handleRequestedBooksClick}>
          <h2>Requested Books</h2>
          <button className="card-button">Requested Books</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
