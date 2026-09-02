import React from 'react';

export default function CategoryFormModal({
  isOpen,
  categoryForm,
  setCategoryForm,
  editingCategory,
  categories,
  formErrors,
  onSubmit,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#021813]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass max-w-md w-full rounded-2xl border border-[#d4af37]/15 overflow-hidden animate-fade-in flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-700 via-[#d4af37] to-teal-800"></div>

        <div className="p-6 border-b border-emerald-500/10 flex justify-between items-center">
          <h3 className="font-serif text-lg font-bold text-white">
            {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
          </h3>
          <button 
            onClick={onClose}
            className="text-emerald-100/50 hover:text-white transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Category Name</label>
            <input 
              type="text" 
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
              placeholder="e.g. Organic Hemp"
              className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              required
            />
            {formErrors.name && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.name}</span>}
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Slug (optional)</label>
            <input 
              type="text" 
              value={categoryForm.slug}
              onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
              placeholder="e.g. organic-hemp"
              className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
            />
            {formErrors.slug && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.slug}</span>}
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Parent Category</label>
            <select 
              value={categoryForm.parentId}
              onChange={(e) => setCategoryForm({...categoryForm, parentId: e.target.value})}
              className="w-full bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="">None (Root Category)</option>
              {categories
                .filter(c => !editingCategory || c._id !== editingCategory._id) // Prevent self-referencing
                .map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Image URL</label>
            <input 
              type="text" 
              value={categoryForm.image}
              onChange={(e) => setCategoryForm({...categoryForm, image: e.target.value})}
              placeholder="https://..."
              className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input 
              type="checkbox" 
              checked={categoryForm.isActive}
              onChange={(e) => setCategoryForm({...categoryForm, isActive: e.target.checked})}
              id="isActive"
              className="rounded border-emerald-500/20 bg-emerald-950/40 text-emerald-600 focus:ring-0 focus:ring-offset-0 h-[18px] w-[18px] cursor-pointer"
            />
            <label htmlFor="isActive" className="text-emerald-100/70 text-xs sm:text-sm select-none cursor-pointer">
              Activate Category immediately
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-emerald-500/10">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-transparent border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-100 hover:text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-emerald-700 to-teal-800 border border-[#d4af37]/25 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
