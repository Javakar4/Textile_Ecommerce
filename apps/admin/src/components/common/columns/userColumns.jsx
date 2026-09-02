import React from 'react';

export const getUserColumns = ({ onStatusToggle, onRoleChange, onNavigateDetails }) => [
  {
    header: 'User Info',
    accessorKey: 'username',
    cell: ({ row }) => {
      const user = row.original;
      return (
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
      );
    }
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === 'active' 
            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25' 
            : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {status}
        </span>
      );
    }
  },
  {
    header: 'Verification',
    accessorKey: 'isEmailVerified',
    cell: ({ getValue }) => {
      const isEmailVerified = getValue();
      return (
        <span className={`text-xs ${isEmailVerified ? 'text-emerald-400 font-semibold' : 'text-emerald-100/40'}`}>
          {isEmailVerified ? 'Verified ✓' : 'Pending Verification'}
        </span>
      );
    }
  },
  {
    header: 'Access Level',
    accessorKey: 'role',
    cell: ({ row, getValue }) => {
      const user = row.original;
      const role = getValue();
      return (
        <select
          value={role}
          onChange={(e) => onRoleChange(user._id, e.target.value)}
          className="bg-[#031c16]/70 border border-emerald-500/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      );
    }
  },
  {
    header: 'Registered',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => {
      const createdAt = getValue();
      return (
        <span className="text-xs text-emerald-100/60 font-mono">
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      );
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="text-right space-x-2 whitespace-nowrap">
          <button
            onClick={() => onStatusToggle(user._id, user.status)}
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
            onClick={() => onNavigateDetails(user._id)}
            className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900/60 border border-[#d4af37]/20 text-[#d4af37] hover:text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer"
          >
            Details
          </button>
        </div>
      );
    }
  }
];
