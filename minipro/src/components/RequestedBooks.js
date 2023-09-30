import React, { useState, useEffect } from "react";
import "./RequestedBooks.css"; // Import your CSS file

const RequestedBooks = () => {
  const [requestedBooks, setRequestedBooks] = useState([]);

  // Define a custom function to fetch requested books data
  const fetchRequestedBooksData = async () => {
    try {
      const response = await fetch("http://localhost:8081/requested-books"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching requested books data:", error);
      throw new Error("Error fetching requested books data: " + error.message);
    }
  };

  useEffect(() => {
    // Fetch requested books data from your API
    fetchRequestedBooksData()
      .then((data) => {
        // Filter out books with a "pending" status
        const pendingBooks = data.filter((book) => book.approval_status === "pending");
        setRequestedBooks(pendingBooks);
      })
      .catch((error) => {
        console.error("Error fetching requested books:", error);
      });
  }, []);

  // Function to handle accepting a book
 // Function to handle accepting a book
const handleAccept = (bookId) => {
  // Send a POST request to the server to accept the book
  fetch(`http://localhost:8081/accept-book/${bookId}`, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server (e.g., display a success message)
      console.log(data.message);
      // After successfully accepting the book, you can update the UI or reload the book list
    })
    .catch((error) => {
      console.error('Error accepting book:', error);
    });
};


  // Function to handle declining a book
  const handleDecline = (bookId) => {
    // Implement the logic to decline the book here
    console.log(`Declined book with ID: ${bookId}`);
  };

  return (
    <div className="requested-books-container">
      {requestedBooks.map((book) => (
        <div className="requested-book-card" key={book.id}>
          <h3>Title: {book.book_name}</h3>
          <p>Details: {book.book_details}</p>
          <p>Price Expected: {book.price_expected}</p>
          {/* Render the book image */}
          {book.book_image_path && (
            <img
              src={"http://localhost:8081/" + book.book_image_path} // Replace with your actual image path
              alt={book.book_name}
            />
          )}
          {/* Accept and Decline buttons */}
          <div className="button-container">
            <button onClick={() => handleAccept(book.id)} className="accept-button">
              Accept
            </button>
            <button onClick={() => handleDecline(book.id)} className="decline-button">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestedBooks;
