import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useApp } from '../hooks/useApp';
import { FaHeart, FaTrash, FaShoppingCart, FaHeartBroken } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toastUtils from "../utils/toastUtils";

const WishlistPage = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigateHook = useNavigate();

    const handleRemoveFromWishlist = (productId, productName) => {
        removeFromWishlist(productId);
        toastUtils.success(`${productName} removed from wishlist`);
    };

    const handleAddToCart = (product) => {
        // Add to cart with default size (first available size)
        const defaultSize = product.sizes?.[0] || 'M';
        addToCart(product, defaultSize, 1);
        toastUtils.success(`${product.name} added to cart`);
    };

    const handleProductClick = (productId) => {
        navigateHook(`/collection-detail/${productId}`);
    };

    const calculateDiscount = (original, current) => {
        if (!original || !current) return 0;
        return Math.round(((original - current) / original) * 100);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <FaHeart className="text-amber-700" /> My Wishlist
            </h1>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-white to-amber-50/30 rounded-xl shadow-lg border border-amber-100">
                    <FaHeartBroken className="text-amber-700 text-6xl mb-4 opacity-50" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Start adding products you love!</p>
                    <button 
                        onClick={() => navigateHook('/all-collections')}
                        className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((product) => {
                        const discount = calculateDiscount(product.pricing?.original, product.pricing?.current);
                        const productId = product._id || product.id;
                        
                        return (
                            <div 
                                key={productId} 
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                            >
                                {/* Product Image */}
                                <div 
                                    className="relative overflow-hidden cursor-pointer bg-gray-50"
                                    onClick={() => handleProductClick(productId)}
                                >
                                    <img 
                                        src={product.images?.main || product.image} 
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {discount > 0 && (
                                        <span className="absolute top-3 right-3 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {discount}% OFF
                                        </span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-5">
                                    <div 
                                        className="cursor-pointer mb-3"
                                        onClick={() => handleProductClick(productId)}
                                    >
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-amber-700 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 capitalize">
                                            {product.categoryId?.name || "Textile Collection"}
                                        </p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl font-bold text-amber-700">
                                            ${product.pricing?.current?.toFixed(2) || product.price?.toFixed(2)}
                                        </span>
                                        {product.pricing?.original && product.pricing.original !== product.pricing.current && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${product.pricing.original.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex-1 bg-amber-700 text-white py-2.5 px-4 rounded-lg hover:bg-amber-800 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                                        >
                                            <FaShoppingCart size={14} /> Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemoveFromWishlist(productId, product.name)}
                                            className="bg-red-50 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium border border-red-200 hover:border-red-300"
                                            title="Remove from wishlist"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Wishlist Summary */}
            {wishlistItems.length > 0 && (
                <div className="mt-8 bg-gradient-to-br from-white to-amber-50/30 p-6 rounded-xl shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} in Wishlist
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Keep track of products you love
                            </p>
                        </div>
                        <button
                            onClick={() => navigateHook('/all-collections')}
                            className="bg-amber-700 text-white px-6 py-2.5 rounded-lg hover:bg-amber-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
