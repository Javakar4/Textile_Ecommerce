import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  getCart,
  saveCart,
  clearCart as clearStorage,
} from "../utils/cartStorage";
import {
  addItem,
  updateQuantity,
  removeItem,
  clearItems,
} from "../utils/cartUtils";
import apiCartService from "../services/apiCartService";

const CartContext = createContext();

const initialState = {
  cartItems: [],
  isLoggedIn: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cartItems: action.payload };

    case "SET_LOGIN_STATUS":
      return { ...state, isLoggedIn: action.payload };

    case "LOCAL_ADD":
      return {
        ...state,
        cartItems: addItem(state.cartItems, action.payload),
      };

    case "LOCAL_UPDATE":
      return {
        ...state,
        cartItems: updateQuantity(
          state.cartItems,
          action.payload.productId,
          action.payload.quantity
        ),
      };

    case "LOCAL_REMOVE":
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload),
      };

    case "LOCAL_CLEAR":
      return { ...state, cartItems: clearItems() };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* -----------------------------
     DB CART HELPERS
  ------------------------------*/

  const refreshDbCart = async () => {
    const res = await apiCartService.getCart();
    if (res?.ok) {
      dispatch({ type: "SET_CART", payload: res.data });
    }
  };

  const syncLocalToDb = async () => {
    const localItems = getCart();
    if (localItems.length > 0) {
      await apiCartService.syncCart(localItems);
      clearStorage();
    }
    await refreshDbCart();
  };

  /* -----------------------------
     INITIAL LOAD (guest vs logged)
  ------------------------------*/

  useEffect(() => {
    if (state.isLoggedIn) {
      refreshDbCart();
    } else {
      const stored = getCart();
      dispatch({ type: "SET_CART", payload: stored });
    }
  }, [state.isLoggedIn]);

  /* -----------------------------
     PERSIST GUEST CART
  ------------------------------*/

  useEffect(() => {
    if (!state.isLoggedIn) {
      saveCart(state.cartItems);
    }
  }, [state.cartItems, state.isLoggedIn]);

  /* -----------------------------
     ACTIONS
  ------------------------------*/

  const addToCart = async (product) => {
    if (state.isLoggedIn) {
      await apiCartService.addToCart(product);
      await refreshDbCart();
    } else {
      dispatch({ type: "LOCAL_ADD", payload: product });
    }
  };

  const updateItem = async (productId, quantity) => {
    if (state.isLoggedIn) {
      await apiCartService.updateItem(productId, quantity);
      await refreshDbCart();
    } else {
      dispatch({
        type: "LOCAL_UPDATE",
        payload: { productId, quantity },
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (state.isLoggedIn) {
      await apiCartService.removeItem(productId);
      await refreshDbCart();
    } else {
      dispatch({ type: "LOCAL_REMOVE", payload: productId });
    }
  };

  const clear = async () => {
    if (state.isLoggedIn) {
      await apiCartService.clearCart();
      await refreshDbCart();
    } else {
      dispatch({ type: "LOCAL_CLEAR" });
      clearStorage();
    }
  };

  const setIsLoggedIn = (status) => {
    dispatch({ type: "SET_LOGIN_STATUS", payload: status });
  };

  const fetchCart = async () => {
    if (state.isLoggedIn) {
      await refreshDbCart();
    }
  };

  const setCart = (items) => {
    dispatch({ type: "SET_CART", payload: items });
  };

  /* -----------------------------
     LOGIN SYNC TRIGGER
  ------------------------------*/

  useEffect(() => {
    if (state.isLoggedIn) {
      syncLocalToDb();
    }
  }, [state.isLoggedIn]);

  const value = {
    cartItems: state.cartItems,
    isLoggedIn: state.isLoggedIn,
    addToCart,
    updateItem,
    removeFromCart,
    clear,
    setIsLoggedIn,
    fetchCart,
    setCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
