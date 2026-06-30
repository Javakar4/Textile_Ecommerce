import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersQuery, useUpdateUserStatusMutation, useUpdateUserRoleMutation } from '../hooks/useUsers';
import { toast } from 'react-hot-toast';

export default function ManageUsers() {
  const navigate = useNavigate();

  // Filter States
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // React Query Hook
  const { data: res, isLoading, error, refetch } = useUsersQuery({
    search,
    role: roleFilter,
    status: statusFilter,
  });

  const updateStatusMutation = useUpdateUserStatusMutation();
  const updateRoleMutation = useUpdateUserRoleMutation();

  const users = res?.data || [];

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateStatusMutation.mutate(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${newStatus}`);
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to update status');
        },
      }
    );
  };

  const handleRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate(
      { userId, role: newRole },
      {
        onSuccess: () => {
          toast.success(`User role updated to ${newRole}`);
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to update role');
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white tracking-tight">User Management</h2>
          <p className="text-emerald-100/60 text-xs sm:text-sm mt-1">Review registrations, manage authorization levels, and suspend accounts</p>
        </div>
      </div>

      {/* Filter and Search Controls */}
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

      {/* Main Users Table */}
      {isLoading ? (
        <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
          <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Loading users registry...</span>
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-300">Failed to load registry</h3>
          <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{error.message}</p>
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
          >
            Retry Fetch
          </button>
        </div>
      ) : users.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl">
          <span className="text-4xl">👥</span>
          <h3 className="text-lg font-bold text-white">No registered users found</h3>
          <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">No accounts matched your criteria. Adjust filters or search strings.</p>
        </div>
      ) : (
        <div className="glass rounded-2xl shadow-xl overflow-hidden border border-emerald-500/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#03201a] border-b border-[#d4af37]/15">
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">User Info</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Status</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Verification</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Access Level</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Registered</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-[#031d17]/40 transition-colors">
                    {/* User profile identifier */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-[#d4af37]/20 flex items-center justify-center font-bold text-sm text-[#d4af37] shadow-inner select-none overflow-hidden flex-shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            user.username ? user.username.charAt(0).toUpperCase() : 'U'
                          )}
                        </div>
                        <div>
                          <span className="block text-xs sm:text-sm font-bold text-white leading-tight">{user.username}</span>
                          <span className="block text-[10px] sm:text-xs text-emerald-100/60 font-mono mt-0.5">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Account status */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25' 
                          : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {user.status}
                      </span>
                    </td>

                    {/* Email Verification */}
                    <td className="py-4 px-6">
                      <span className={`text-xs ${user.isEmailVerified ? 'text-emerald-400 font-semibold' : 'text-emerald-100/40'}`}>
                        {user.isEmailVerified ? 'Verified ✓' : 'Pending Verification'}
                      </span>
                    </td>

                    {/* Role dropdown modifier */}
                    <td className="py-4 px-6">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-[#031c16]/70 border border-emerald-500/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Date Registered */}
                    <td className="py-4 px-6 text-xs text-emerald-100/60 font-mono">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleStatusToggle(user._id, user.status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          user.status === 'active' 
                            ? 'bg-rose-950/40 border border-rose-500/20 text-rose-300 hover:bg-rose-900/40' 
                            : 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/40'
                        }`}
                        title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button
                        onClick={() => navigate(`/users/${user._id}`)}
                        className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900/60 border border-[#d4af37]/20 text-[#d4af37] hover:text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
