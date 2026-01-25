import React from 'react';

/**
 * A premium, full-screen loader component aligned with the brand's amber theme.
 */
const Loader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
            {/* Main Spinner */}
            <div className="relative w-20 h-20">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-amber-700/20 rounded-full"></div>
                {/* Spinning Segment */}
                <div className="absolute inset-0 border-4 border-t-amber-700 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            {/* Pulsing Brand Text */}
            <div className="mt-8 flex flex-col items-center">
                <h2 className="text-2xl font-extrabold tracking-widest text-amber-700 uppercase animate-pulse select-none">
                    Textile
                </h2>
                <div className="mt-2 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce"></span>
                </div>
            </div>
            
            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#b45309_0.5px,transparent_0.5px)] [background-size:16px_16px]"></div>
        </div>
    );
};

export default Loader;
