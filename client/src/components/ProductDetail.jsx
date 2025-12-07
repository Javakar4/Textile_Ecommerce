import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, ShoppingCart, Heart, Truck, RotateCcw, Shield, Plus, Minus } from "lucide-react";
import assets from "../assets/assets";

export default function ProductDetailPage() {
    const { id } = useParams();
    const productData = assets.productData.find((p) => p.id === id);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(productData.defaultSize);
    const [selectedImage, setSelectedImage] = useState(productData.images.main);

    const incrementQuantity = () => {
        setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
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

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 sm:mb-8">
                    {productData.breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            {item.url ? (
                                <a href={item.url} className="hover:text-amber-700">{item.label}</a>
                            ) : (
                                <span className="text-gray-900 font-medium">{item.label}</span>
                            )}
                            {index < productData.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3" />}
                        </div>
                    ))}
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
                                {productData.badges.map((badge) => (
                                    <span key={badge} className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                                        {badge}
                                    </span>
                                ))}
                                {productData.stock.available && (
                                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {productData.stock.label}
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
                                <a href={productData.brand.url} className="text-amber-700 hover:text-amber-800 font-medium">
                                    {productData.brand.name}
                                </a>
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
                                    ${productData.pricing.current.toFixed(2)}
                                </span>
                                <span className="text-2xl text-gray-400 line-through">
                                    ${productData.pricing.original.toFixed(2)}
                                </span>
                                <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                                    {productData.pricing.discount}% OFF
                                </span>
                            </div>
                            <p className="text-sm text-green-600 font-medium">
                                Save ${productData.pricing.savings.toFixed(2)} on this purchase
                            </p>
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
                                <button className="flex-1 bg-amber-700 text-white font-semibold py-4 rounded-xl hover:bg-amber-800 transition flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                                </button>
                                <button className="bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-4 rounded-xl hover:border-amber-700 hover:text-amber-700 transition">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition">
                                Buy Now
                            </button>
                        </div>

                        {/* Icons */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {productData.features.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.label} className="flex flex-col items-center">
                                            {item.icon === "Truck" && <Truck className="w-8 h-8 text-amber-700 mb-2" />}
                                            {item.icon === "RotateCcw" && <RotateCcw className="w-8 h-8 text-amber-700 mb-2" />}
                                            {item.icon === "Shield" && <Shield className="w-8 h-8 text-amber-700 mb-2" />}
                                            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                                        </div>
                                    );
                                })}
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
                            {Object.entries(productData.specifications).map(([key, value]) => (
                                <div key={key} className={`flex justify-between py-2 ${key !== 'productId' ? 'border-b border-gray-100' : ''}`}>
                                    <span className="text-gray-600 font-medium">
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </span>
                                    <span className={`text-gray-900 font-semibold ${key === 'productId' ? 'font-mono text-sm' : ''}`}>
                                        {value}
                                    </span>
                                </div>
                            ))}
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
                <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{productData.offer.title}</h3>
                            <p className="text-amber-100">{productData.offer.description}</p>
                        </div>
                        <button className="bg-white text-amber-700 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition">
                            {productData.offer.ctaText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

