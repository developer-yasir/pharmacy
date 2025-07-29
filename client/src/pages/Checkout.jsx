import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const onChange = (e) =>
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });

  const calculateItemsPrice = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before checking out.');
      return;
    }

    const itemsPrice = calculateItemsPrice();
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    const taxPrice = itemsPrice * 0.15; // 15% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    try {
      const newOrder = {
        _id: `order_${Date.now()}`, // Generate a unique ID for the order
        guestUsername: username, // Store username directly
        orderItems: cartItems.map(item => ({
          name: item.product.name,
          qty: item.quantity,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
          product: item.product._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true, // Assume paid for simplicity
        paidAt: new Date().toISOString(),
        isDelivered: false,
        createdAt: new Date().toISOString(),
      };

      // Get existing orders for this user from localStorage
      const existingOrders = JSON.parse(localStorage.getItem(`pharmacy_orders_${username}`)) || [];
      existingOrders.push(newOrder);
      localStorage.setItem(`pharmacy_orders_${username}`, JSON.stringify(existingOrders));

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { orderId: newOrder._id } });
    } catch (err) {
      console.error(err);
      toast.error('Error placing order. Please try again.');
    }
  };

  if (!username) {
    return <p>Please enter your name to proceed to checkout.</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Add items to proceed to checkout.</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="text-center mb-4">Checkout</h1>
        <div className="card p-4 shadow-sm">
          <form onSubmit={placeOrder}>
            <h2 className="mb-3">Shipping Address</h2>
            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-bold">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={shippingAddress.address} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label fw-bold">City</label>
              <input type="text" className="form-control" id="city" name="city" value={shippingAddress.city} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label fw-bold">Postal Code</label>
              <input type="text" className="form-control" id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label fw-bold">Country</label>
              <input type="text" className="form-control" id="country" name="country" value={shippingAddress.country} onChange={onChange} required />
            </div>

            <h2 className="mt-4 mb-3">Payment Method</h2>
            <div className="mb-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="paymentMethod" id="stripe" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="stripe">
                  Stripe
                </label>
              </div>
            </div>

            <h2 className="mt-4 mb-3">Order Summary</h2>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.product._id} className="list-group-item d-flex justify-content-between">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Items Price</span>
                <span>${calculateItemsPrice().toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>${(itemsPrice > 100 ? 0 : 10).toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax (15%)</span>
                <span>${(itemsPrice * 0.15).toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold bg-light">
                <h4>Total</h4>
                <h4><strong>${(itemsPrice + (itemsPrice > 100 ? 0 : 10) + (itemsPrice * 0.15)).toFixed(2)}</strong></h4>
              </li>
            </ul>

            <button type="submit" className="btn btn-primary w-100">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
