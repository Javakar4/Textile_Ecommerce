import React from 'react'
// import AppRoutes from './components/AppRoutes'
import AppRoutes from './components/Routes'
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom"
import { SocketProvider } from './context/SocketContext';
import { AppContextProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
    <>    
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            padding: '16px 24px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '500',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f3f4f6',
            maxWidth: '500px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            duration: 5000, // Error toasts stay slightly longer
          },
        }}
      />

      <AppContextProvider>
        <AuthContextProvider>
          <SocketProvider>
            <CartProvider>
              <WishlistProvider>
                <RouterProvider router={AppRoutes}/>    
              </WishlistProvider>
            </CartProvider>
          </SocketProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </>
    )
}

export default App
