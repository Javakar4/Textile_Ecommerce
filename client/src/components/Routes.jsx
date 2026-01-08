import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductCard from './ProductCard'
import ProductDetailPage from './ProductDetail'
import AllProductsPage from '../pages/AllProductsPage'

import Cart from '@components/cart/CartPage'

const AppRoutes = () => {

    const publicRoutes = [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/all-products',
            element: <AllProductsPage />
        },
        {
            path: '/product-detail/:id',
            element: <ProductDetailPage />
        },
        {
            path: '/cart',
            element: <Cart />
        }
    ]

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
