import React, { useState, useEffect } from 'react';
import Navbar from '@components/Navbar'
import ScrollToTop from '@components/ScrollToTop'
import Footer from '@components/Footer'
import { Outlet } from 'react-router-dom'


export default function Layout ({children}){

    return (
        <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
        </>
    )
}