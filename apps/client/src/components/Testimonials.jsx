import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Testimonials() {
    const [index, setIndex] = useState(0);

    const next = () =>
        setIndex((prev) => (prev + 1) % assets.testimonials.length);

    const prev = () =>
        setIndex((prev) => (prev - 1 + assets.testimonials.length) % assets.testimonials.length);

    const goTo = (i) => setIndex(i);

    useEffect(() => {
        const auto = setInterval(() => {
            setIndex((prev) => (prev + 1) % assets.testimonials.length);
        }, 4000);

        return () => clearInterval(auto);
    }, []);


    return (
        <section
            id="testimonials"
            className="py-16 from-amber-50 via-white to-stone-50 relative overflow-hidden h-auto"
        >
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-stone-200 rounded-full filter blur-3xl opacity-20"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <div className="text-center mb-10">
                    <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
                        Testimonials
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 mb-3"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        Loved and trusted by customers around the globe
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative px-8">
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {assets.testimonials.map((t, i) => (
                                <div key={i} className="w-full flex-shrink-0 px-2">
                                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-xl max-w-3xl mx-auto">
                                        {/* Stars */}
                                        <div className="flex items-center gap-1 mb-4 justify-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-amber-500 text-base" />
                                            ))}
                                        </div>

                                        {/* Text */}
                                        <p
                                            className="text-stone-700 text-lg sm:text-xl mb-6 italic text-center leading-relaxed"
                                            style={{ fontFamily: "Playfair Display, serif" }}
                                        >
                                            "{t.text}"
                                        </p>

                                        {/* Profile */}
                                        <div className="flex items-center gap-4 justify-center">
                                            <img
                                                src={t.img}
                                                alt={t.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                                            />
                                            <div className="text-left">
                                                <p
                                                    className="font-bold text-stone-900 text-base"
                                                    style={{ fontFamily: "Playfair Display, serif" }}
                                                >
                                                    {t.name}
                                                </p>
                                                <p className="text-stone-600 text-sm">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev Button */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-10 
                        bg-white shadow-xl rounded-full w-10 h-10 flex items-center justify-center 
                        hover:bg-amber-600 hover:text-white transition-all z-10 border border-amber-200"
                    >
                        <FaChevronLeft className="text-sm" />
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-10 
                        bg-white shadow-xl rounded-full w-10 h-10 flex items-center justify-center 
                        hover:bg-amber-600 hover:text-white transition-all z-10 border border-amber-200"
                    >
                        <FaChevronRight className="text-sm" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {assets.testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === i
                                    ? "bg-amber-600 scale-125"
                                    : "bg-stone-300 hover:bg-stone-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
