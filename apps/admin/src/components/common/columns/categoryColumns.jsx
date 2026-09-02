import React from 'react';

export const getCategoryColumns = ({ categories, products, onEdit, onDeleteClick }) => [
  {
    header: 'Category Details',
    accessorKey: 'name',
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-3">
          <img src={c.image} alt={c.name} className="w-8 h-8 rounded-lg object-cover border border-emerald-500/20" />
          <span className="font-bold text-white">{c.name}</span>
        </div>
      );
    }
  },
  {
    header: 'Slug',
    accessorKey: 'slug',
    cell: ({ getValue }) => <span className="text-emerald-100/50 font-mono text-xs">{getValue()}</span>
  },
  {
    header: 'Parent Category',
    accessorKey: 'parentId',
    cell: ({ getValue }) => {
      const pId = getValue();
      const parent = categories.find(parentCat => parentCat._id === pId);
      return parent ? (
        <span className="px-2.5 py-1 text-[10px] font-bold bg-[#031c16]/60 border border-emerald-500/20 rounded-md text-emerald-200">
          {parent.name}
        </span>
      ) : (
        <span className="text-emerald-100/30 font-medium text-xs">Root Level</span>
      );
    }
  },
  {
    header: 'Products Assigned',
    id: 'productCount',
    cell: ({ row }) => {
      const c = row.original;
      const count = products.filter(p => p.categoryId === c._id).length;
      return <span className="font-bold text-white">{count} items</span>;
    }
  },
  {
    header: 'Status',
    accessorKey: 'isActive',
    cell: ({ getValue }) => {
      const isActive = getValue();
      return (
        <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md ${
          isActive 
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
            : 'bg-slate-500/10 border border-slate-500/30 text-slate-400'
        }`}>
          {isActive ? 'Active' : 'Draft'}
        </span>
      );
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="text-right space-x-2.5">
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
        </div>
      );
    }
  }
];
