import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import './ProductGrid.css';

const ProductGrid = ({ products = [] }) => {
    const navigate = useNavigate();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [style, setStyle]=useState(true)
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="product-grid-container">
            {products.map((product, index) => {
                const isFavorite = isInWishlist(product._id || product.id);
                
                return (
                    <div 
                        key={product.id || product._id || index} 
                        className="flex flex-col w-full max-w-[240px] group transition-all duration-200 relative bg-transparent border border-transparent hover:border-gray-200 hover:shadow-md hover:bg-white rounded-xl p-2"
                    >
                        {/* Heart Icon (Absolute) */}
                        <div className="absolute top-2 right-2 z-10 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                             onClick={(e) => {
                                e.stopPropagation();
                                if (isFavorite) removeFromWishlist(product._id || product.id);
                                else addToWishlist(product);
                             }}>
                            <Heart size={16} className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                        </div>

                        {/* Minimal Image Section */}
                        <div 
                            className="relative aspect-square w-full bg-transparent flex items-center justify-center p-2 mb-2 cursor-pointer"
                            onClick={() => navigate(`/collection-detail/${product._id || product.id}`)}
                        >
                            <img 
                                src={product.images?.main} 
                                alt={product.name} 
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Minimal Details Section */}
                       {!style ? (<div 
                            className="flex flex-col cursor-pointer"
                            onClick={() => navigate(`/collection-detail/${product._id || product.id}`)}
                        >
                            {/* Brand / Subtitle */}
                            <span className="text-[12px] font-medium text-gray-500 mb-0.5">
                                {product.brandId?.name || "Premium Brand"}
                            </span>

                            <h3 className="text-[14px] text-gray-800 line-clamp-2 leading-tight mb-1.5 hover:text-amber-700 transition-colors">
                                {product.name}
                            </h3>
                            
                            {/* Rating (Flipkart style green badge) */}
                            <div className="flex items-center gap-1.5 mb-2">
                                <div className="bg-green-600 text-white px-1.5 py-0.5 rounded-[3px] flex items-center gap-0.5">
                                    <span className="text-[10px] font-bold">
                                        {product.rating?.score ? Number(product.rating.score).toFixed(1) : "3.0"}
                                    </span>
                                    <Star size={10} className="fill-white" />
                                </div>
                                <span className="text-[11px] text-gray-500">
                                    ({product.rating?.count || 12})
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mt-auto flex-wrap">
                                <span className="text-[16px] font-bold text-gray-900">
                                    ₹{product.pricing?.current?.toFixed(0) || "0"}
                                </span>
                                {product.pricing?.original > product.pricing?.current && (
                                    <>
                                        <span className="text-[12px] text-gray-500 line-through">
                                            ₹{product.pricing.original.toFixed(0)}
                                        </span>
                                        <span className="text-[12px] font-bold text-green-600">
                                            {product.pricing?.discount || 
                                                Math.round(((product.pricing.original - product.pricing.current) / product.pricing.original) * 100)}% off
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        )
                    :
                    (<div className="p-3 sm:p-5 flex flex-col bg-transparent flex-grow">
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
                                        <div className="mt-auto flex items-center justify-between gap-1.5 mt-2">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-0.5 truncate">
                                                    Price
                                                </span>
                                                <span className="text-base sm:text-lg font-extrabold text-gray-800 leading-none truncate">
                                                    ${product.pricing?.current?.toFixed(2) || "0.00"}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product, product.defaultSize || 'M', 1);
                                                }} 
                                                className="flex-shrink-0 bg-[#5c5685] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#49446d] transition-colors font-semibold text-[10px] sm:text-[12px] shadow-sm whitespace-nowrap"
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    )} 
                        
                    </div>
                )
            })}
        </div>
    );
};

export default ProductGrid;
