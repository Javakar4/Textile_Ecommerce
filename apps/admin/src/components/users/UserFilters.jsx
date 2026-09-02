import React from 'react';

export default function UserFilters({ 
  search, 
  setSearch, 
  roleFilter, 
  setRoleFilter, 
  statusFilter, 
  setStatusFilter 
}) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
      <div className="relative w-full md:w-80">
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username or email..."
          className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40 text-sm select-none">🔍</span>
      </div>

      <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
        <div className="flex flex-col w-1/2 sm:w-auto">
          <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Role</label>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col w-1/2 sm:w-auto">
          <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive / Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}
