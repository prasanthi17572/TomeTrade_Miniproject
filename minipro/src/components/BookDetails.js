// import React, { useContext } from "react";
// import { Context } from "../context/Context";
// import { useParams, Link } from "react-router-dom";
// import "./BookDetails.css";
// const BookDetails = () => {
//   const { id } = useParams();
//   const { addCart, books } = useContext(Context);

//   const book = books.filter(book => book.id === id);
//   const {
//     title,
//     coverImageSrc,
//     rating,
//     genre,
//     price,
//     description,
//     authorName,
//     authorId
//   } = book[0];

//   const handleAddCart = () => {
//     addCart(id);
    
//   };
//   // const { user, addCart } = useContext(Context);
//   // const history = useHistory();

//   // const handleAddToCart = () => {
//   //   if (user.isLoggedIn) {
//   //     // User is logged in, allow them to add to cart
//   //     addCart(book.id);
//   //     alert("Added to cart!");
//   //   } else {
//   //     // User is not logged in, redirect to login page with a message
//   //     history.push("/login?message=Please log in to add to cart.");
//   //   }
//   // };



//   return (
//     <div className="container">
//       <h1 className="display-4 text-center">Book Details</h1>
//       <div className="book-details">
//         <div className="rows">
//           <div className="img">
//             <img className="img1" src={coverImageSrc} alt="" />
//           </div>
//           <div className="contents col-lg-7 col-12">
//             <h3 className="author" >
//               By <Link to={"/author/" + authorId}>{authorName}</Link>
//             </h3>

//             <h1 className="text-muted ml-0">{title}</h1>
//             <h4 className="text-capitalize">Genre: {genre.join(", ")}</h4>
//             <h3>
//               Goodreads Rating: <i className="fa fa-star"></i>
//               {rating}
//             </h3>

//             <h4 className="des">{description}</h4>

//             <h2>Price: ${price}</h2>

//             <button
              
//               className="btn-primary"
//               onClick={handleAddCart}
//             >
//               <h3 className="Addcart">Add Cart</h3>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css"

function BookDetails() {
  const { id } = useParams(); // Get the book ID from the URL
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    // Fetch book details based on the ID when the component mounts
    fetch(`http://localhost:8081/fetch-book-details/${id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setBookDetails(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]); // Fetch data when the ID parameter changes

  return (
    <div className="book-details">
      <h2>Book Details</h2>
      <div>
       
        <p>Author: {bookDetails.author}</p>
            <p>Rating: {bookDetails.rating}</p>
            <p>Price: ${bookDetails.price}</p>
            <p>Status: {bookDetails.status}</p>
            <p>Condition: {bookDetails.condition}</p>
            <p>Description: {bookDetails.description}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
}

export default BookDetails;
