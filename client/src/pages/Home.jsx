import React, { useContext } from 'react'
import HeroSection from '../components/HeroSection'
import ShopByCatagory from '../components/ShopByCategory'
import Testimonials from '../components/Testimonials'
import CollectionsScroller from '../components/CollectionsScroller'
import NewsLetter from '../components/NewsLetter'
import { UseAppContext } from '../context/AppContext'

function Home() {

    const {mensCollection, kidsCollection} = UseAppContext();

    return (
        <div className='mt-16'>
            <HeroSection />
            <ShopByCatagory />
            <CollectionsScroller title={"Men's Collections"} desc={"Explore our premium selection crafted for style, comfort & confidence."} products={mensCollection} category={"MC"}/>
            <CollectionsScroller title={"Kid's Collections"} desc={"Explore our premium selection crafted for style, comfort & confidence."} products={kidsCollection} category={"KC"}/>
            <Testimonials />
            <NewsLetter />
        </div>
    )
}

export default Home