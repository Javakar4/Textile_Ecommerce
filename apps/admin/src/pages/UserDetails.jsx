import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserDetailsQuery } from '../hooks/useUsers';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // React Query Hook
  const { data: res, isLoading, error } = useUserDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center animate-fade-in">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
        <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Fetching user files...</span>
      </div>
    );
  }

  if (error || !res?.data) {
    return (
      <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20 animate-fade-in">
        <span className="text-4xl">⚠️</span>
        <h3 className="text-lg font-bold text-rose-300">User profile missing</h3>
        <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{error?.message || 'Could not find requested user details.'}</p>
        <button 
          onClick={() => navigate('/users')} 
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  const { user, addresses, orders } = res.data;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button and profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/users')}
            className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-[#d4af37] hover:text-white cursor-pointer transition text-xs"
            title="Go Back"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white tracking-tight">{user.username}</h2>
            <p className="text-emerald-100/60 text-xs sm:text-sm mt-0.5">User profile dashboard and activity log</p>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="flex gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            user.status === 'active' 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25' 
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            {user.status}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-[#d4af37] border border-[#d4af37]/25">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card & Info */}
        <div className="lg:col-span-1 space-y-6">
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
        </div>

        {/* Addresses & Orders Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Addresses Section */}
          <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
              <span>📍</span> Saved Addresses
            </h3>
            {addresses.length === 0 ? (
              <p className="text-emerald-100/40 text-xs sm:text-sm py-4 italic">No shipping addresses registered for this user.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div key={addr._id} className="bg-[#031d17]/50 border border-emerald-500/15 rounded-xl p-4 space-y-2 relative">
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 px-1.5 py-0.5 rounded-md font-mono font-bold">
                        Default
                      </span>
                    )}
                    <span className="block text-xs font-bold text-white">{addr.name}</span>
                    <span className="block text-[11px] text-emerald-100/60 leading-tight">
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </span>
                    <span className="block text-[10px] text-emerald-100/40 font-mono mt-1">📞 {addr.phone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders History Section */}
          <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
              <span>🛍️</span> Order History
            </h3>
            {orders.length === 0 ? (
              <p className="text-emerald-100/40 text-xs sm:text-sm py-4 italic">No purchase history recorded for this account.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-500/10 text-[#d4af37]">
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono">Order ID</th>
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono">Date</th>
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono">Total</th>
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono">Payment</th>
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono">Tracking</th>
                      <th className="py-2.5 text-[10px] font-bold uppercase tracking-wider font-mono text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-500/5">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-[#031d17]/20 transition-colors">
                        <td className="py-3 text-xs font-bold text-white font-mono">#{order.orderId}</td>
                        <td className="py-3 text-xs text-emerald-100/60 font-mono">
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="py-3 text-xs font-bold text-white font-mono">₹{order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                            order.paymentStatus === 'Confirmed' || order.paymentStatus === 'Success'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                              : order.paymentStatus === 'Pending'
                                ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/25'
                                : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="text-xs text-emerald-100/80">
                            {order.trackingStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => navigate(`/orders/${order.orderId}`)}
                            className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-300 hover:text-white rounded text-[10px] font-semibold transition cursor-pointer"
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
