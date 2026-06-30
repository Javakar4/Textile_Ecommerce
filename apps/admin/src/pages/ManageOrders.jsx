import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrdersQuery } from '../hooks/useOrders';

export default function ManageOrders() {
  const navigate = useNavigate();

  // Filters State
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [trackingFilter, setTrackingFilter] = useState('all');

  // React Query Hook
  const { data: res, isLoading, error, refetch } = useOrdersQuery({
    search,
    paymentStatus: paymentFilter,
    trackingStatus: trackingFilter,
  });

  const orders = res?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white tracking-tight">Order Lifecycle Management</h2>
          <p className="text-emerald-100/60 text-xs sm:text-sm mt-1">Monitor billing confirmations, process updates, and adjust tracking workflows</p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID or customer name..."
            className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40 text-sm select-none">🔍</span>
        </div>

        <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
          <div className="flex flex-col w-1/2 sm:w-auto">
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Payment Status</label>
            <select 
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2 sm:w-auto">
            <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Tracking Status</label>
            <select 
              value={trackingFilter}
              onChange={(e) => setTrackingFilter(e.target.value)}
              className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="all">All Tracking Statuses</option>
              <option value="Ordered">Ordered</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Orders Table */}
      {isLoading ? (
        <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
          <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Loading orders database...</span>
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-300">Failed to load orders</h3>
          <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{error.message}</p>
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
          >
            Retry Fetch
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl">
          <span className="text-4xl">📦</span>
          <h3 className="text-lg font-bold text-white">No e-commerce orders found</h3>
          <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">No orders match your criteria. Try adjusting the search query or status filters.</p>
        </div>
      ) : (
        <div className="glass rounded-2xl shadow-xl overflow-hidden border border-emerald-500/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#03201a] border-b border-[#d4af37]/15">
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Order ID</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Date</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Customer Details</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Total</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Payment Status</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono">Tracking Status</th>
                  <th className="py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] font-mono text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-[#031d17]/40 transition-colors">
                    {/* Order ID Link */}
                    <td className="py-4 px-6 text-xs sm:text-sm font-bold text-white font-mono">
                      #{order.orderId}
                    </td>

                    {/* Creation Date */}
                    <td className="py-4 px-6 text-xs text-emerald-100/60 font-mono">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                          {order.shippingAddress?.name || 'Guest User'}
                        </span>
                        <span className="block text-[10px] text-emerald-100/60 font-mono mt-0.5">
                          {order.userId?.email || 'N/A'}
                        </span>
                      </div>
                    </td>

                    {/* Order Total Price */}
                    <td className="py-4 px-6 text-xs sm:text-sm font-bold text-white font-mono">
                      ₹{order.total.toFixed(2)}
                    </td>

                    {/* Payment Status Badging */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        order.paymentStatus === 'Confirmed' || order.paymentStatus === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                          : order.paymentStatus === 'Pending'
                            ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/25'
                            : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Tracking Status Info */}
                    <td className="py-4 px-6 text-xs text-emerald-100/80">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.trackingStatus === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : order.trackingStatus === 'Shipped'
                            ? 'bg-sky-500/10 text-sky-300'
                            : 'bg-yellow-500/10 text-yellow-300'
                      }`}>
                        {order.trackingStatus}
                      </span>
                    </td>

                    {/* View Details Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                        className="px-3.5 py-2 bg-emerald-950/80 hover:bg-emerald-900/60 border border-[#d4af37]/20 text-[#d4af37] hover:text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
                      >
                        Inspect Details
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
