import React from 'react';

export default function SafeguardModal({ safeguardModal, onClose }) {
  if (!safeguardModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#021813]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass max-w-sm w-full rounded-2xl border border-rose-500/20 overflow-hidden animate-fade-in p-6 space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl mx-auto">
          ⚠
        </div>
        <div className="text-center space-y-2">
          <h4 className="text-white font-serif font-bold text-base">Deletion Blocked</h4>
          <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed">
            Category <strong>"{safeguardModal.categoryName}"</strong> cannot be deleted because it contains <strong>{safeguardModal.count}</strong> products.
          </p>
          <p className="text-rose-300/80 text-[11px] leading-relaxed">
            Please reassign or delete these products first to preserve catalog relationships.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-full py-2 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-500/25 rounded-xl text-xs sm:text-sm font-bold text-white transition cursor-pointer"
        >
          Understand
        </button>
      </div>
    </div>
  );
}
