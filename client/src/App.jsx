import React from 'react'
import Navbar from './components/Navbar'
// import AppRoutes from './components/AppRoutes'
import Routes from './components/Routes'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {RouterProvider} from "react-router-dom"

function App() {
  return (
    <div>
      <ScrollToTop />
      <ToastContainer />
      <Navbar/>
      <div>
      <RouterProvider router={Routes}/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
