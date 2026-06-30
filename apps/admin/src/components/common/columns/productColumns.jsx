import React from 'react';

export const getProductColumns = ({ categories, onEdit, onDelete }) => [
  {
    header: 'Product details',
    accessorKey: 'name',
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="flex items-center gap-3">
          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-emerald-500/20" />
          <div>
            <span className="font-bold text-white block">{p.name}</span>
            <span className="text-[10px] text-emerald-100/50">{p.material}</span>
          </div>
        </div>
      );
    }
  },
  {
    header: 'SKU',
    accessorKey: 'sku',
    cell: ({ getValue }) => <span className="text-emerald-100/50 font-mono text-xs">{getValue()}</span>
  },
  {
    header: 'Category',
    accessorKey: 'categoryId',
    cell: ({ getValue }) => {
      const catId = getValue();
      const cat = categories.find(c => c._id === catId);
      return (
        <span className="px-2.5 py-1 text-[10px] font-bold bg-[#031c16]/60 border border-emerald-500/20 rounded-md text-[#d4af37]">
          {cat ? cat.name : "Uncategorized"}
        </span>
      );
    }
  },
  {
    header: 'Pricing',
    accessorKey: 'pricing.current',
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-white">${p.pricing.current}/yd</span>
          {p.pricing.discount > 0 && (
            <span className="text-[10px] text-emerald-100/40 line-through">${p.pricing.original}</span>
          )}
        </div>
      );
    }
  },
  {
    header: 'Stock Status',
    accessorKey: 'stock.quantity',
    cell: ({ getValue }) => {
      const qty = getValue();
      return (
        <span className={`font-semibold ${qty > 10 ? 'text-emerald-400' : qty > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
          {qty} yards
        </span>
      );
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="text-right space-x-2.5 whitespace-nowrap">
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
        </div>
      );
    }
  }
];
