import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./UserDetails.css";

const UserDetails = () => {
  const [submittedBooks, setSubmittedBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch submitted books
    axios.get('http://localhost:8081/submitted-books')
      .then((response) => {
        setSubmittedBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching submitted books:", error);
      });
  }, []);

  // Function to handle book cancellation
  const handleCancelBook = async (bookId) => {
    try {
      // Make a DELETE request to the server to remove the book
      const response = await axios.delete(`http://localhost:8081/submitted-books/${bookId}`);

      if (response.status === 200) {
        // If the book was successfully deleted from the server, update the state
        setSubmittedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Error canceling book:", error);
    }
  };

  return (
    <div className="complete">
      <h2 className="user">User Details</h2>
      <div>
        <h3 className="user">Submitted Books</h3>
        <ul className="submitted-books-list">
          {submittedBooks.map((book) => (
            <li key={book.id}>
              <div className="book-info">
                <strong>Book Name:</strong> {book.book_name}
                <br />
                <strong>Book Details:</strong> {book.book_details}
                <br />
                <strong>Price Expected:</strong> {book.price_expected}
              </div>
              <div className="book-image">
                <img src={book.book_image_path} alt={`Image for ${book.book_name}`} />
              </div>
              <div className="approval-status">
                {book.approval_status === "" ? (
                  <span className="approved">Approved</span>
                ) : (
                  <span className="pending">Pending Approval</span>
                )}
              </div>
              <div className="action-buttons">
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelBook(book.id)} // Pass the book ID to the cancellation function
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
