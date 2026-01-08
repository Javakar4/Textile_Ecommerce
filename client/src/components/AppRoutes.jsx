import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductCard from './ProductCard'
import ProductDetailPage from './ProductDetail'
import AllProductsPage from '../pages/AllProductsPage'
import Login from '../pages/Login'
import CartPage from '../pages/CartPage'
import CheckoutPage from "../components/CheckoutPage";
import OrdersPage from '../pages/OrdersPage'

const AppRoutes = () => {

    const publicRoutes = [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Login /> },
        { path: '/all-collections', element: <AllProductsPage /> },
        { path: '/collection-detail/:id', element: <ProductDetailPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/cart/checkout', element: <CheckoutPage /> },
        { path: '/my-orders', element: <OrdersPage /> }
    ];


    const privateRoutes = [
        // Add private routes here
    ]

    return (
        <Routes>
            {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
            {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default AppRoutes
