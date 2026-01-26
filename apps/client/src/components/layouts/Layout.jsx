import React from 'react';
import Navbar from '@components/Navbar';
import ScrollToTop from '@components/ScrollToTop';
import Footer from '@components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
    const { pathname } = useLocation();

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            {!pathname.includes('auth') && <Footer />}
        </>
    );
}