import React from "react";
import { FaArrowRight } from "react-icons/fa";
import assets from "../../assets/assets";
import ProductCard from "../product/NewProductCard";
import { NavLink } from "react-router-dom";

function CollectionsScroller({title, desc, products = [], category, isLoading}) {
    const [stopScroll, setStopScroll] = React.useState(false);
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId;
        
        const scroll = () => {
            if (!stopScroll) {
                container.scrollLeft += 1.5; // Adjust this number for speed (higher = faster)
                
                // If scrolled past half the container (the duplicated items), reset to 0 for infinite loop
                if (container.scrollLeft >= (container.scrollWidth / 2)) {
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };
        
        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [stopScroll]);

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
        .scroll-container {
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .scroll-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Webkit */
        }
        .scroll-item {
          flex: 0 0 auto;
        }
      `}</style>

            <div className="py-16 sm:px-8 relative bg-[radial-gradient(circle_at_top_left,rgba(244,244,244,0.8),white_60%)]">

                {/* Page Title + Button */}
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-6 flex-col sm:flex-row gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
                            {title}
                        </h2>
                        <p className="text-stone-600 mt-1 text-sm sm:text-base">
                            {desc}
                        </p>
                    </div>

                    <NavLink to={`/all-collections?category=${category}`} className="group bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-center w-full sm:w-[30px] justify-center max-w-[300px]">
                        View All {title}
                        <FaArrowRight className="text-lg transform transition-transform group-hover:translate-x-2" />
                    </NavLink>
                </div>

                {/* Scroller */}
                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Gradient Left */}
                    <div className="hidden sm:block absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        className="scroll-container gap-4 pb-8 px-4 sm:px-0"
                        onMouseEnter={() => setStopScroll(true)}
                        onMouseLeave={() => setStopScroll(false)}
                        onTouchStart={() => setStopScroll(true)}
                        onTouchEnd={() => setStopScroll(false)}
                    >
                        {cards.map((product, index) => (
                            <div key={index} className="scroll-item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Right */}
                    <div className="hidden sm:block absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                </div>
            </div>
        </>
    );
}

export default CollectionsScroller;
