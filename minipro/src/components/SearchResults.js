import React from "react";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="search-results">
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <strong>Name:</strong> {book.name}
            <br />
            <strong>Author:</strong> {book.author}
            {/* Add other book details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
