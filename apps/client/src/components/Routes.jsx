import React from "react";
import {  createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductCard from "./ProductCard";
import ProductDetailPage from "./ProductDetail";
import AllProductsPage from "../pages/AllProductsPage";
import Auth from "../pages/Auth";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../components/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import Layout from "@components/layouts/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfilePage from "../pages/ProfilePage";
import WishlistPage from "../pages/WishlistPage";


let AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      // { path: "register", element: <Register /> },
      { path: "all-collections", element: <AllProductsPage /> },
      { path: "collection-detail/:id", element: <ProductDetailPage /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "cart/checkout", element: <CheckoutPage /> },
          { path: "my-orders", element: <OrdersPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "wishlist", element: <WishlistPage /> },
        ],
      },
    ],
  },
]);

export default AppRoutes;


