import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useApp } from "../hooks/useApp";
import toastUtils from "../utils/toastUtils";


// Product Card Component
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const { user, setUser, setShowUserLogin } = useAuth();
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isFavorite = isInWishlist(product._id);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.defaultSize);

    // const product = assets.productData[1];

    const handleQuickView = () => {
        navigate(`/collection-detail/${product._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCartButton = () => {
        const itemToAdd = product; // Use product prop directly
        addToCart(itemToAdd, selectedSize, quantity);
        console.log("ITEM ADDED TO CART", itemToAdd);
        toastUtils.success("Item added to cart!", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    };

    return (
        <div className="flex items-center justify-center w-[180px] sm:w-[250px]">
            {/* Product Card */}
            <div
                className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full h-auto sm:h-[400px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                {/* <div className="relative h-[60%] bg-gray-200 overflow-hidden"> */}
                <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden sm:aspect-[3/4]">

                    <img
                        src={product.images?.main}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <img
                        src={product.images?.thumbnails?.[1] || product.images?.main}
                        alt={`${product.name} alternate`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    {/* Discount Badge */}
                    {product.pricing?.discount > 0 && (
                        <div className="absolute top-2 left-2">
                            <span className="bg-rose-600 text-white text-[10px] font-bold px-1 py-px rounded">
                                -{product.pricing.discount}%
                            </span>
                        </div>
                    )}

                    {/* Favorite Button */}
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => {
                                if (isFavorite) {
                                    removeFromWishlist(product._id);
                                    toastUtils.success("Removed from wishlist");
                                } else {
                                    addToWishlist(product);
                                    toastUtils.success("Added to wishlist");
                                }
                            }}
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
                            {product.brandId?.name || "Premium Brand"}
                        </span>
                        <span className="text-[9px] text-gray-400 uppercase">
                            {product.categoryId?.name}
                        </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate group-hover:text-rose-600 transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-[9px] sm:text-[10px] text-gray-600 mb-1 line-clamp-2">
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
                                        i < Math.floor(product.rating?.score || 0)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-[9px] text-gray-600">
                            {product.rating?.score || 0} ({product.rating?.count || 0})
                        </span>
                    </div>

                    {/* Tags Preview */}
                    <div className="flex flex-wrap gap-1 mb-1">
                        {product.tags?.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="text-[8px] bg-gray-100 text-gray-700 px-1 py-px rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-gray-900">
                                ${product.pricing?.current?.toFixed(2) || "0.00"}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                                ${product.pricing?.original?.toFixed(2) || "0.00"}
                            </span>
                        </div>
                        <button onClick={handleCartButton} className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors flex flex-row items-center gap-1">
                            <span className='hidden sm:block text-[10px]'>Add to Cart</span><ShoppingBag size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;