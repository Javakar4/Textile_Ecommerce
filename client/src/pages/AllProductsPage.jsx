import React from 'react'
import ProductCard from '../components/ProductCard'
import { UseAppContext } from "../context/AppContext";

function AllProductsPage() {
    const { navigate, user, setUser, setShowUserLogin, assets } = UseAppContext();
    const cards = assets.productData;

    return (
        <div className='mt-16'>
        <div>
            <title>All products</title>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {cards.map((card, index) => {
                return (
                    <div key={index} className=''>
                        <ProductCard product={card} />
                    </div>
                )
            })}
        </div>
        </div>
    );
}

export default AllProductsPage;
