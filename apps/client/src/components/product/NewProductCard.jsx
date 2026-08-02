import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import toastUtils from "../../utils/toastUtils";

const NewProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isFavorite = isInWishlist(product._id);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.defaultSize);

    const handleCartButton = () => {
        const itemToAdd = product;
        addToCart(itemToAdd, selectedSize, quantity);
        toastUtils.success("Item added to cart!", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    };

    return (
        <div className="flex items-center justify-center w-full max-w-[360px] sm:max-w-[280px] mx-auto">
            {/* New Product Card */}
            <div className="relative flex flex-col bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full">
                
                {/* Image Container with Gradient */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#6b678c] to-[#9a99c3] p-4 flex items-center justify-center">
                    <img
                        src={product.images?.main}
                        alt={product.name}
                        className="w-4/5 h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                    
                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => {
                                if (isFavorite) {
                                    removeFromWishlist(product._id);
                                } else {
                                    addToWishlist(product);
                                }
                            }}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition-colors flex items-center justify-center"
                        >
                            <Heart
                                size={18}
                                className={`transition-colors ${isFavorite ? "fill-white text-white" : "text-white/80"}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Product Details Container */}
                <div className="p-3 sm:p-5 flex flex-col bg-white flex-grow">
                    {/* Title */}
                    <h3 className="text-[15px] sm:text-[20px] font-bold text-gray-800 mb-1 truncate">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
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
                        <span className="text-[11px] font-medium text-gray-500">
                            {product.rating?.score ? Number(product.rating.score).toFixed(1) : 0} ({product.rating?.count || 0})
                        </span>
                    </div>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {product.defaultSize && (
                            <span className="text-[9px] sm:text-[11px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] uppercase">
                                {product.defaultSize}
                            </span>
                        )}
                        <span className="text-[9px] sm:text-[11px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] uppercase">
                            {product.brandId?.name || "PREMIUM"}
                        </span>
                    </div>

                    {/* Description */}
                    {product.description?.[0] && (
                        <p className="text-[11px] sm:text-[14px] text-gray-500 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {product.description[0]}
                        </p>
                    )}

                    {/* Footer: Price & Add to Cart */}
                    <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-0.5">
                                Price
                            </span>
                            <span className="text-lg sm:text-2xl font-extrabold text-gray-800 leading-none">
                                ${product.pricing?.current?.toFixed(2) || "0.00"}
                            </span>
                        </div>
                        <button 
                            onClick={handleCartButton} 
                            className="bg-[#5c5685] text-white px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl hover:bg-[#49446d] transition-colors font-semibold text-[11px] sm:text-[14px] shadow-sm whitespace-nowrap"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductCard;
