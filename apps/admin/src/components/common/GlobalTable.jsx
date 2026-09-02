import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function GlobalTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="glass rounded-2xl overflow-hidden border border-[#d4af37]/10 shadow-xl animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr 
                key={headerGroup.id} 
                className="bg-[#031c16]/50 border-b border-emerald-500/10 text-[#d4af37]/75 font-serif font-bold uppercase tracking-wider"
              >
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="py-4.5 px-6">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                className="hover:bg-emerald-950/20 transition-all"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-4 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
