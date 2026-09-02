import React from 'react';

export default function ProductFormModal({
  isOpen,
  productForm,
  setProductForm,
  editingProduct,
  products,
  categories,
  formErrors,
  onSubmit,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#021813]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass max-w-xl w-full rounded-2xl border border-[#d4af37]/15 overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-600 via-[#d4af37] to-teal-800"></div>

        <div className="p-6 border-b border-emerald-500/10 flex justify-between items-center">
          <h3 className="font-serif text-lg font-bold text-white">
            {editingProduct ? `Edit Product: ${editingProduct.productId}` : 'Create New Product'}
          </h3>
          <button
            onClick={onClose}
            className="text-emerald-100/50 hover:text-white transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Product Name</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="e.g. Mulberry Silk Fabric"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              {formErrors.name && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.name}</span>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">SKU Code</label>
              <input
                type="text"
                value={productForm.sku}
                onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                placeholder="e.g. SILK-MUL-100"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              {formErrors.sku && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.sku}</span>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Current Sale Price ($/yd)</label>
              <input
                type="number"
                step="0.01"
                value={productForm.currentPrice}
                onChange={(e) => setProductForm({ ...productForm, currentPrice: e.target.value })}
                placeholder="120.00"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              {formErrors.currentPrice && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.currentPrice}</span>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Original Price ($/yd)</label>
              <input
                type="number"
                step="0.01"
                value={productForm.originalPrice}
                onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                placeholder="150.00"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              {formErrors.originalPrice && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.originalPrice}</span>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Stock Quantity (yards)</label>
              <input
                type="number"
                value={productForm.quantity}
                onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                placeholder="50"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              {formErrors.quantity && <span className="text-rose-400 text-[10px] block mt-1">{formErrors.quantity}</span>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Category Assignment</label>
              <select
                value={productForm.categoryId}
                onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                className="w-full bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Material Composition</label>
              <input
                type="text"
                value={productForm.material}
                onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                placeholder="e.g. 100% Mulberry Silk"
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Image URL</label>
              <input
                type="text"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider block mb-1">Product Description Points</label>
              <div className="space-y-2">
                {productForm.descriptionPoints.map((point, index) => (
                  <input
                    key={index}
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...productForm.descriptionPoints];
                      newPoints[index] = e.target.value;
                      setProductForm({ ...productForm, descriptionPoints: newPoints });
                    }}
                    placeholder={`Description detail line ${index + 1}`}
                    className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setProductForm({
                    ...productForm,
                    descriptionPoints: [...productForm.descriptionPoints, '']
                  })}
                  className="text-[#d4af37] hover:text-[#f59e0b] text-[11px] font-semibold transition cursor-pointer"
                >
                  + Add detail point
                </button>
              </div>
            </div>
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
