// import React, { useContext } from "react";
// // import { Context } from "../context/Context";
// import { Link } from "react-router-dom"; // Import Link
// import BookCartItem from "./BookCartItem";
// import BookCartCheckOut from "./BookCartCheckOut";
// import "./App.css";
// import "./Bookcart.css";

// const BookCart = () => {
//   const { carts } = useContext(Context);

//   if (carts.length === 0) {
//     return (
//       <>
//         <h1 className="cardempty">
//           Your cart is Empty. <Link to="/">Shop more!!!</Link> :(
//         </h1>
//         <div className="carts">
//           <img src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038--android.jpg" alt="Empty Cart" />
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <div className="text-center">
//         <h1 className="display-4">Book Cart</h1>
//         <div className="container d-flex flex-column">
//           {carts.map((cart) => (
//             <BookCartItem key={cart.id} cart={cart} />
//           ))}
//         </div>
//         <BookCartCheckOut />
//       </div>
//     );
//   }
// };

// export default BookCart;
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Bookcart.css";
// import BookCartItem from "./BookCartItem";
// import BookCartCheckOut from "./BookCartCheckOut";

// const BookCart = ({ cartItems }) => {
//   if (cartItems.length === 0) {
//     return (
//       <>
//         <h1 className="cardempty">
//           Your cart is Empty. <Link to="/">Shop more!!!</Link> :(
//         </h1>
//         <div className="carts">
//           <img src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038--android.jpg" alt="Empty Cart" />
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <div className="text-center">
//         <h1 className="display-4">Book Cart</h1>
//         <div className="container d-flex flex-column">
//           {cartItems.map((cartItem, index) => (
//             <BookCartItem key={index} cart={cartItem} />
//           ))}
//         </div>
//         <BookCartCheckOut />
//       </div>
//     );
//   }
// };

// export default BookCart;
import React from "react";
import { Link } from "react-router-dom";
import "./Bookcart.css";
import BookCartItem from "./BookCartItem";
import BookCartCheckOut from "./BookCartCheckOut";

const BookCart = ({ cartItems = [] }) => {
  if (cartItems.length === 0) {
    return (
      <>
        <h1 className="cardempty">
          Your cart is Empty. <Link to="/">Shop more!!!</Link> :(
        </h1>
        <div className="carts">
          <img src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038--android.jpg" alt="Empty Cart" />
        </div>
      </>
    );
  } else {
    return (
      <div className="text-center">
        <h1 className="display-4">Book Cart</h1>
        <div className="container d-flex flex-column">
          {cartItems.map((cartItem, index) => (
            <BookCartItem key={index} cart={cartItem} />
          ))}
        </div>
        <BookCartCheckOut />
      </div>
    );
  }
};

export default BookCart;
