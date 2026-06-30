import React from 'react';

export const getOrderColumns = ({ onInspectDetails }) => [
  {
    header: 'Order ID',
    accessorKey: 'orderId',
    cell: ({ getValue }) => <span className="text-xs sm:text-sm font-bold text-white font-mono">#{getValue()}</span>
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => (
      <span className="text-xs text-emerald-100/60 font-mono">
        {new Date(getValue()).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </span>
    )
  },
  {
    header: 'Customer Details',
    accessorKey: 'shippingAddress.name',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
            {order.shippingAddress?.name || 'Guest User'}
          </span>
          <span className="block text-[10px] text-emerald-100/60 font-mono mt-0.5">
            {order.userId?.email || 'N/A'}
          </span>
        </div>
      );
    }
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({ getValue }) => <span className="text-xs sm:text-sm font-bold text-white font-mono">₹{getValue().toFixed(2)}</span>
  },
  {
    header: 'Payment Status',
    accessorKey: 'paymentStatus',
    cell: ({ getValue }) => {
      const paymentStatus = getValue();
      return (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
          paymentStatus === 'Confirmed' || paymentStatus === 'Success'
            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
            : paymentStatus === 'Pending'
              ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/25'
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
        }`}>
          {paymentStatus}
        </span>
      );
    }
  },
  {
    header: 'Tracking Status',
    accessorKey: 'trackingStatus',
    cell: ({ getValue }) => {
      const trackingStatus = getValue();
      return (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          trackingStatus === 'Delivered'
            ? 'bg-emerald-500/10 text-emerald-300'
            : trackingStatus === 'Shipped'
              ? 'bg-sky-500/10 text-sky-300'
              : 'bg-yellow-500/10 text-yellow-300'
        }`}>
          {trackingStatus}
        </span>
      );
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-right">
          <button
            onClick={() => onInspectDetails(order.orderId)}
            className="px-3.5 py-2 bg-emerald-950/80 hover:bg-emerald-900/60 border border-[#d4af37]/20 text-[#d4af37] hover:text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
          >
            Inspect Details
          </button>
        </div>
      );
    }
  }
];
