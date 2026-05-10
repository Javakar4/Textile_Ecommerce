import { useProductServices } from "../hooks/useProductServices";
import { useParams, useNavigate } from "react-router-dom";
import { 
    ChevronRight, 
    Minus, 
    Plus, 
    ShoppingCart, 
    Heart, 
    Truck, 
    RotateCcw, 
    Shield 
} from "lucide-react";
import { useState, useEffect } from "react";
import toastUtils from "../utils/toastUtils";

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const { assets } = useApp();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { addToWishlist } = useWishlist();
    const { id } = useParams();
    
    const { useProduct } = useProductServices();
    const { data: productData, isLoading, error } = useProduct(id);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (productData) {
            setSelectedSize(productData.defaultSize || productData.sizes?.[0] || "");
            setSelectedImage(productData.images?.main || "");
        }
    }, [productData]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (error || !productData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                <p className="text-gray-600 mb-6">The product you are looking for might have been removed or is temporarily unavailable.</p>
                <button 
                    onClick={() => navigate("/all-collections")}
                    className="bg-amber-700 text-white px-8 py-3 rounded-xl hover:bg-amber-800 transition"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    const incrementQuantity = () => {
        setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
    };

    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 99) value = 99;
        setQuantity(value);
    };


    const handleCartButton = () => {
        addToCart(productData, selectedSize, quantity);
        console.log("ITEM ADDED TO CART");
        toastUtils.success("Item added to cart!", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    };

    const handleBuyButton = () => {
        addToCart(productData, selectedSize, quantity);
        navigate("/cart");
    };



    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 sm:mb-8">
                    <button onClick={() => navigate("/")} className="hover:text-amber-700">Home</button>
                    <ChevronRight className="w-3 h-3" />
                    <button onClick={() => navigate("/all-collections")} className="hover:text-amber-700">All Collections</button>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900 font-medium">{productData.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                            <img
                                src={selectedImage}
                                alt={productData.name}
                                className="w-full h-96 sm:h-[500px] object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {productData.images.thumbnails.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`bg-white rounded-lg overflow-hidden border cursor-pointer ${selectedImage === img ? "border-2 border-amber-700" : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${productData.name} - View ${index + 1}`}
                                        className="w-full h-20 sm:h-24 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
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
                                                        <linearGradient id="half">
                                                            <stop offset="50%" stopColor="currentColor" />
                                                            <stop offset="50%" stopColor="#d1d5db" stopOpacity="1" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </>
                                            ) : (
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            )}
                                        </svg>
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">({productData.rating.score})</span>
                                </div>
                                <span className="text-sm text-gray-500">|</span>
                                <span className="text-sm text-gray-600">{productData.rating.count} Reviews</span>
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
                                {productData.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`border-2 rounded-lg py-3 text-sm font-medium transition ${size === selectedSize
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
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                    {productData.description.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Specs & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Material</span>
                                <span className="text-gray-900 font-semibold">{productData.material}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Sizes</span>
                                <span className="text-gray-900 font-semibold">{productData.sizes?.join(", ")}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600 font-medium">SKU</span>
                                <span className="text-gray-900 font-semibold font-mono text-sm">{productData.sku}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Collections & Tags</h3>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Collections</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {productData.collections.map((collection) => (
                                <span key={collection} className="bg-amber-100 text-amber-800 text-sm font-medium px-4 py-2 rounded-lg">
                                    {collection}
                                </span>
                            ))}
                        </div>

                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {productData.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Offer Banner */}
                <div className="bg-linear-to-r from-amber-700 to-amber-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                            <p className="text-amber-100">Get an extra 10% off on your first purchase. Use code: TEXTILE10</p>
                        </div>
                        <button className="bg-white text-amber-700 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

