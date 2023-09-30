import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDetails.css";

const ReqUserDetails = () => {
  const [requestedBooks, setRequestedBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch requested books
    axios
      .get("http://localhost:8081/requested-books") // Update the endpoint URL
      .then((response) => {
        setRequestedBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requested books:", error);
      });
  }, []);

  // Function to handle book approval
  const handleApproveBook = async (bookId) => {
    try {
      // Make a POST request to the server to approve the book
      const response = await axios.post(`http://localhost:8081/approve-book/${bookId}`);

      if (response.status === 200) {
        // If the book was successfully approved on the server, update the state
        setRequestedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  return (
    <div className="complete">
      <h2 className="user">User Details</h2>
      <div>
        <h3 className="user">Requested Books</h3>
        <ul className="requested-books-list">
          {requestedBooks.map((book) => (
            <li key={book.id}>
              <div className="book-info">
                <strong>Book Name:</strong> {book.book_name}
                <br />
                <strong>Book Details:</strong> {book.book_details}
                <br />
                <strong>Price Offered:</strong> {book.price_offered}
              </div>
              <div className="book-image">
                <img src={book.book_image_path} alt={`Image for ${book.book_name}`} />
              </div>
              <div className="action-buttons">
                <button
                  className="btn btn-success"
                  onClick={() => handleApproveBook(book.id)} // Pass the book ID to the approval function
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReqUserDetails;
