import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./AdminBookDetails.css";

const AdminBookDetails = () => {
  const [submittedBooks, setSubmittedBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch submitted books for the admin
    axios.get('http://localhost:8081/admin/submitted-books')
      .then((response) => {
        setSubmittedBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching submitted books:", error);
      });
  }, []);

  // Function to handle book approval
  const handleApproveBook = async (bookId) => {
    try {
      // Make a POST request to the server to approve the book
      const response = await axios.post(`http://localhost:8081/admin/approve-book/${bookId}`);

      if (response.status === 200) {
        // If the book was successfully approved, update the state
        setSubmittedBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, approval_status: 'approved' } : book
          )
        );
      }
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  // Function to handle book decline
  const handleDeclineBook = async (bookId) => {
    try {
      // Make a POST request to the server to decline the book
      const response = await axios.post(`http://localhost:8081/admin/decline-book/${bookId}`);

      if (response.status === 200) {
        // If the book was successfully declined, update the state
        setSubmittedBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, approval_status: 'declined' } : book
          )
        );
      }
    } catch (error) {
      console.error("Error declining book:", error);
    }
  };

  return (
    <div className="complete">
      <h2 className="admin">Admin Book Details</h2>
      <div>
        <h3 className="admin">Submitted Books</h3>
        <ul className="submitted-books-list">
          {submittedBooks.map((book) => (
            <li key={book.id}>
              <div className="book-info">
                <strong>Book Name:</strong> {book.book_name}
                <br />
                <strong>Book Details:</strong> {book.book_details}
                <br />
                <strong>Price Expected:</strong> {book.price_expected}
                <br />
                <strong>Approval Status:</strong> {book.approval_status}
              </div>
              <div className="book-image">
                <img src={book.book_image_path} alt={`Image for ${book.book_name}`} />
              </div>
              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => handleApproveBook(book.id)} // Pass the book ID to the approval function
                  disabled={book.approval_status === 'approved'}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeclineBook(book.id)} // Pass the book ID to the decline function
                  disabled={book.approval_status === 'declined'}
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBookDetails;
