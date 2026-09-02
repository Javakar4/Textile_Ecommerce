import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useWishlistServices } from '../hooks/useWishlistServices';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Heart, Trash2, ShoppingBag, Eye, Star, HeartOff, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toastUtils from "../utils/toastUtils";
import fallbackImage from "../assets/fallback-image.png";

const WishlistPage = () => {
    const { removeFromWishlist, clearWishlist, isClearingWishlist } = useWishlist();
    const { useInfiniteWishlist } = useWishlistServices();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigateHook = useNavigate();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteWishlist(!!user);

    const products = useMemo(() => {
        return data && data.pages ? data.pages.flatMap(page => page?.products || []) : [];
    }, [data]);

    const totalItems = data?.pages?.[0]?.totalItems || 0;

    // Removing animation state
    const [removingIds, setRemovingIds] = useState(new Set());

    // Hover state per card
    const [hoveredId, setHoveredId] = useState(null);

    // Intersection observer for infinite scroll
    const observer = useRef();
    const lastProductRef = useCallback(node => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, { rootMargin: '200px' });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const handleRemoveFromWishlist = async (productId, productName) => {
        setRemovingIds(prev => new Set([...prev, productId]));
        // Wait for animation
        setTimeout(async () => {
            await removeFromWishlist(productId);
            setRemovingIds(prev => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            });
            toastUtils.success(`${productName} removed from wishlist`);
        }, 400);
    };

    const handleAddToCart = (product) => {
        const defaultSize = product.sizes?.[0] || product.defaultSize || 'M';
        addToCart(product, defaultSize, 1);
        toastUtils.success(`${product.name} added to cart`);
    };

    const handleProductClick = (productId) => {
        navigateHook(`/collection-detail/${productId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClearAll = async () => {
        if (products.length === 0) return;
        await clearWishlist();
        toastUtils.success("Wishlist cleared");
    };

    const getImageSrc = (product) => {
        let src = product.images?.main;
        if (!src || src.includes('placehold.co') || src.includes('via.placeholder.com') || src.includes('dummyimage.com')) {
            src = fallbackImage;
        }
        return src;
    };

    const getHoverImageSrc = (product) => {
        let src = product.images?.thumbnails?.[1] || product.images?.main;
        if (!src || src.includes('placehold.co') || src.includes('via.placeholder.com') || src.includes('dummyimage.com')) {
            src = fallbackImage;
        }
        return src;
    };

    // --- Skeleton Card ---
    const SkeletonCard = () => (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            <div className="w-full aspect-[3/4] bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
                    ))}
                </div>
                <div className="flex justify-between items-center pt-1">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="h-9 bg-gray-200 rounded-lg w-28" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 pt-20">
            {/* ── Premium Header ── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:20px_20px]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-14 max-w-7xl">
                    {/* Title Row */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-300" />
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                            My Wishlist
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="text-amber-200/70 text-sm sm:text-base ml-11 sm:ml-[52px] mb-5 sm:mb-0">
                        {totalItems > 0
                            ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} saved for later`
                            : 'Your curated collection of favorites'}
                    </p>

                    {/* Action Buttons */}
                    {products.length > 0 && (
                        <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:absolute sm:top-1/2 sm:right-6 sm:-translate-y-1/2 lg:right-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]">
                            <button
                                onClick={handleClearAll}
                                disabled={isClearingWishlist}
                                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-xl border border-white/15 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isClearingWishlist ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                Clear All
                            </button>
                            <button
                                onClick={() => navigateHook('/all-collections')}
                                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-amber-900 text-xs sm:text-sm font-semibold rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-lg shadow-black/10"
                            >
                                Continue Shopping
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 sm:py-28">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200/60 rounded-full flex items-center justify-center">
                                <HeartOff className="w-14 h-14 text-amber-700/50" strokeWidth={1.5} />
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
                                <Sparkles className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-500 mb-8 text-center max-w-md leading-relaxed">
                            Discover beautiful textiles and save your favorites here. Your perfect collection awaits!
                        </p>
                        <button
                            onClick={() => navigateHook('/all-collections')}
                            className="group flex items-center gap-2 bg-amber-700 text-white px-8 py-3.5 rounded-xl hover:bg-amber-800 transition-all duration-300 font-semibold shadow-lg shadow-amber-700/25 hover:shadow-xl hover:shadow-amber-700/30 hover:-translate-y-0.5"
                        >
                            Explore Collections
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product, index) => {
                            const productId = product._id || product.id;
                            const isRemoving = removingIds.has(productId);
                            const isHovered = hoveredId === productId;
                            const isLastElement = index === products.length - 1;

                            return (
                                <div
                                    key={productId}
                                    ref={isLastElement ? lastProductRef : null}
                                    className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 ${
                                        isRemoving
                                            ? 'opacity-0 scale-95 -translate-y-2'
                                            : 'opacity-100 scale-100 translate-y-0'
                                    }`}
                                    onMouseEnter={() => setHoveredId(productId)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* ── Image ── */}
                                    <div
                                        className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer"
                                        onClick={() => handleProductClick(productId)}
                                    >
                                        <img
                                            src={getImageSrc(product)}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 p-2"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = fallbackImage;
                                            }}
                                        />
                                        <img
                                            src={getHoverImageSrc(product)}
                                            alt={`${product.name} alternate`}
                                            className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 p-2 ${
                                                isHovered ? "opacity-100" : "opacity-0"
                                            }`}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = fallbackImage;
                                            }}
                                        />

                                        {/* Discount Badge */}
                                        {product.pricing?.discount > 0 && (
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                                                    -{product.pricing.discount}%
                                                </span>
                                            </div>
                                        )}

                                        {/* Remove from Wishlist Button */}
                                        <div className="absolute top-2.5 right-2.5">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFromWishlist(productId, product.name);
                                                }}
                                                className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md group/btn"
                                                title="Remove from wishlist"
                                            >
                                                <Heart
                                                    size={16}
                                                    className="fill-rose-600 text-rose-600 group-hover/btn:scale-110 transition-transform"
                                                />
                                            </button>
                                        </div>

                                        {/* Quick View Overlay */}
                                        <div
                                            className={`absolute bottom-2.5 left-2.5 right-2.5 transition-all duration-300 ${
                                                isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                                            }`}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProductClick(productId);
                                                }}
                                                className="w-full bg-gray-900/90 backdrop-blur-sm text-white py-2 rounded-lg text-xs font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Eye size={14} /> Quick View
                                            </button>
                                        </div>
                                    </div>

                                    {/* ── Product Details ── */}
                                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                                        {/* Brand & Category */}
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-medium truncate">
                                                {product.brandId?.name || "Premium Brand"}
                                            </span>
                                            <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase truncate ml-2">
                                                {product.categoryId?.name}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h3
                                            className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate group-hover:text-amber-700 transition-colors cursor-pointer"
                                            onClick={() => handleProductClick(productId)}
                                        >
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        {product.description?.[0] && (
                                            <p className="text-[9px] sm:text-[10px] text-gray-500 mb-1.5 line-clamp-2">
                                                {product.description[0]}
                                            </p>
                                        )}

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-1.5">
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
                                            <span className="text-[9px] text-gray-500">
                                                {product.rating?.score || 0} ({product.rating?.count || 0})
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        {product.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {product.tags.slice(0, 2).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[8px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Price & Add to Cart */}
                                        <div className="mt-auto flex items-center justify-between pt-1">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-sm sm:text-base font-bold text-gray-900">
                                                    ₹{product.pricing?.current?.toFixed(2) || "0.00"}
                                                </span>
                                                {product.pricing?.original && product.pricing.original !== product.pricing.current && (
                                                    <span className="text-[10px] text-gray-400 line-through">
                                                        ₹{product.pricing.original.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(product);
                                                }}
                                                className="bg-amber-700 text-white p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-amber-800 transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md"
                                            >
                                                <span className="hidden sm:inline text-[10px] font-medium">Add to Cart</span>
                                                <ShoppingBag size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Loading More Indicator */}
                {isFetchingNextPage && (
                    <div className="flex items-center justify-center py-10 gap-3">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 border-3 border-amber-200 rounded-full" />
                            <div className="absolute inset-0 border-3 border-t-amber-700 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Loading more items...</span>
                    </div>
                )}

                {/* End of List */}
                {!isLoading && !hasNextPage && products.length > 8 && (
                    <div className="flex items-center justify-center py-10">
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-12 h-px bg-gray-200" />
                            <span className="text-sm font-medium">You've seen all your favorites</span>
                            <div className="w-12 h-px bg-gray-200" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
