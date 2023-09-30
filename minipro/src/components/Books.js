
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Book.css";

// function Books({ userId }) {
//   const [books, setBooks] = useState([]);

//   const addToUserCart = (book) => {
//     const { book_id, quantity } = book; // Extract book_id and quantity from the book object

//     fetch("http://localhost:8081/add-to-cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ book_id: book.id, quantity: 1 }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//       })
//       .catch((error) => console.error("Error adding book to cart:", error));
//   };

//   useEffect(() => {
//     fetch("http://localhost:8081/fetch-books")
//       .then((response) => response.json())
//       .then((data) => setBooks(data))
//       .catch((error) => console.error("Error fetching books:", error));
//   }, []);

//   return (
//     <div className="books-container">
//       <h2>All Books</h2>
//       <div className="books-list">
//         {books.map((book) => (
//           <div key={book.id} className="book">
//             <img className="img" src={book.image} alt={book.name} />

//             <h3>Book Name: {book.name}</h3>
//             <p>Rating: {book.rating}</p>
//             <p>Price: ${book.price}</p>

//             <div className="book-buttons">
//               <Link to={`/book/details/${book.id}`} className="btn">
//                 Book Details
//               </Link>
//               <Link to="/form" className="btn buy-button">
//                 Buy Book
//               </Link>
//               <button
//                 className="btn"
//                 onClick={() => {
//                   addToUserCart(book);
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Books;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Book.css";

function Books({ userId }) {
  const [books, setBooks] = useState([]);

  const addToUserCart = (book) => {
    fetch("http://localhost:8081/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // user_email: userId,
        book_id: book.id,
        quantity: 1,
        name: book.name, // Include book name
        author: book.author, // Include author
        image: book.image, // Include image URL
        price: book.price, // Include price
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => console.error("Error adding book to cart:", error));
  };

  useEffect(() => {
    fetch("http://localhost:8081/fetch-books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="books-container">
      <h2>All Books</h2>
      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img className="img" src={book.image} alt={book.name} />

            <h3>Book Name: {book.name}</h3>
            <p>Author: {book.author}</p> {/* Display author */}
            <p>Rating: {book.rating}</p>
            <p>Price: ${book.price}</p>

            <div className="book-buttons">
              <Link to={`/book/details/${book.id}`} className="btn">
                Book Details
              </Link>
              <Link to="/form" className="btn buy-button">
                Buy Book
              </Link>
              {/* <button
                className="btn"
                onClick={() => {
                  addToUserCart(book);
                }}
              >
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
