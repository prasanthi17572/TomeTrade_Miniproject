
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import "./SellBooksForm.css"; // Add your CSS file for styling

const SellBooksForm = () => {
  const history = useHistory();
  const [bookName, setBookName] = useState("");
  const [bookDetails, setBookDetails] = useState("");
  const [priceExpected, setPriceExpected] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (acceptedFiles) => {
    // Handle image upload here and set the selected image in state
    const image = acceptedFiles[0];
    setSelectedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookDetails", bookDetails);
    formData.append("priceExpected", priceExpected);
    formData.append("bookImage", selectedImage);

    try {
      const response = await fetch("http://localhost:8081/submit-book", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        history.push("/user-details"); // Navigate to user details page
      } else {
        console.error("Book submission failed");
      }
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <div className="sell-books-container">
      <h2>Sell Your Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Book Details:</label>
          <textarea
            value={bookDetails}
            onChange={(e) => setBookDetails(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price Expected:</label>
          <input
            type="number"
            value={priceExpected}
            onChange={(e) => setPriceExpected(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Book Image:</label>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {selectedImage ? (
                  <p>Selected: {selectedImage.name}</p>
                ) : (
                  <p>Drag &amp; drop or click to select an image</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellBooksForm;
