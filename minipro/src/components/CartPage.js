import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import your Cart component

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Fetch cart books from the server
//     fetch("/api/get-cart-books")
//       .then((response) => response.json())
//       .then((data) => {
//         setCartBooks(data);
//       })
//       .catch((error) => console.error("Error fetching cart books:", error));
//   }, []); // Empty dependency array ensures this effect runs once on component mount
useEffect(() => {
    // Fetch cart items from the server
    fetch("/api/get-cart-items")
      .then((response) => response.json())
      .then((data) => {
        // Handle the cart items data in your component state
        setCartItems(data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);
  
  return (
    <div>
      <h1>My Cart</h1>
      <Cart cart={cartItems} /> {/* Pass the cart books to your Cart component */}
    </div>
  );
}

export default CartPage;
