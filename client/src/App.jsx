import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductCard from './components/ProductCard'
import ProductDetailPage from './components/ProductDetail'
import AllProductsPage from './pages/AllProductsPage'

function App() {
  return (
    <div>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/product-card' element={<ProductCard/>}/> */}
          <Route path='/all-products' element={<AllProductsPage/>}/>
          <Route path='/product-detail/:id' element={<ProductDetailPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
