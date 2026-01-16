import React from "react";
import {  createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductCard from "./ProductCard";
import ProductDetailPage from "./ProductDetail";
import AllProductsPage from "../pages/AllProductsPage";
import Login from "../pages/Login";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../components/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import Cart from "@components/cart/CartPage";

let routes = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "all-collections", element: <AllProductsPage /> },
      { path: "collection-detail/:id", element: <ProductDetailPage /> },
      {
        // protected routes
        // element: <ProtectedRoutes />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "cart/checkout", element: <CheckoutPage /> },
          { path: "my-orders", element: <OrdersPage /> },
        ],
      },
    ],
  },
]);

export default routes;
