// // // import React, { useContext } from "react";
// // // import { Context } from "../context/Context";
// // // import { Link } from "react-router-dom";
// // // import "./Book.css"
// // // // import "./App.css"
// // // const Book = ({ bookDetails }) => {
// // //   const { addCart } = useContext(Context);
// // //   const {
// // //     id,
// // //     title,
// // //     coverImageSrc,
// // //     rating,
// // //     price,
// // //     authorName,
// // //     authorId
// // //   } = bookDetails;

// // //   const handleAddCart = () => {
// // //     addCart(id);
    
// // //   };

// // //   return (
// // //     <div className="book">
// // //       <div className="cover-img">
// // //         {/* <img src={coverImageSrc} padding-left:100pxalt="" /> */}
// // //         <img src={coverImageSrc}  alt="" />

// // //         <div className="details">
// // //           <div className="content">
// // //             <h5>
// // //               <Link style={{ color: "#fff" }} to={"/book/details/" + id}>
// // //                 {title}
// // //               </Link>
// // //             </h5>
// // //             <h6>
// // //               By{" "}
// // //               <Link style={{ color: "#fff" }} to={"/author/" + authorId}>
// // //                 {authorName}
// // //               </Link>
// // //             </h6>
// // //             <p>
// // //               <i className="fa fa-star"></i> {rating}
// // //             </p>
// // //             <h4>Price: ${price}</h4>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="bottom">
// // //         <Link className="btn-primary" to={"/book/details/" + id}>
// // //           Details
// // //         </Link>
// // //         <button onClick={handleAddCart} className="btn-btn-primary">
// // //           Add to Cart
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Book;
// // // import React, { useContext } from "react";
// // // import { Context } from "../context/Context";
// // // import { Link } from "react-router-dom";


// // // const Book = ({ bookDetails }) => {
// // //   const { addCart } = useContext(Context);
// // //   const {
// // //     name,
// // //     author,
// // //     rating,
// // //     price,
// // //     status,
// // //     condition,
// // //     description,
// // //     image,
// // //   } = bookDetails;

// // //   const handleAddCart = () => {
// // //     addCart(bookDetails); // Pass the entire bookDetails object to the addCart function
// // //   };

// // //   return (
// // //     <div className="book">
// // //       <div className="cover-img">
// // //         <img src={image} alt={name} />

// // //         <div className="details">
// // //           <div className="content">
// // //             <h5>{name}</h5>
// // //             <h6>By {author}</h6>
// // //             <p>
// // //               <i className="fa fa-star"></i> {rating}
// // //             </p>
// // //             <h4>Price: ${price}</h4>
// // //             <p>Status: {status}</p>
// // //             <p>Condition: {condition}</p>
// // //             <p>Description: {description}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="bottom">
// // //         <Link className="btn-primary" to={`/book/details/${bookDetails.id}`}>
// // //           Details
// // //         </Link>
// // //         <button onClick={handleAddCart} className="btn btn-primary">
// // //           Add to Cart
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Book;
// // // import React, { useEffect, useState } from "react";
// // // import "./Books.css";

// // // function Books() {
// // //   const [books, setBooks] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch all books from the database when the component mounts
// // //     fetch("http://localhost:8081/fetch-books") // Replace with your server endpoint
// // //       .then((response) => response.json())
// // //       .then((data) => setBooks(data))
// // //       .catch((error) => console.error("Error fetching books:", error));
// // //   }, []);

// // //   return (
// // //     <div className="books-container">
// // //       <h2>All Books</h2>
// // //       <div className="books-list">
// // //         {books.map((book) => (
// // //           <div key={book.id} className="book">
// // //             <h3>{book.name}</h3>
// // //             <p>Author: {book.author}</p>
// // //             <p>Rating: {book.rating}</p>
// // //             <p>Price: ${book.price}</p>
// // //             <p>Status: {book.status}</p>
// // //             <p>Condition: {book.condition}</p>
// // //             <p>Description: {book.description}</p>
// // //             {/* Add an image tag here to display the book's image */}
// // //             <img src={book.image} alt={book.name} />
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import React, { useEffect, useState } from "react";
// // // import "./Book.css";

// // // function Books() {
// // //   const [books, setBooks] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch all books from the database when the component mounts
// // //     fetch("http://localhost:8081/fetch-books") // Replace with your server endpoint
// // //       .then((response) => response.json())
// // //       .then((data) => setBooks(data))
// // //       .catch((error) => console.error("Error fetching books:", error));
// // //   }, []);

// // //   return (
// // //     <div className="books-container">
// // //       <h2>All Books</h2>
// // //       <div className="books-list">
// // //         {books.map((book) => (
// // //           <div key={book.id} className="book">
// // //             {/* Display the book's image */}
// // //             <img src={book.image} alt={book.name} />

// // //             <h3>{book.name}</h3>
// // //             <p>Author: {book.author}</p>
// // //             <p>Rating: {book.rating}</p>
// // //             <p>Price: ${book.price}</p>
// // //             <p>Status: {book.status}</p>
// // //             <p>Condition: {book.condition}</p>
// // //             <p>Description: {book.description}</p>
            
// // //             <div className="book-buttons">
// // //               <button className="btn btn-primary">Details</button>
// // //               <button className="btn btn-primary">Add to Cart</button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Books;
// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import "./Book.css";

// // // function Books() {
// // //   const [books, setBooks] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch all books from the database when the component mounts
// // //     fetch("http://localhost:8081/fetch-books") // Replace with your server endpoint
// // //       .then((response) => response.json())
// // //       .then((data) => setBooks(data))
// // //       .catch((error) => console.error("Error fetching books:", error));
// // //   }, []);

// // //   return (
// // //     <div className="books-container">
// // //       <h2>All Books</h2>
// // //       <div className="books-list">
// // //         {books.map((book) => (
// // //           <div key={book.id} className="book">
// // //             {/* Display the book's image */}
// // //             <img src={book.image} alt={book.name} />

// // //             <h3>Book Name:{book.name}</h3>
// // //             <p>Rating: {book.rating}</p>
// // //             {/* <p>Author: {book.author}</p>
// // //              <p>Rating: {book.rating}</p>
// // //             <p>Price: ${book.price}</p>
// // //             <p>Status: {book.status}</p>
// // //             <p>Condition: {book.condition}</p>
// // //             <p>Description: {book.description}</p> */}
            
// // //             <div className="book-buttons">
// // //               <Link to={`/book/details/${book.id}`} className="btn">
// // //                 Details
// // //               </Link>
// // //               <button className="btn">Add to Cart</button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Books;
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import "./Book.css";
// // import { useCart } from './CartContext'; // Import the useCart hook

// // function Books({ userId }) {
// //   const [books, setBooks] = useState([]);
// //   const { addToCart } = useCart(); // Use the useCart hook to access addToCart function

// //   const addToUserCart = (userId, bookId) => {
// //     fetch("http://localhost:8081/add-to-cart", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ userId, bookId }),
// //     })
// //       .then((response) => response.json())
// //       .then((data) => {
// //         // Handle the response, e.g., show a success message to the user
// //         console.log(data.message);
// //       })
// //       .catch((error) => console.error("Error adding book to cart:", error));
// //   };

// //   useEffect(() => {
// //     // Fetch all books from the database when the component mounts
// //     fetch("http://localhost:8081/fetch-books") // Replace with your server endpoint
// //       .then((response) => response.json())
// //       .then((data) => setBooks(data))
// //       .catch((error) => console.error("Error fetching books:", error));
// //   }, []);

// //   return (
// //     <div className="books-container">
// //       <h2>All Books</h2>
// //       <div className="books-list">
// //         {books.map((book) => (
// //           <div key={book.id} className="book">
// //             {/* Display the book's image */}
// //             <img src={book.image} alt={book.name} />

// //             <h3>Book Name: {book.name}</h3>
// //             <p>Rating: {book.rating}</p>

// //             <div className="book-buttons">
// //               <Link to={`/book/details/${book.id}`} className="btn">
// //                 Details
// //               </Link>
// //               <button
// //                 className="btn"
// //                 onClick={() => {
// //                   // Call addToUserCart to add the book to the user's cart
// //                   addToUserCart(userId, book.id);
// //                 }}
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Book.css";
// import { useCart } from './CartContext'; 

// function Books({ userId }) {
//   const [books, setBooks] = useState([]);
//   const { addToCart } = useCart(); // Use the useCart hook to access addToCart function

//   const addToUserCart = (userId, bookId) => {
//     fetch("http://localhost:8081/add-to-cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId, bookId }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response, e.g., show a success message to the user
//         console.log(data.message);
//       })
//       .catch((error) => console.error("Error adding book to cart:", error));
//   };

//   useEffect(() => {
//     // Fetch all books from the database when the component mounts
//     fetch("http://localhost:8081/fetch-books") // Replace with your server endpoint
//       .then((response) => response.json())
//       .then((data) => setBooks(data))
//       .catch((error) => console.error("Error fetching books:", error));
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <div className="books-container">
//       <h2>All Books</h2>
//       <div className="books-list">
//         {books.map((book) => (
//           <div key={book.id} className="book">
//             {/* Display the book's image */}
//             <img className="img" src={book.image} alt={book.name} />

//             <h3>Book Name: {book.name}</h3>
//             <p>Price: ${book.price}</p>

//             <p>Rating: {book.rating}</p>

//             <div className="book-buttons">
//               <Link to={`/book/details/${book.id}`} className="btn">
//                 Details
//               </Link>
//               <button
//                 className="btn"
//                 onClick={() => {
//                   // Call addToUserCart to add the book to the user's cart
//                   addToUserCart(userId, book.id);
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
