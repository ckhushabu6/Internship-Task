import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 2. Increase Qty (+)
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 3. Decrease Qty (-)
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 4. Remove Item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 5. Total Price Calculate (Safe from NaN)
  const totalPrice = cartItems.reduce((acc, item) => {
    // Agar price "$20,000" (string) hai, toh symbols hatao. Agar number hai toh seedha use karo.
    const numericPrice = typeof item.price === 'string' 
      ? Number(item.price.replace(/[^0-9.]/g, "")) 
      : Number(item.price);

    // Agar price conversion fail ho jaye (NaN), toh use 0 maano safety ke liye
    const safePrice = isNaN(numericPrice) ? 0 : numericPrice;
    
    return acc + (safePrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        increaseQty, 
        decreaseQty, 
        removeFromCart, 
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);