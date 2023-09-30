// import React, { useState, useEffect, useContext } from "react";
// import { Context } from "../context/Context";
// import "./App.css";
// import "./Search.css";

// const Search = () => {
//   const [keywords, setKeywords] = useState("");
//   const { getSearchedBooks, searchString } = useContext(Context);

//   const handleChange = e => {
//     setKeywords(e.target.value);
//     getSearchedBooks(e.target.value);
//   };

//   useEffect(() => {
//     if (searchString === null) {
//       setKeywords("");
//     }
//   }, [searchString]);

//   return (
//     <>
//     <input
//       onChange={handleChange}
//       style={{ width: "50%" }}
//       className="search"
//       type="search"
//       placeholder="e.g. The Prophet"
//       value={keywords}
//     />
    
//           </>
//   );
// };

// export default Search;
// // import React, { useState } from 'react';
// // import './Search.css'; // Import your CSS file

// // function Search() {
// //   const [query, setQuery] = useState('');

// //   const handleInputChange = (e) => {
// //     setQuery(e.target.value);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log(`You searched for: ${query}`);
// //   };

// //   return (
// //     <div className="search-bar-container">
// //       <form className="search-form" onSubmit={handleSubmit}>
// //         <div className="input-container">
// //           <input
// //             type="text"
// //             placeholder="Search Google"
// //             value={query}
// //             onChange={handleInputChange}
// //           />
// //         </div>
// //         <button type="submit">Search</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Search;

// import React, { useState, useEffect, useContext } from "react";
// import { Context } from "../context/Context";
// import "./Search.css";
// import axios from 'axios'; // Import axios

// const Search = () => {
//   const [keywords, setKeywords] = useState("");
//   const { getSearchedBooks, searchString } = useContext(Context);

//   const handleChange = async (e) => {
//     const query = e.target.value;
//     setKeywords(query);

//     // Make an HTTP request to your server to search for books
//     try {
//       const response = await axios.get(`http://localhost:8081/search-books?query=${query}`);
//       const searchedBooks = response.data; // Assuming the server responds with matching books

//       // Update your context with the searched books
//       getSearchedBooks(searchedBooks);
//     } catch (error) {
//       console.error("Error searching for books:", error);
//     }
//   };

//   useEffect(() => {
//     if (searchString === null) {
//       setKeywords("");
//     }
//   }, [searchString]);

//   return (
//     <>
//       <input
//         onChange={handleChange}
//         style={{ width: "50%" }}
//         className="search"
//         type="search"
//         placeholder="e.g. The Prophet"
//         value={keywords}
//       />
//     </>
//   );
// };

// export default Search;
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import "./Search.css";
import { Link } from "react-router-dom";

const Search = () => {
  const [keywords, setKeywords] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { searchString } = useContext(Context);

  useEffect(() => {
    // When the searchString in context changes, update the local state
    setKeywords(searchString);
  }, [searchString]);

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8081/search-books?query=${keywords}`
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } else {
  //       console.error("Error searching for books");
  //     }
  //   } catch (error) {
  //     console.error("Error searching for books:", error);
  //   }
  // };
  const handleSearch = async () => {
    // Clear the previous search results
    setSearchResults([]);
  
    // Check if the search input is empty
    if (keywords.trim() === "") {
      return; // Exit the function if the search input is empty
    }
  
    try {
      const response = await fetch(
        `http://localhost:8081/search-books?query=${keywords}`
      );
  
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Error searching for books");
      }
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };
  
  return (
    <div className="search-container">
      <input
        onChange={handleChange}
        className="search"
        type="search"
        placeholder="Search for books..."
        value={keywords}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((book) => (
              <li key={book.id}>
                {book.image && <img src={book.image} alt={book.name} />}
                <h3>Book Name:{book.name}</h3>
                <p>Author: {book.author}</p>
                <p>Rating: {book.rating}</p>
                <p>Price: {book.price}</p>
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
                {/* Display other book details as needed */}
              </li>
              
            ))}
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
