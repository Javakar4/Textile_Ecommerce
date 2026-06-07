import React from 'react';

export default function ProductDescription({ productData }) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                {productData.description?.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                    </p>
                ))}
            </div>

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
                        {productData.collections?.map((collection) => (
                            <span key={collection} className="bg-amber-100 text-amber-800 text-sm font-medium px-4 py-2 rounded-lg">
                                {collection}
                            </span>
                        ))}
                    </div>

                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {productData.tags?.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
