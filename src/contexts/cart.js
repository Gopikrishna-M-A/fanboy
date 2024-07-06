'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from "@/hooks/useAuth"


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  const [cart, setCart] = useState({});
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotals = useCallback((cartItems) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.jersey.price * item.quantity), 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { totalPrice, totalQuantity };
  }, []);

  const updateTotals = useCallback((cartData) => {
    const { totalPrice, totalQuantity } = calculateTotals(cartData.items || []);
    setCartTotalPrice(totalPrice);
    setCartTotalQuantity(totalQuantity);
  }, [calculateTotals]);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const response = await axios.get(`/api/carts`);
        setCart(response.data);
        updateTotals(response.data);
      } else {
        setCart({});
        setCartTotalPrice(0);
        setCartTotalQuantity(0);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (jerseyId, quantity) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/carts`, {
        jerseyId,
        quantity
      });
      
      // Update the cart with the server response
      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (jerseyId) => {
    // Optimistically update the cart
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.jersey._id !== jerseyId);
      const updatedCart = { ...prevCart, items: updatedItems };
      updateTotals(updatedCart);
      return updatedCart;
    });

    try {
      const response = await axios.delete(`/api/carts?id=${jerseyId}`);
      // Update with the server response
      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
      setError(error);
      // Revert the optimistic update
      fetchCart();
    }
  };

  const emptyCart = async () => {
    // Optimistically update the cart
    setCart({});
    setCartTotalPrice(0);
    setCartTotalQuantity(0);

    try {
      await axios.delete(`/api/carts`);
    } catch (error) {
      setError(error);
      // Revert the optimistic update
      fetchCart();
    }
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      emptyCart, 
      isLoading, 
      error, 
      cartTotalPrice, 
      cartTotalQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};