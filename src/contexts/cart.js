// 'use client'
// import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from "@/hooks/useAuth"


// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth()
//   const [cart, setCart] = useState({});
//   const [cartTotalPrice, setCartTotalPrice] = useState(0);
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const calculateTotals = useCallback((cartItems) => {
//     const totalPrice = cartItems.reduce((sum, item) => sum + (item.jersey.price * item.quantity), 0);
//     const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     return { totalPrice, totalQuantity };
//   }, []);

//   const updateTotals = useCallback((cartData) => {
//     const { totalPrice, totalQuantity } = calculateTotals(cartData.items || []);
//     setCartTotalPrice(totalPrice);
//     setCartTotalQuantity(totalQuantity);
//   }, [calculateTotals]);

//   const fetchCart = async () => {
//     setIsLoading(true);
//     try {
//       if (user) {
//         const response = await axios.get(`/api/carts`);
//         setCart(response.data);
//         updateTotals(response.data);
//       } else {
//         setCart({});
//         setCartTotalPrice(0);
//         setCartTotalQuantity(0);
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   const addToCart = async (jerseyId, quantity, size) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`/api/carts`, {
//         jerseyId,
//         quantity,
//         size
//       });
      
//       // Update the cart with the server response
//       setCart(response.data);
//       updateTotals(response.data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateCart = async (jerseyId, quantity, size) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.put(`/api/carts`, {
//         jerseyId,
//         quantity,
//         size
//       });

//       // Update the cart with the server response
//       setCart(response.data);
//       updateTotals(response.data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeFromCart = async (jerseyId,size) => {
//     // Optimistically update the cart
//     // setCart(prevCart => {
//     //   const updatedItems = prevCart.items.filter(item => item.jersey._id !== jerseyId);
//     //   const updatedCart = { ...prevCart, items: updatedItems };
//     //   updateTotals(updatedCart);
//     //   return updatedCart;
//     // })

//     try {
//       const response = await axios.delete(`/api/carts?id=${jerseyId}&size=${size}`);
//       // Update with the server response
//       setCart(response.data);
//       updateTotals(response.data);
//     } catch (error) {
//       setError(error);
//       // Revert the optimistic update
//       fetchCart();
//     }
//   };

//   const emptyCart = async () => {
//     // Optimistically update the cart
//     setCart({});
//     setCartTotalPrice(0);
//     setCartTotalQuantity(0);

//     try {
//       await axios.delete(`/api/carts`);
//     } catch (error) {
//       setError(error);
//       // Revert the optimistic update
//       fetchCart();
//     }
//   }

//   return (
//     <CartContext.Provider value={{ 
//       cart, 
//       addToCart, 
//       removeFromCart, 
//       emptyCart, 
//       isLoading, 
//       error, 
//       cartTotalPrice, 
//       cartTotalQuantity,
//       updateCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
// };



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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (jerseyId, quantity, size) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/carts`, {
        jerseyId,
        quantity,
        size
      });
      
      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const updateCart = async (jerseyId, quantity, size) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/carts`, {
        jerseyId,
        quantity,
        size
      });

      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (jerseyId, size) => {
    try {
      const response = await axios.delete(`/api/carts?id=${jerseyId}&size=${size}`);
      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
      fetchCart();
    }
  };

  const emptyCart = async () => {
    setCart({});
    setCartTotalPrice(0);
    setCartTotalQuantity(0);
    try {
      await axios.delete(`/api/carts`);
    } catch (error) {
      fetchCart();
    }
  }

  // New coupon-related functions
  const applyCoupon = async (couponCode) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/coupons`, { couponCode });
      setCart(response.data.cart);
      updateTotals(response.data.cart);
      setError(null);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to apply coupon";
      setError({ message: errorMessage, details: error.response?.data?.details });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCoupon = async () => {
    try {
      const response = await axios.delete(`/api/coupons`);
      console.log("response fom rpote",response.data);
      setCart(response.data);
      updateTotals(response.data);
    } catch (error) {
      setError(error);
      throw error;
    } 
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      emptyCart, 
      isLoading, 
      error, 
      cartTotalPrice, 
      cartTotalQuantity,
      updateCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};