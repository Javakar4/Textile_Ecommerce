import React from 'react'
import HeroSection from '../components/HeroSection'
import ShopByCatagory from '../components/ShopByCategory'
import Testimonials from '../components/Testimonials'
import CollectionsScroller from '../components/CollectionsScroller'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

function Home() {
    return (
        <div className='mt-16'>
            <HeroSection />
            <ShopByCatagory />
            <CollectionsScroller/>
            <CollectionsScroller/>
            <Testimonials />
            <NewsLetter />
            <Footer />
        </div>
    )
}

export default Home