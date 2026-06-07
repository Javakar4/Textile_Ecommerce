import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import ProductCard from "../product/ProductCard";
import ProductDetailPage from "../product/ProductDetail";
import AllProductsPage from "../../pages/AllProductsPage";
import Auth from "../../pages/Auth";
import AuthCallback from "../../pages/AuthCallback";
import PaymentCallbackPage from "../../pages/PaymentCallbackPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import OrdersPage from "../../pages/OrdersPage";
import Layout from "@components/layouts/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfilePage from "../../pages/ProfilePage";
import WishlistPage from "../../pages/WishlistPage";
import Contact from "../../pages/ContactPage";
import About from "../../pages/AboutPage";
import MaintenancePage from "../../pages/MaintenancePage";

let AppRoutes = createBrowserRouter([
    {
        path: "/maintenance",
        element: <MaintenancePage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "auth", element: <Auth /> },
            { path: "auth/callback", element: <AuthCallback /> },
            { path: "payment/callback", element: <PaymentCallbackPage /> },
            { path: "contact", element: <Contact /> },
            { path: "about", element: <About /> },
            { path: "all-collections", element: <AllProductsPage /> },
            { path: "collection-detail/:id", element: <ProductDetailPage /> },
            { path: "cart", element: <CartPage /> },
            {
                element: <ProtectedRoutes />,
                children: [
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