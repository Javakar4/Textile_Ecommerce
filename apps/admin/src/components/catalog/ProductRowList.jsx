import React from 'react';

import { CAT_CONSTANTS } from '../../config/constants';

export default function ProductRowList({ filteredProducts, categories, onEdit, onDelete }) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-[#d4af37]/10 shadow-xl animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#031c16]/50 border-b border-emerald-500/10 text-[#d4af37]/75 font-serif font-bold uppercase tracking-wider">
              <th className="py-4.5 px-6">Product details</th>
              <th className="py-4.5 px-6">SKU</th>
              <th className="py-4.5 px-6">Category</th>
              <th className="py-4.5 px-6">Pricing</th>
              <th className="py-4.5 px-6">Stock Status</th>
              <th className="py-4.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {filteredProducts.map(p => {
              const cat = categories.find(c => c._id === p.categoryId);
              return (
                <tr key={p._id} className="hover:bg-emerald-950/20 transition-all">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
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
                            className="w-10 h-10 rounded-lg object-cover border border-emerald-500/20" 
                          />
                        );
                      })()}
                      <div>
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-emerald-100/50">{p.material}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-emerald-100/50 font-mono text-xs">{p.sku}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-[#031c16]/60 border border-emerald-500/20 rounded-md text-[#d4af37]">
                      {cat ? cat.name : "Uncategorized"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">${p.pricing.current}/yd</span>
                      {p.pricing.discount > 0 && (
                        <span className="text-[10px] text-emerald-100/40 line-through">${p.pricing.original}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${p.stock.quantity > 10 ? 'text-emerald-400' : p.stock.quantity > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {p.stock.quantity} yards
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2.5 whitespace-nowrap">
                    <button 
                      onClick={() => onEdit(p)}
                      className="text-emerald-400 hover:text-emerald-200 transition cursor-pointer text-xs font-semibold"
                      title="Edit"
                    >
                      ✎ Edit
                    </button>
                    <button 
                      onClick={() => onDelete(p)}
                      className="text-rose-400 hover:text-rose-200 transition cursor-pointer text-xs font-semibold"
                      title="Delete"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
