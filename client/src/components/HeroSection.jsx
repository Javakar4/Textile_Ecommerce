import React, { useEffect } from "react";
import assets from "../assets/assets";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
    useEffect(() => {
        const particleContainer = document.getElementById("fabricParticles");
        if (!particleContainer) return;

        particleContainer.innerHTML = "";
        const particleCount = 25;

        const shapes = [
            '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.3"/><circle cx="12" cy="12" r="6" opacity="0.5"/><circle cx="12" cy="12" r="3"/></svg>',
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" opacity="0.4"/></svg>',
            '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" opacity="0.3"/><rect x="7" y="7" width="10" height="10" rx="1" opacity="0.5"/></svg>',
            '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,12 12,22 2,12" opacity="0.4"/></svg>',
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" opacity="0.3"/></svg>'
        ];

        const colors = ["#b45309", "#d97706", "#f59e0b", "#78350f", "#92400e", "#a16207"];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            const size = Math.random() * 50 + 30;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = Math.random() * 20 + 12;
            const delay = Math.random() * 8;
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.className = "fabric-particle";
            particle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        color: ${color};
        left: ${startX}%;
        top: ${startY}%;
        opacity: 0.25;
        animation: floatFabric ${duration}s ease-in-out ${delay}s infinite alternate;
        filter: drop-shadow(0 0 ${size / 4}px ${color});
      `;

            particleContainer.appendChild(particle);
        }
    }, []);

    return (
        <>
            {/* Animations */}
            <style>{`
        @keyframes floatFabric {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          20% { transform: translate(50px, -60px) rotate(60deg) scale(1.2); opacity: 0.35; }
          40% { transform: translate(-30px, -120px) rotate(120deg) scale(0.8); opacity: 0.15; }
          60% { transform: translate(-70px, -90px) rotate(180deg) scale(1.1); opacity: 0.3; }
          80% { transform: translate(40px, -140px) rotate(240deg) scale(0.9); opacity: 0.2; }
        }

        .shirt-shape { clip-path: polygon(20% 0%, 80% 0%, 90% 15%, 100% 20%, 100% 100%, 0% 100%, 0% 20%, 10% 15%); }
        .clip-shirt-img { clip-path: inset(0 round 12px); }

        @keyframes fadeSlide {
          0% { opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes ropeSwing {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          50% { transform: translateX(-50%) rotate(4deg); }
        }

        @keyframes tagFloat {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-6px) rotate(-3deg); }
        }

        @keyframes shirtWind {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.2deg); }
          75% { transform: rotate(-0.8deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes clothFlutter {
          0% { transform: translateX(0) skewX(0deg); }
          25% { transform: translateX(-3px) skewX(1deg); }
          50% { transform: translateX(3px) skewX(-1.5deg); }
          75% { transform: translateX(-2px) skewX(1deg); }
          100% { transform: translateX(0) skewX(0deg); }
        }

        .animate-shirtWind { animation: shirtWind 4.5s ease-in-out infinite; transform-origin: top center; }
        .animate-clothFlutter { animation: clothFlutter 3.2s ease-in-out infinite; }
      `}</style>

            {/* HERO SECTION */}
            <section id="hero" className="relative h-auto p-16 overflow-hidden flex items-center">
                <div id="fabricParticles" className="absolute inset-0 z-0 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* TEXT */}
                        <div className="text-center lg:text-left space-y-4">
                            <span className="text-amber-700 bg-amber-100 px-4 py-2 rounded-full text-[12px] font-semibold tracking-widest uppercase inline-block">Crafted with Excellence</span>

                            <h1 className="text-5xl sm:text-6xl font-bold text-stone-900 leading-tight font-serif">
                                Where Threads <br />
                                <span className="text-amber-700">Tell Stories</span>
                            </h1>

                            <p className="text-xl text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Experience the finest collection of premium textiles, meticulously woven to perfection.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <NavLink to='/products' className="group bg-amber-700 text-white px-10 py-3 rounded-full font-semibold hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3">
                                    Explore Collections
                                </NavLink>

                                <NavLink to='/contact' className="bg-white text-amber-700 px-10 py-3 rounded-full font-semibold border-2 border-amber-700 hover:bg-amber-50 transition-all duration-300 hover:scale-105">
                                    Contact Us
                                </NavLink>
                            </div>

                            {/* STATS */}
                            <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                                {["25+", "5000+", "100%"].map((value, i) => (
                                    <React.Fragment key={i}>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-stone-900 font-serif">{value}</p>
                                            <p className="text-sm text-stone-600">
                                                {i === 0 ? "Years Experience" : i === 1 ? "Happy Customers" : "Quality Assured"}
                                            </p>
                                        </div>
                                        {i < 2 && <div className="w-px h-10 bg-stone-300"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* IMAGE + ANIMATIONS */}
                        <div className="relative max-w-[500px] mx-auto py-8 select-none">
                            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-1 h-10 bg-amber-700 rounded-full animate-ropeSwing"></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl text-amber-700">☉</div>

                            <div className="relative mt-4 animate-shirtWind">
                                <div className="shirt-shape bg-white/30 backdrop-blur-xl border-4 border-amber-700/50 shadow-xl w-[260px] sm:w-[380px] md:w-[420px] mx-auto pt-10 pb-6 px-6 rounded-[40px]">

                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-amber-700/70 rounded-b-3xl shadow-md"></div>

                                    <div className="clip-shirt-img relative overflow-hidden w-48 h-48 sm:w-56 sm:h-56 mx-auto mt-4 rounded-xl border-4 border-amber-500/50 shadow-xl animate-clothFlutter">

                                        {[assets.heroImage1, assets.heroImage2, assets.heroImage3, assets.heroImage4].map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                className="absolute inset-0 w-full h-full object-cover opacity-0 slideshow-img"
                                                style={{ animation: `fadeSlide 12s infinite ${i * 3}s` }}
                                            />
                                        ))}
                                    </div>

                                    <h3 className="text-2xl font-extrabold text-stone-900 text-center mt-5 tracking-wide">
                                        Premium Wear Collection
                                    </h3>
                                    <p className="text-stone-700 text-center mt-1">Trendy | Unique | Stylish</p>
                                </div>

                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg rotate-[-5deg] animate-tagFloat">
                                    NEW ARRIVALS
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
