import React from 'react'
// import AppRoutes from './components/AppRoutes'
import AppRoutes from './components/Routes'
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {RouterProvider} from "react-router-dom"
import { AppContextProvider } from '@context/AppContext';
import { AuthContextProvider } from '@context/AuthContext';

function App() {
    return (
    <>    
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        limit={3}
      />

      <AppContextProvider>
        <AuthContextProvider>
            <RouterProvider router={AppRoutes}/>    
        </AuthContextProvider>
      </AppContextProvider>
    </>
    )
}

export default App
