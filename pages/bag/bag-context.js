import React, { createContext, useContext, useState } from 'react';

const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingBagContext.Provider value={{ items, addItem, removeItem, deleteItem }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};

export const useShoppingBag = () => {
  return useContext(ShoppingBagContext);
};