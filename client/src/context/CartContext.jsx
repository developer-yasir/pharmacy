import React, { createContext, useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { username } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  // Load cart items based on username
  useEffect(() => {
    if (username) {
      try {
        const localCart = localStorage.getItem(`pharmacy_cart_${username}`);
        setCartItems(localCart ? JSON.parse(localCart) : []);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]); // Clear cart if no username
    }
  }, [username]);

  // Save cart items based on username
  useEffect(() => {
    if (username) {
      localStorage.setItem(`pharmacy_cart_${username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, username]);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;