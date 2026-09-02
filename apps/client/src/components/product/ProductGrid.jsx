import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import './ProductGrid.css';
import fallbackImage from '../../assets/fallback-image.png';

const ProductGrid = ({ products = [], smNewStyleNeeded = false }) => {
    const navigate = useNavigate();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className={`product-grid-container${smNewStyleNeeded ? ' sm-list-mode' : ''}`}>
            {products.map((product, index) => {
                const isFavorite = isInWishlist(product._id || product.id);

                return (
                    <div
                        key={product.id || product._id || index}
                        className={`product-card-wrapper group transition-all duration-200 relative bg-transparent border border-transparent hover:border-gray-200 hover:shadow-md hover:bg-white rounded-xl p-2${smNewStyleNeeded ? ' sm-card-row' : ''}`}
                    >
                        {/* ── Helper to determine actual image src (bypassing dummy placeholders) ── */}
                        {(() => {
                            let imgSrc = product.images?.main;
                            if (!imgSrc || imgSrc.includes('placehold.co') || imgSrc.includes('via.placeholder.com') || imgSrc.includes('dummyimage.com')) {
                                imgSrc = fallbackImage;
                            }

                            return (
                                <>
                                    {/* ── SM Horizontal layout (only when smNewStyleNeeded=true on small screens) ── */}
                                    {smNewStyleNeeded ? (
                            <>
                                {/* ── Image column ── */}
                                        <div
                                            className="sm-card-img-col w-[120px] h-[120px] flex-shrink-0 relative overflow-hidden rounded-[10px] bg-transparent flex items-center justify-center cursor-pointer"
                                            onClick={() => navigate(`/collection-detail/${product._id || product.id}`)}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={product.name}
                                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = fallbackImage;
                                                }}
                                            />
                                        </div>

                                {/* ── Details column — same content as original vertical card ── */}
                                <div
                                    className="sm-card-details-col flex flex-col cursor-pointer"
                                    onClick={() => navigate(`/collection-detail/${product._id || product.id}`)}
                                >
                                    {/* Wishlist */}
                                    <button
                                        className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isFavorite) removeFromWishlist(product._id || product.id);
                                            else addToWishlist(product);
                                        }}
                                    >
                                        <Heart size={16} className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                    </button>

                                    {/* Name */}
                                    <h3 className="text-[15px] font-bold text-gray-800 mb-1 truncate">
                                        {product.name}
                                    </h3>

                                    {/* Rating — yellow stars (same as original) */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={i < Math.floor(product.rating?.score || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-500">
                                            {product.rating?.score ? Number(product.rating.score).toFixed(1) : 0} ({product.rating?.count || 0})
                                        </span>
                                    </div>

                                    {/* Badges — size + brand (same as original) */}
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {product.defaultSize && (
                                            <span className="text-[9px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 py-0.5 rounded-[4px] uppercase">
                                                {product.defaultSize}
                                            </span>
                                        )}
                                        <span className="text-[9px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 py-0.5 rounded-[4px] uppercase">
                                            {product.brandId?.name || 'PREMIUM'}
                                        </span>
                                    </div>

                                    {/* Description (same as original) */}
                                    {product.description?.[0] && (
                                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2">
                                            {product.description[0]}
                                        </p>
                                    )}

                                    {/* Price + Cart (same as original) */}
                                    <div className="mt-auto flex items-center justify-between gap-1.5" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-0.5 truncate">Price</span>
                                            <span className="text-base font-extrabold text-gray-800 leading-none truncate">
                                                ₹{product.pricing?.current?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product, product.defaultSize || 'M', 1);
                                            }}
                                            className="flex-shrink-0 bg-amber-700 text-white px-2.5 py-1.5 rounded-lg hover:bg-amber-800 transition-colors font-semibold text-[10px] shadow-sm whitespace-nowrap"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* ── Original vertical layout (unchanged) ── */
                            <>
                                {/* Heart Icon (Absolute) */}
                                <div className="absolute top-2 right-2 z-10 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                                     onClick={(e) => {
                                        e.stopPropagation();
                                        if (isFavorite) removeFromWishlist(product._id || product.id);
                                        else addToWishlist(product);
                                     }}>
                                    <Heart size={16} className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </div>

                                        {/* Image */}
                                        <div
                                            className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-transparent flex items-center justify-center p-4 mb-2 cursor-pointer"
                                            onClick={() => navigate(`/collection-detail/${product._id || product.id}`)}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={product.name}
                                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = fallbackImage;
                                                }}
                                            />
                                        </div>

                                {/* Details */}
                                <div className="p-3 sm:p-5 flex flex-col bg-transparent flex-grow">
                                    <h3 className="text-[15px] sm:text-[20px] font-bold text-gray-800 mb-1 truncate">{product.name}</h3>

                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} className={i < Math.floor(product.rating?.score || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-500">
                                            {product.rating?.score ? Number(product.rating.score).toFixed(1) : 0} ({product.rating?.count || 0})
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                        {product.defaultSize && (
                                            <span className="text-[9px] sm:text-[11px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] uppercase">
                                                {product.defaultSize}
                                            </span>
                                        )}
                                        <span className="text-[9px] sm:text-[11px] font-semibold tracking-wide border border-gray-300 text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] uppercase">
                                            {product.brandId?.name || 'PREMIUM'}
                                        </span>
                                    </div>

                                    {product.description?.[0] && (
                                        <p className="text-[11px] sm:text-[14px] text-gray-500 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                            {product.description[0]}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between gap-1.5">
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-0.5 truncate">Price</span>
                                            <span className="text-base sm:text-lg font-extrabold text-gray-800 leading-none truncate">
                                                ₹{product.pricing?.current?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product, product.defaultSize || 'M', 1);
                                            }}
                                            className="flex-shrink-0 bg-amber-700 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-amber-800 transition-colors font-semibold text-[10px] sm:text-[12px] shadow-sm whitespace-nowrap"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                );
            })()}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;
