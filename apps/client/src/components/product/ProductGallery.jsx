import React from 'react';

export default function ProductGallery({ productData, selectedImage, setSelectedImage }) {
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <img
                    src={selectedImage}
                    alt={productData.name}
                    className="w-full h-96 sm:h-[500px] object-cover"
                />
            </div>

            <div className="grid grid-cols-4 gap-3">
                {(productData.images?.thumbnails || []).map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`bg-white rounded-lg overflow-hidden border cursor-pointer ${
                            selectedImage === img ? "border-2 border-amber-700" : "border-gray-200 hover:border-gray-400"
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
    );
}
