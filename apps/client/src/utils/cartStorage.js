const CART_KEY = 'textile_guest_cart';

export const getCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse cart from storage:', e);
    return [];
  }
};

export const saveCart = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to storage:', e);
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error('Failed to clear cart from storage:', e);
  }
};
