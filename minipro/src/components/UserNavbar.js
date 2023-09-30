
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";
import SellBooksForm from "./SellBooksForm"; // Correct import statement

const UserNavbar = ({ handleLogout }) => {
  const [showSellBooksForm, setShowSellBooksForm] = useState(false);

  const toggleSellBooksForm = () => {
    setShowSellBooksForm(!showSellBooksForm);
  };

  const logoutAndRedirect = () => {
    // Call the handleLogout function to log the user out
    handleLogout();

    // Redirect to the home page or any other desired page
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <div className="user-navbar">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <Link to="/" className="card-link">
                  Buy Books
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <Link to="/user-details" className="card-link">
                  Books To Be Approved
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                {/* Use Link to navigate to the Sell Books page */}
                <Link to="/sell-books" className="card-link">
                  Sell Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="logout-button">
        <button onClick={logoutAndRedirect} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Render the SellBooksForm component based on the state */}
      {showSellBooksForm && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SellBooksForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
