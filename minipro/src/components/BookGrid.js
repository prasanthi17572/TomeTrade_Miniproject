import React from "react";
import Book from "./Book"; // Import your Book component here
import "./bookgrid.css";
const BookGrid = ({ books }) => {
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <Book key={index} bookDetails={book} />
      ))}
    </div>
  );
};

export default BookGrid;
