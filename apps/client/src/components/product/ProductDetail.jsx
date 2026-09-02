import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductServices } from "../../hooks/useProductServices";
import { useApp } from "../../hooks/useApp";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { ChevronRight } from "lucide-react";
import toastUtils from "../../utils/toastUtils";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import fallbackImage from "../../assets/fallback-image.png";

const isPlaceholder = (url) =>
    !url ||
    url.includes('placehold.co') ||
    url.includes('via.placeholder.com') ||
    url.includes('dummyimage.com');

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
            const mainImg = productData.images?.main || "";
            setSelectedImage(isPlaceholder(mainImg) ? fallbackImage : mainImg);
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
                    <ProductGallery 
                        productData={productData} 
                        selectedImage={selectedImage} 
                        setSelectedImage={setSelectedImage} 
                    />

                    <ProductInfo 
                        productData={productData}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        quantity={quantity}
                        handleQuantityChange={handleQuantityChange}
                        decrementQuantity={decrementQuantity}
                        incrementQuantity={incrementQuantity}
                        handleCartButton={handleCartButton}
                        handleBuyButton={handleBuyButton}
                        addToWishlist={addToWishlist}
                    />
                </div>

                <ProductDescription productData={productData} />

                {/* Offer Banner */}
                <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
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
