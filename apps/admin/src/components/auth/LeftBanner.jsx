import React from 'react';
import emeraldVelvetArt from '../../assets/emerald_velvet_art.png';
import { AUTH_CONSTANTS } from '../../config/constants';

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* Loom threads pattern */}
    <path d="M12 8C12 8 16 20 24 20C32 20 36 8 36 8" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 24C8 24 18 28 24 28C30 28 40 24 40 24" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 40C12 40 16 28 24 28C32 28 36 40 36 40" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
    {/* Vertical needle thread line */}
    <path d="M24 4V44" stroke="url(#goldGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 4" />
    <defs>
      <linearGradient id="goldGradient" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#d4af37" />
      </linearGradient>
    </defs>
  </svg>
);

const LeftBanner = ({ activeFeature, setActiveFeature }) => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-emerald-950 items-center justify-center">
    {/* Background Image with slow hover zoom effect */}
    <img
      src={emeraldVelvetArt}
      alt="Premium Emerald Gold Velvet"
      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[15000ms] hover:scale-105"
    />
    {/* Shading gradients */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#022c22] via-[#022c22]/60 to-transparent"></div>
    <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay"></div>

    {/* Brand Glass Badge */}
    <div className="relative glass rounded-3xl p-10 max-w-md w-11/12 mx-auto shadow-2xl border border-[rgba(212,175,55,0.15)] animate-float text-left z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2.5 bg-emerald-950/70 rounded-2xl border border-[rgba(212,175,55,0.15)] shadow-lg">
          <LogoIcon />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-300 to-yellow-500">
            TEXTILE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Administrator
          </p>
        </div>
      </div>

      <blockquote className="text-emerald-100/90 text-sm leading-relaxed mb-8 italic font-serif">
        "{AUTH_CONSTANTS.BRAND_QUOTE}"
      </blockquote>

      {/* Animated feature rotation indicators */}
      <div className="border-t border-emerald-500/10 pt-6">
        <div className="min-h-[70px]">
          {AUTH_CONSTANTS.ADMIN_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 absolute ${idx === activeFeature
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
            >
              <h4 className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1">
                {feature.title}
              </h4>
              <p className="text-emerald-100/70 text-xs leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Feature carousel indicator dots */}
        <div className="flex gap-2 mt-8">
          {AUTH_CONSTANTS.ADMIN_FEATURES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFeature(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeFeature ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-white/20'
                }`}
              aria-label={`Show slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LeftBanner;
export { LogoIcon };
