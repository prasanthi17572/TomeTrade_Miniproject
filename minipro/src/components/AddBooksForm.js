import React, { useState } from "react";
import "./AddBooksForm.css";

function AddBooksForm() {
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    rating: "",
    price: "",
    status: "available", // Default status
    condition: "new", // Default condition
    description: "",
    image: "", // Add image field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can add your logic to send a POST request to your server
    // and save the book data here, for example:
    try {
      const response = await fetch("http://localhost:8081/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        // Handle success, e.g., display a success message
        console.log("Book added successfully!");
        // Clear the form
        setBookData({
          name: "",
          author: "",
          rating: "",
          price: "",
          status: "available",
          condition: "new",
          description: "",
          image: "", // Reset image field
        });
      } else {
        // Handle errors, e.g., display an error message
        console.error("Failed to add book");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="add-books">
      <h2 className="h2tag">Add Books</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={bookData.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={bookData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            name="condition"
            value={bookData.condition}
            onChange={handleChange}
          >
            <option value="new">New</option>
            <option value="second_hand">Second Hand</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={bookData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBooksForm;
