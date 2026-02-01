import React from "react";
import { FaTshirt, FaCouch, FaIndustry, FaPalette, FaArrowRight, FaShapes } from "react-icons/fa";
import { useCategoryServices } from "../hooks/useCategoryServices";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
    const { useCategories } = useCategoryServices();
    const { data: categories, isLoading } = useCategories();
    const navigate = useNavigate();

    // Map backend categories to include visual elements if not present
    // Fallback icons and colors for a premium look
    const iconMap = {
        "Men's Collection": FaTshirt,
        "Kid's Collection": FaShapes,
        "Industrial": FaIndustry,
        "Design": FaPalette,
    };

    const colors = [
        "from-amber-600 to-amber-800",
        "from-stone-600 to-stone-800",
        "from-blue-600 to-blue-800",
        "from-emerald-600 to-emerald-800",
        "from-rose-600 to-rose-800",
        "from-indigo-600 to-indigo-800"
    ];

    if (isLoading) {
        return (
            <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    const categoriesData = categories || [];

    return (
        <section id="categories" className="h-auto bg-white relative py-6">

            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100 rounded-full blur-2xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-stone-200 rounded-full blur-2xl opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Title */}
                <div className="text-center mb-4">
                    <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
                        Discover Our Range
                    </span>

                    <h2
                        className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-2"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        Shop By Categories
                    </h2>

                    <p className="text-sm text-stone-600 max-w-xl mx-auto leading-snug">
                        Explore premium curated textile collections
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">

                    {categoriesData.map((cat, i) => {
                        const Icon = iconMap[cat.name] || FaShapes;
                        const categoryColor = colors[i % colors.length];

                        return (
                            <div
                                key={cat._id || i}
                                onClick={() => navigate(`/all-collections?category=${cat._id}`)}
                                className="group relative bg-linear-to-br from-stone-50 to-amber-50 rounded-xl p-4 hover:shadow-xl duration-300 transform hover:-translate-y-1 border border-stone-200 overflow-hidden cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-full blur-xl opacity-0 group-hover:opacity-40 duration-300"></div>

                                <div className="relative z-10">

                                    {/* Icon */}
                                    <div
                                        className={`w-10 h-10 bg-linear-to-br ${categoryColor} rounded-xl flex items-center justify-center mb-3 transform duration-300 group-hover:scale-105 group-hover:translate-x-1 group-hover:rotate-[20deg] text-white text-lg`}
                                    >
                                        <Icon className="text-xl" />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-lg font-bold text-stone-900 mb-1"
                                        style={{ fontFamily: "Playfair Display, serif" }}
                                    >
                                        {cat.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs text-stone-600 leading-snug mb-2">
                                        Premium quality materials crafted with precision
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-amber-700">Explore</span>
                                        <FaArrowRight className="text-amber-700 text-sm transform group-hover:translate-x-1 duration-300" />
                                    </div>

                                </div>
                            </div>
                        );
                    })}


                </div>
            </div>
        </section>
    );
}
