import { createContext, useContext, useState, useMemo, useEffect } from "react";

// create custsom context
export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error("Error");
    throw new Error("Error");
  }
  return context;
};

// Context provider component
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart from local storage to persist data
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    const productId = product.id || product._id;
    if (!productId) {
      console.error("Product lacks a valid ID", product);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product._id === productId || item.product.id === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === productId || item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Remove one unit of a product from the cart
  const removeOne = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product._id === productId || item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  // Remove an item completely from the cart
  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId && item.product.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
    }
  };

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ cart, addToCart, removeOne, removeItem, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
