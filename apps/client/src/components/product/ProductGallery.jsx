import React from 'react';
import { ImageOff } from 'lucide-react';
import fallbackImage from "../../assets/fallback-image.png";

const isPlaceholder = (url) =>
    !url ||
    url.includes('placehold.co') ||
    url.includes('via.placeholder.com') ||
    url.includes('dummyimage.com');

const getSafeSrc = (url) => (isPlaceholder(url) ? fallbackImage : url);

export default function ProductGallery({ productData, selectedImage, setSelectedImage }) {
    const safeSrc = getSafeSrc(selectedImage);
    const thumbnails = (productData.images?.thumbnails || []).filter(Boolean);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                {safeSrc ? (
                    <img
                        src={safeSrc}
                        alt={productData.name}
                        className="w-full h-96 sm:h-[500px] object-contain mix-blend-multiply p-4 bg-gray-50"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImage;
                        }}
                    />
                ) : (
                    <div className="w-full h-96 sm:h-[500px] bg-gray-100 flex flex-col items-center justify-center gap-3 text-gray-400">
                        <ImageOff className="w-16 h-16" />
                        <span className="text-sm font-medium">No image available</span>
                    </div>
                )}
            </div>

            {thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                    {thumbnails.map((img, index) => {
                        const thumbSrc = getSafeSrc(img);
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`bg-white rounded-lg overflow-hidden border cursor-pointer transition-all ${
                                    selectedImage === img
                                        ? "border-2 border-amber-700 shadow-md"
                                        : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                <img
                                    src={thumbSrc}
                                    alt={`${productData.name} - View ${index + 1}`}
                                    className="w-full h-20 sm:h-24 object-contain mix-blend-multiply p-1 bg-gray-50"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = fallbackImage;
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
