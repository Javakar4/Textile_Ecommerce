import React from 'react';
import { Minus, Plus, ShoppingCart, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import toastUtils from "../../utils/toastUtils";

export default function ProductInfo({
    productData,
    selectedSize,
    setSelectedSize,
    quantity,
    handleQuantityChange,
    decrementQuantity,
    incrementQuantity,
    handleCartButton,
    handleBuyButton,
    addToWishlist
}) {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    {productData.pricing?.discount > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {productData.pricing.discount}% OFF
                        </span>
                    )}
                    {productData.stock?.available && (
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                            In Stock
                        </span>
                    )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-amber-700 mb-2">{productData.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <svg key={n} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                                {n === 5 ? (
                                    <>
                                        <defs>
                                            <linearGradient id={`half-${productData._id || n}`}>
                                                <stop offset="50%" stopColor="currentColor" />
                                                <stop offset="50%" stopColor="#d1d5db" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <path fill={`url(#half-${productData._id || n})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </>
                                ) : (
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                )}
                            </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({productData.rating?.score})</span>
                    </div>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm text-gray-600">{productData.rating?.count ?? 0} Reviews</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="font-medium">Brand:</span>
                    <span className="text-amber-700 font-medium">
                        {productData.brandId?.name || "Premium Brand"}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="font-medium">Category:</span>
                    <span className="text-gray-800 font-medium">
                        {productData.categoryId?.name}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">SKU:</span>
                    <span className="font-mono text-gray-800">{productData.sku}</span>
                </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-amber-800">
                        ${productData.pricing?.current?.toFixed(2)}
                    </span>
                    {productData.pricing?.original && (
                        <span className="text-2xl text-gray-400 line-through">
                            ${productData.pricing.original.toFixed(2)}
                        </span>
                    )}
                </div>
                {productData.pricing?.original > productData.pricing?.current && (
                    <p className="text-sm text-green-600 font-medium">
                        Save ${(productData.pricing.original - productData.pricing.current).toFixed(2)} on this purchase
                    </p>
                )}
            </div>

            {/* Size */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="grid grid-cols-5 gap-2">
                    {(productData.sizes || []).map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border-2 rounded-lg py-3 text-sm font-medium transition ${
                                size === selectedSize
                                    ? "border-amber-700 bg-amber-50 text-amber-800"
                                    : "border-gray-300 text-gray-700 hover:border-amber-300"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Material */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Material</h3>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">
                    {productData.material}
                </span>
            </div>

            {/* Quantity */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                    <button
                        onClick={decrementQuantity}
                        className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-amber-700 hover:bg-amber-50 transition flex items-center justify-center"
                    >
                        <Minus className="w-5 h-5" />
                    </button>

                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-20 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />

                    <button
                        onClick={incrementQuantity}
                        className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-amber-700 hover:bg-amber-50 transition flex items-center justify-center"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex gap-3">
                    <button onClick={handleCartButton} className="flex-1 bg-amber-700 text-white font-semibold py-4 rounded-xl hover:bg-amber-800 transition flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <button 
                        onClick={() => {
                            addToWishlist(productData);
                            toastUtils.success("Added to wishlist!");
                        }}
                        className="bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-4 rounded-xl hover:border-amber-700 hover:text-amber-700 transition"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
                <button onClick={handleBuyButton} className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition">
                    Buy Now
                </button>
            </div>

            {/* Icons */}
            <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                        <Truck className="w-8 h-8 text-amber-700 mb-2" />
                        <span className="text-xs text-gray-600 font-medium">Fast Shipping</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <RotateCcw className="w-8 h-8 text-amber-700 mb-2" />
                        <span className="text-xs text-gray-600 font-medium">30 Day Return</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Shield className="w-8 h-8 text-amber-700 mb-2" />
                        <span className="text-xs text-gray-600 font-medium">Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
