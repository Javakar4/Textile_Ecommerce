import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderDetailsQuery, useUpdatePaymentStatusMutation, useUpdateTrackingStatusMutation } from '../hooks/useOrders';
import { toast } from 'react-hot-toast';

export default function OrderDetail() {
  const { id } = useParams(); // orderId
  const navigate = useNavigate();
  
  // React Query Hooks
  const { data: res, isLoading, error } = useOrderDetailsQuery(id);
  const order = res?.data;

  // Status Modifiers State
  const [paymentStatus, setPaymentStatus] = useState('');
  const [trackingStatus, setTrackingStatus] = useState('');

  // Sync state with query data when fetched
  useEffect(() => {
    if (order) {
      setPaymentStatus(order.paymentStatus);
      setTrackingStatus(order.trackingStatus);
    }
  }, [order]);

  const updatePaymentMutation = useUpdatePaymentStatusMutation();
  const updateTrackingMutation = useUpdateTrackingStatusMutation();

  const handleUpdatePayment = () => {
    updatePaymentMutation.mutate(
      { orderId: order.orderId, paymentStatus },
      {
        onSuccess: () => {
          toast.success('Payment status updated successfully');
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to update payment status');
        },
      }
    );
  };

  const handleUpdateTracking = () => {
    updateTrackingMutation.mutate(
      { orderId: order.orderId, trackingStatus },
      {
        onSuccess: () => {
          toast.success('Tracking status updated successfully');
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to update tracking status');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center animate-fade-in">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
        <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Retrieving order receipt...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20 animate-fade-in">
        <span className="text-4xl">⚠️</span>
        <h3 className="text-lg font-bold text-rose-300">Order not found</h3>
        <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{error?.message || 'Could not find requested order.'}</p>
        <button 
          onClick={() => navigate('/orders')} 
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
        >
          Return to Orders Board
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button and profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-[#d4af37] hover:text-white cursor-pointer transition text-xs"
            title="Go Back"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white tracking-tight">Order #{order.orderId}</h2>
            <p className="text-emerald-100/60 text-xs sm:text-sm mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex gap-2">
          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
            order.paymentStatus === 'Confirmed' || order.paymentStatus === 'Success'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
              : order.paymentStatus === 'Pending'
                ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/25'
                : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
          }`}>
            💳 {order.paymentStatus}
          </span>
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-[#d4af37] border border-[#d4af37]/25">
            📦 {order.trackingStatus}
          </span>
        </div>
      </div>

      {/* Control Actions (Update Statuses) */}
      <div className="glass rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 border border-[#d4af37]/10">
        {/* Payment Status Dropdown Modifier */}
        <div className="space-y-2">
          <label className="block text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider font-mono">Modify Payment Status</label>
          <div className="flex gap-2.5">
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="flex-1 bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
            <button
              onClick={handleUpdatePayment}
              disabled={updatePaymentMutation.isPending || paymentStatus === order.paymentStatus}
              className="bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-40 disabled:pointer-events-none border border-[#d4af37]/20 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow transition cursor-pointer"
            >
              {updatePaymentMutation.isPending ? 'Updating...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Tracking Status Dropdown Modifier */}
        <div className="space-y-2">
          <label className="block text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider font-mono">Modify Shipment Tracking</label>
          <div className="flex gap-2.5">
            <select
              value={trackingStatus}
              onChange={(e) => setTrackingStatus(e.target.value)}
              className="flex-1 bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="Ordered">Ordered</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              onClick={handleUpdateTracking}
              disabled={updateTrackingMutation.isPending || trackingStatus === order.trackingStatus}
              className="bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-40 disabled:pointer-events-none border border-[#d4af37]/20 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow transition cursor-pointer"
            >
              {updateTrackingMutation.isPending ? 'Updating...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
              <span>🛍️</span> Ordered Fabrics & Apparel
            </h3>
            
            <div className="divide-y divide-emerald-500/5">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center gap-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl bg-emerald-950 border border-emerald-500/10 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1544022613-e87ca75a784a'} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <div className="flex items-center gap-2.5 text-xs text-emerald-100/60 font-mono mt-1">
                      <span>Size: <strong className="text-white">{item.size}</strong></span>
                      <span>•</span>
                      <span>Qty: <strong className="text-white">{item.quantity || item.qty || 1}</strong></span>
                      <span>•</span>
                      <span>Price: <strong className="text-white">₹{(item.pricing?.current || item.price || 0).toFixed(2)}</strong></span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="block text-xs font-bold text-white font-mono">₹{((item.pricing?.current || item.price || 0) * (item.quantity || item.qty || 1)).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Summary */}
            <div className="border-t border-[#d4af37]/15 pt-4 space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between text-xs text-emerald-100/60">
                <span>Subtotal</span>
                <span className="font-mono">₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-100/60">
                <span>Shipping Delivery</span>
                <span className="text-emerald-400 font-semibold font-mono">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-emerald-500/10 pt-2">
                <span>Grand Total</span>
                <span className="text-[#d4af37] font-mono">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Shipping & Billing Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Shipping Address */}
          <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
              <span>📍</span> Shipping Address
            </h3>
            
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="block font-bold text-white">{order.shippingAddress.name}</span>
              <span className="block text-emerald-100/70 leading-relaxed">
                {order.shippingAddress.address}
              </span>
              <span className="block text-emerald-100/70">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </span>
              <span className="block font-mono text-[#d4af37] mt-3">
                📞 {order.shippingAddress.phone}
              </span>
            </div>
          </div>

          {/* Payment Method details */}
          <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
              <span>💳</span> Payment Information
            </h3>
            
            <div className="space-y-2">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#d4af37]/70 font-semibold font-mono">Payment Mode</span>
                <span className="text-xs text-white">{order.paymentMethod || 'PhonePe / Gateway'}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#d4af37]/70 font-semibold font-mono">Payment Status</span>
                <span className="text-xs text-white font-mono">{order.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
