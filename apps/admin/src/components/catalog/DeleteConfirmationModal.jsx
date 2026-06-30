import React from 'react';

export default function DeleteConfirmationModal({ isOpen, title, name, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#021813]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass max-w-sm w-full rounded-2xl border border-[#d4af37]/15 overflow-hidden animate-fade-in p-6 space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#d4af37] flex items-center justify-center text-xl mx-auto">
          ?
        </div>
        <div className="text-center space-y-1.5">
          <h4 className="text-white font-serif font-bold text-base">{title}</h4>
          <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed">
            Are you sure you want to permanently delete <strong>"{name}"</strong>?
          </p>
          <p className="text-rose-400/80 text-[10px] uppercase font-bold tracking-wider">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-2 bg-transparent border border-emerald-500/15 hover:border-emerald-500/30 text-emerald-100 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            No, Keep
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-2 bg-rose-700 hover:bg-rose-600 border border-rose-500/20 text-white rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
