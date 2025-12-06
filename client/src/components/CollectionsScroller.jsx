import React from "react";
import { FaArrowRight } from "react-icons/fa";
import assets from "../assets/assets";
import ProductCard from "./ProductCard";

function CollectionsScroller() {
    const [stopScroll, setStopScroll] = React.useState(false);

    // Duplicate cards for infinite scrolling
    const cards = [...assets.productData, ...assets.productData];

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
                            Men's Collections
                        </h2>
                        <p className="text-stone-600 mt-1 text-sm sm:text-base">
                            Explore our premium selection crafted for style, comfort & confidence.
                        </p>
                    </div>

                    <button className="group bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg">
                        View All Collections
                        <FaArrowRight className="text-lg transform transition-transform group-hover:translate-x-2" />
                    </button>
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
                            animationDuration: `${assets.productData.length * 3000}ms`,
                        }}
                    >
                        {/* {cards.map((product, index) => (
                            // <div
                            //     key={index}
                            //     className="w-64 mx-4 h-[22rem] relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
                            // >
                            //     <img
                            //         src={card.images.main}
                            //         alt={card.name}
                            //         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            //     />
                            //     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                            //         <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
                            //             {card.name}
                            //         </h3>
                            //         <p className="text-sm mb-3 opacity-90">{card.description[0]}</p>
                            //         <button className="px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 rounded-md transition">
                            //             View Collection
                            //         </button>
                            //     </div>
                            // </div>
                        ))} */}
                        {cards.map((product, index) => (
                            <div key={product.id || index}>
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
