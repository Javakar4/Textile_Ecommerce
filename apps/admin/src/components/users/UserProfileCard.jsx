import React from 'react';

export default function UserProfileCard({ user }) {
  return (
    <div className="glass rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-[#d4af37]/20 flex items-center justify-center font-bold text-2xl text-[#d4af37] shadow-inner select-none overflow-hidden mb-4">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            user.username ? user.username.charAt(0).toUpperCase() : 'U'
          )}
        </div>
        <h3 className="text-lg font-bold text-white leading-tight">{user.fullName || user.username}</h3>
        <span className="text-xs text-emerald-100/60 font-mono mt-1">{user.email}</span>
      </div>

      <div className="border-t border-emerald-500/10 pt-4 space-y-4">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#d4af37]/70 font-semibold font-mono">Verified Status</span>
          <span className={`text-xs ${user.isEmailVerified ? 'text-emerald-400 font-semibold' : 'text-[#d4af37]'}`}>
            {user.isEmailVerified ? 'Verified Account ✓' : 'Email Verification Pending'}
          </span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#d4af37]/70 font-semibold font-mono">Phone Contact</span>
          <span className="text-xs text-white font-mono">{user.phone || 'No phone recorded'}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#d4af37]/70 font-semibold font-mono">Date Registered</span>
          <span className="text-xs text-emerald-100/60 font-mono">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
