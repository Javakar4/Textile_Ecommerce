import React from 'react';
import Navbar from '@components/layouts/Navbar';
import ScrollToTop from '@components/common/ScrollToTop';
import Footer from '@components/layouts/Footer';
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