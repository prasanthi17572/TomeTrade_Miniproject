import React, { Component } from "react";
import './Form.css';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shippingAddress: "",
      email: "",
      phone: "",
      phoneError: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        this.setState({
          phoneError: "Phone number must be 10 digits",
        });
      } else {
        this.setState({
          phoneError: "",
        });
      }
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, shippingAddress, email, phone } = this.state;

    if (this.state.phoneError) {
      return;
    }

    const orderData = {
      name,
      shippingAddress,
      email,
      phone,
    };

    console.log("Order Data:", orderData);

    // You can display an alert after successful submission
    window.alert("Your order has been placed successfully!");

    // You can also reset the form fields here
    this.setState({
      name: "",
      shippingAddress: "",
      email: "",
      phone: "",
    });
  };

  render() {
    const { name, shippingAddress, email, phone, phoneError } = this.state;

    return (
      <div>
        <h2 className="heading">Place Your Order</h2>
        <form onSubmit={this.handleSubmit} className="all">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="shippingAddress">Shipping Address:</label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={shippingAddress}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.handleChange}
              required
            />
            {phoneError && <div className="error">{phoneError}</div>}
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
    );
  }
}

export default OrderForm;
