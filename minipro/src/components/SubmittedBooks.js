
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmittedBooks = () => {
  const [submittedBooks, setSubmittedBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch submitted books
    axios.get('/submitted-books').then((response) => {
      setSubmittedBooks(response.data);
    });
  }, []);

  const handleCancelBook = async (bookId) => {
    // Display a confirmation dialog before canceling the book
    const confirmCancel = window.confirm('Are you sure you want to cancel this book?');

    if (confirmCancel) {
      try {
        // Make a DELETE request to cancel the book
        await axios.delete(`/submitted-books/${bookId}`);
        // Remove the canceled book from the list
        setSubmittedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } catch (error) {
        console.error('Error canceling book:', error);
      }
    }
  };

  return (
    <div>
      <h2>Submitted Books</h2>
      <ul>
        {submittedBooks.map((book) => (
          <li key={book.id}>
            <div>
              <strong>Book Name:</strong> {book.book_name}
            </div>
            <div>
              <strong>Book Details:</strong> {book.book_details}
            </div>
            <div>
              <strong>Price Expected:</strong> {book.price_expected}
            </div>
            <div>
              <strong>Image Path:</strong> {book.book_image_path}
            </div>
            <button onClick={() => handleCancelBook(book.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedBooks;
