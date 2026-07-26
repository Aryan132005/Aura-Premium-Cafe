import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('premium_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState('Dine-In'); // 'Dine-In' | 'Takeaway' | 'Delivery'
  const [tableNumber, setTableNumber] = useState('Table 1');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('premium_cafe_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (item, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        toast.success(`Updated ${item.name} quantity to ${updated[existingIndex].quantity}`);
        return updated;
      } else {
        toast.success(`Added ${item.name} to your order!`);
        return [...prev, { ...item, quantity: qty }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (item) {
        toast.success(`Removed ${item.name} from order`);
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('premium_cafe_cart');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const tax = subtotal * 0.05; // 5% tax/service
  const totalAmount = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        tableNumber,
        setTableNumber,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        tax,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
