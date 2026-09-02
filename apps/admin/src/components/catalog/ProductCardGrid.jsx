import React from 'react';
import { CAT_CONSTANTS } from '../../config/constants';

export default function ProductCardGrid({ filteredProducts, categories, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(p => {
        const cat = categories.find(c => c._id === p.categoryId);
        return (
          <div key={p._id} className="glass rounded-2xl overflow-hidden border border-[#d4af37]/10 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 relative group animate-fade-in">
            {/* Top category label badge */}
            <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/25 rounded-md text-[#d4af37]">
              {cat ? cat.name : "Uncategorized"}
            </span>

            {/* Image container */}
            <div className="h-44 w-full bg-[#031c16]/60 overflow-hidden relative border-b border-emerald-500/10">
              {(() => {
                let imgSrc = p.images?.main || p.image;
                if (!imgSrc || imgSrc.includes('placehold.co') || imgSrc.includes('via.placeholder.com') || imgSrc.includes('dummyimage.com')) {
                  imgSrc = CAT_CONSTANTS.MOCK_IMAGES.silk;
                }
                return (
                  <img 
                    src={imgSrc} 
                    alt={p.name} 
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = CAT_CONSTANTS.MOCK_IMAGES.silk; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                );
              })()}
              {p.stock.quantity === 0 && (
                <div className="absolute inset-0 bg-[#022c22]/80 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest font-bold text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg bg-rose-950/50">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Info body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-100/40 font-mono">{p.sku}</span>
                <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1">{p.name}</h3>
                <p className="text-[11px] text-emerald-100/60 line-clamp-2 leading-relaxed">
                  {p.description[0] || "No description provided."}
                </p>
              </div>

              <div className="flex items-end justify-between pt-2">
                <div>
                  <span className="text-[10px] text-[#d4af37]/60 block uppercase font-medium tracking-wide">Pricing</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">${p.pricing.current}/yd</span>
                    {p.pricing.discount > 0 && (
                      <span className="text-[10px] text-emerald-100/40 line-through">${p.pricing.original}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#d4af37]/60 block uppercase font-medium tracking-wide">Stock</span>
                  <span className={`text-[11px] font-semibold ${p.stock.quantity > 10 ? 'text-emerald-400' : p.stock.quantity > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {p.stock.quantity} yards
                  </span>
                </div>
              </div>

              {/* Actions block */}
              <div className="flex items-center gap-2 pt-2 border-t border-emerald-500/10">
                <button 
                  onClick={() => onEdit(p)}
                  className="flex-1 bg-emerald-950/40 border border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/70 text-emerald-100 hover:text-white py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  ✎ Edit
                </button>
                <button 
                  onClick={() => onDelete(p)}
                  className="bg-rose-950/20 hover:bg-rose-950/50 border border-rose-500/10 hover:border-rose-500/30 text-rose-300 hover:text-rose-100 p-1.5 rounded-lg transition cursor-pointer"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
