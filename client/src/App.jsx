import React from 'react'
// import AppRoutes from './components/AppRoutes'
import AppRoutes from './components/Routes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {RouterProvider} from "react-router-dom"
import { AppContextProvider } from '@context/AppContext';

function App() {
    return (
    <>    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
      <AppContextProvider>
        <RouterProvider router={AppRoutes}/>    
      </AppContextProvider>
    </>
    )
}

export default App
