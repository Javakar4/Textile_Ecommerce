import React from 'react';

export default function CategoryTable({ categories, products, onEdit, onDeleteClick }) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-[#d4af37]/10 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#031c16]/50 border-b border-emerald-500/10 text-[#d4af37]/75 font-serif font-bold uppercase tracking-wider">
              <th className="py-4.5 px-6">Category Details</th>
              <th className="py-4.5 px-6">Slug</th>
              <th className="py-4.5 px-6">Parent Category</th>
              <th className="py-4.5 px-6">Products Assigned</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {categories.map(c => {
              const parent = categories.find(parentCat => parentCat._id === c.parentId);
              const productCount = products.filter(p => p.categoryId === c._id).length;
              return (
                <tr key={c._id} className="hover:bg-emerald-950/20 transition-all">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt={c.name} className="w-8 h-8 rounded-lg object-cover border border-emerald-500/20" />
                      <span className="font-bold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-emerald-100/50 font-mono text-xs">{c.slug}</td>
                  <td className="py-4 px-6">
                    {parent ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold bg-[#031c16]/60 border border-emerald-500/20 rounded-md text-emerald-200">
                        {parent.name}
                      </span>
                    ) : (
                      <span className="text-emerald-100/30 font-medium text-xs">Root Level</span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold text-white">{productCount} items</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md ${
                      c.isActive 
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-500/10 border border-slate-500/30 text-slate-400'
                    }`}>
                      {c.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2.5">
                    <button 
                      onClick={() => onEdit(c)}
                      className="text-emerald-400 hover:text-emerald-200 transition cursor-pointer text-xs font-semibold"
                    >
                      ✎ Edit
                    </button>
                    <button 
                      onClick={() => onDeleteClick(c)}
                      className="text-rose-400 hover:text-rose-200 transition cursor-pointer text-xs font-semibold"
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
