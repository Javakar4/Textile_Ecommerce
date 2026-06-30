import React from 'react';

export const getUserOrdersColumns = ({ onViewOrder }) => [
  {
    header: 'Order ID',
    accessorKey: 'orderId',
    cell: ({ getValue }) => <span className="text-xs font-bold text-white font-mono">#{getValue()}</span>
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => (
      <span className="text-xs text-emerald-100/60 font-mono">
        {new Date(getValue()).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </span>
    )
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({ getValue }) => <span className="text-xs font-bold text-white font-mono">₹{getValue().toFixed(2)}</span>
  },
  {
    header: 'Payment Mode',
    accessorKey: 'paymentStatus',
    cell: ({ getValue }) => {
      const paymentStatus = getValue();
      return (
        <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
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
    header: 'Tracking',
    accessorKey: 'trackingStatus',
    cell: ({ getValue }) => <span className="text-xs text-emerald-100/80">{getValue()}</span>
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-right">
          <button
            onClick={() => onViewOrder(order.orderId)}
            className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-300 hover:text-white rounded text-[10px] font-semibold transition cursor-pointer"
          >
            View Order
          </button>
        </div>
      );
    }
  }
];
