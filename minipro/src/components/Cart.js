import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.book_name}</td>
              <td>{item.author}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
