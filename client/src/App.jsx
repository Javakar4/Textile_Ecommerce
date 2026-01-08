import React from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './components/AppRoutes'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ScrollToTop />
      <ToastContainer />
      <Navbar/>
      <div>
      <AppRoutes />
      </div>
      <Footer/>
    </div>
  )
}

export default App
