/**
 * Pure JS cart utility functions.
 * All functions return a new array (no side effects).
 */

export const addItem = (cartItems, newItem) => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === newItem._id
  );

  if (existingItemIndex > -1) {
    // Item exists, increase quantity
    const newCart = [...cartItems];
    const item = newCart[existingItemIndex];
    
    newCart[existingItemIndex] = {
      ...item,
      quantity: item.quantity + (newItem.quantity || 1)
    };
    return newCart;
  }

  // Item does not exist, append
  return [...cartItems, { ...newItem, quantity: newItem.quantity || 1 }];
};

export const updateQuantity = (cartItems, productId, qty) => {
  if (qty < 1) return cartItems; 

  return cartItems.map((item) => {
    if (item._id === productId) {
      return { ...item, quantity: qty };
    }
    return item;
  });
};

export const removeItem = (cartItems, productId) => {
  return cartItems.filter((item) => item._id !== productId);
};

export const clearItems = () => {
  return [];
};
