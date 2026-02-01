import React from "react";
import { FaArrowRight } from "react-icons/fa";
import assets from "../assets/assets";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

function CollectionsScroller({title, desc, products = [], category, isLoading}) {
    const [stopScroll, setStopScroll] = React.useState(false);

    if (isLoading) {
        return (
            <div className="py-16 px-8 max-w-7xl mx-auto flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return null; // Or show a fallback
    }

    // Duplicate cards for infinite scrolling
    const cards = [...products, ...products];

    return (
        <>
            <style>{`
        .marquee-inner {
          display: flex;
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

            <div className="py-16 sm:px-8 relative bg-[radial-gradient(circle_at_top_left,rgba(244,244,244,0.8),white_60%)]">

                {/* Page Title + Button */}
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-6 flex-col sm:flex-row gap-3">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900" style={{ fontFamily: "Playfair Display, serif" }}>
                            {title}
                        </h2>
                        <p className="text-stone-600 mt-1 text-sm sm:text-base">
                            {desc}
                        </p>
                    </div>

                    <NavLink to={`/all-collections?category=${category}`} className="group bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-center">
                        View All {title}
                        <FaArrowRight className="text-lg transform transition-transform group-hover:translate-x-2" />
                    </NavLink>
                </div>

                {/* Scroller */}
                <div
                    className="overflow-hidden w-full relative max-w-7xl mx-auto"
                    onMouseEnter={() => setStopScroll(true)}
                    onMouseLeave={() => setStopScroll(false)}
                >
                    {/* Gradient Left */}
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                    {/* Marquee */}
                    <div
                        className="marquee-inner gap-4"
                        style={{
                            animationPlayState: stopScroll ? "paused" : "running",
                            animationDuration: `${products.length * 6}s`,
                        }}
                    >
                        {cards.map((product, index) => (
                            <div key={index}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Right */}
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                </div>
            </div>
        </>
    );
}

export default CollectionsScroller;
