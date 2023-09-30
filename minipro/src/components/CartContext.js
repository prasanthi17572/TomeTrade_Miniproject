// CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    // Implement your logic to add to the cart here
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    // Implement your logic to remove from the cart here
    const updatedCart = cart.filter((book) => book.id !== bookId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
