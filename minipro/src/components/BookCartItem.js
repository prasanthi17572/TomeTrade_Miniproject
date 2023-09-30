// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../context/Context";
// // import "./App.css";
// import "./BookCartItem.css";

// const BookCartItem = ({ cart }) => {
//   const { books, updateCart, removeCart } = useContext(Context);
//   const { id, quantity } = cart;

//   const [newQuantity, setNewQuantity] = useState(quantity);

//   const book = books.filter(book => book.id === id);
//   const { title, coverImageSrc, price, authorName, authorId } = book[0];

//   const handleCartRemove = () => {
//     removeCart(id);
//   };

//   return (
//     <div className="book-item">
//       <div className="row">
//         <div className="row1">
//           <div className="image">
//             <img className="img" src={coverImageSrc} alt="" />
//           </div>
//         </div>
//         <div className="col-lg-3 col-md-3 col-sm-12 col-12">
//           <h4 className="title">
//             <Link to={"/book/details/" + id}>{title}</Link>
//           </h4>
//           <h6>
//             By <Link to={"/author/" + authorId}>{authorName}</Link>
//           </h6>
//           <h5>Price: ${price}</h5>
//           <h5>Total Price: ${(price * newQuantity).toFixed(2)}</h5>
//         </div>
//         <div className="col">
//           <input
//             onChange={e => {
//               if (e.target.value > 0) {
//                 setNewQuantity(e.target.value);
//                 updateCart(id, e.target.value);
//               } else {
//                 alert("Please enter a value greater than or equal to 1");
//                 setNewQuantity(1);
//                 updateCart(id, 1);
//               }
//             }}
//             className="inputgroup" style={{width:80}}
//             type="text"
//             value={newQuantity}
//           />
//         </div>
//         <div className="col-lg-3 col-md-3 col-sm-12 col-12">
//           <button onClick={handleCartRemove} className="btn1">
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCartItem;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookCartItem.css";

const BookCartItem = ({ cart, updateCart, removeCart }) => {
  const { id, quantity } = cart;
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    // Fetch book details from your database here
    fetch(`http://your-api-endpoint.com/books/${id}`) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setBookDetails(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  if (!bookDetails) {
    return <p>Loading...</p>;
  }

  const { title, rating, price, coverImageSrc, authorName, authorId, status, condition, description } = bookDetails;

  const handleCartRemove = () => {
    removeCart(id);
  };

  return (
    <div className="book-item">
      <div className="row">
        <div className="row1">
          <div className="image">
            <img className="img" src={coverImageSrc} alt="" />
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <h4 className="title">
            <Link to={`/book/details/${id}`}>{title}</Link>
          </h4>
          <h6>
            By <Link to={`/author/${authorId}`}>{authorName}</Link>
          </h6>
          <p>Rating: {rating}</p>
          <p>Price: ${price}</p>
          <p>Status: {status}</p>
          <p>Condition: {condition}</p>
          <p>Description: {description}</p>
          <h5>Total Price: ${(price * newQuantity).toFixed(2)}</h5>
        </div>
        <div className="col">
          <input
            onChange={(e) => {
              if (e.target.value > 0) {
                setNewQuantity(e.target.value);
                updateCart(id, e.target.value);
              } else {
                alert("Please enter a value greater than or equal to 1");
                setNewQuantity(1);
                updateCart(id, 1);
              }
            }}
            className="inputgroup" style={{width:80}}
            type="text"
            value={newQuantity}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <button onClick={handleCartRemove} className="btn1">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCartItem;
