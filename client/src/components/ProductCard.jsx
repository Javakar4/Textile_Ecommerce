import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { UseAppContext } from "../context/AppContext";


// Product Card Component
const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { navigate, user, setUser, setShowUserLogin, assets } = UseAppContext()

    // const product = assets.productData[1];

    const handleQuickView = () => {
        navigate(`/product-detail/${product.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex items-center justify-center w-[270px]">
            {/* Product Card */}
            <div
                className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full h-[400px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative h-[60%] bg-gray-200 overflow-hidden">
                    <img
                        src={product.images.main}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <img
                        src={product.images.thumbnails[1]}
                        alt={`${product.name} alternate`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    {/* Discount Badge */}
                    {product.pricing.discount > 0 && (
                        <div className="absolute top-2 left-2">
                            <span className="bg-rose-600 text-white text-[10px] font-bold px-1 py-[1px] rounded">
                                -{product.pricing.discount}%
                            </span>
                        </div>
                    )}

                    {/* Favorite Button */}
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors"
                        >
                            <Heart
                                size={16}
                                className={`transition-colors ${isFavorite ? "fill-rose-600 text-rose-600" : "text-gray-700"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Quick View Button */}
                    <div
                        className={`absolute bottom-2 left-0 right-0 px-2 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"
                            }`}
                    >
                        <button onClick={handleQuickView} className="w-full bg-gray-900 text-white py-1.5 rounded-lg text-[12px] font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                            <Eye size={14} /> Quick View
                        </button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="p-3 flex flex-col h-[40%]">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider font-medium">
                            {product.brand.name}
                        </span>
                        <span className="text-[9px] text-gray-400 uppercase">
                            {product.category}
                        </span>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate group-hover:text-rose-600 transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-[10px] text-gray-600 mb-1 line-clamp-2">
                        {product.description[0]}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={
                                        i < Math.floor(product.rating.score)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-[9px] text-gray-600">
                            {product.rating.score} ({product.rating.count})
                        </span>
                    </div>

                    {/* Tags Preview */}
                    <div className="flex flex-wrap gap-1 mb-1">
                        {product.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="text-[8px] bg-gray-100 text-gray-700 px-1 py-[1px] rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-gray-900">
                                ${product.pricing.current.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                                ${product.pricing.original.toFixed(2)}
                            </span>
                        </div>
                        <button className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors flex flex-row items-center gap-1">
                            <span className='text-[10px]'>Add to Cart</span><ShoppingBag size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;