
import { useState } from "react";
import { ChevronRight, Package2, Clock, IndianRupee, MapPin, Phone, ChevronDown } from "lucide-react";

export default function OrderItemCard({ order }) {
    const [showDetails, setShowDetails] = useState(false);

    const getStatusColor = (status) => {
        const colors = {
            Ordered: "from-primaryLight via-primary to-primaryDark",
            Shipping: "from-blue-400 via-blue-500 to-blue-700",
            Delivered: "from-green-400 via-green-500 to-green-700",
        };


        return colors[status] || colors["Ordered"];
    };

    const getPaymentColor = (status) => {
        const colors = {
            "Confirmed": "from-green-500 to-emerald-500",
            "Pending": "from-yellow-500 to-orange-500",
            "Failed": "from-red-500 to-rose-500"
        };
        return colors[status] || colors["Pending"];
    };

    return (
        <div className="w-full relative">
            {/* Decorative gradient bar */}
            <div className={`h-2 w-full rounded-t-3xl bg-gradient-to-r ${getStatusColor(order.trackingStatus)}`} />

            <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* Order Info */}
                        <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${getStatusColor(order.trackingStatus)} shadow-lg`}>
                                <Package2 className="w-6 h-6 text-white" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-2xl font-bold text-gray-900">#{order.orderId || order._id}</h3>
                                    <div className={`px-7 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusColor(order.trackingStatus)} shadow-md`}>
                                        {order.trackingStatus}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Package2 className="w-4 h-4" />
                                        <span>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Total */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getPaymentColor(order.paymentStatus)} shadow-lg`}>
                                <p className="text-xs font-semibold text-white/90 uppercase tracking-wide">Payment</p>
                                <p className="text-sm font-bold text-white">{order.paymentStatus}</p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-500 font-medium mb-1">Total Amount</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-gray-900">${order.total?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 
                               transition-all duration-300 flex items-center justify-center gap-2 text-gray-700 font-semibold
                               border-t border-b border-slate-200 group"
                >
                    <span>{showDetails ? 'Hide Order Details' : 'View Order Details'}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5 ${showDetails ? 'rotate-180' : ''}`} />
                </button>

                {/* Details Section */}
                {showDetails && (
                    <div className="animate-slideDown">
                        {/* Items Grid */}
                        <div className="p-6 md:p-8 bg-white">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                                Order Items
                            </h4>

                            <div className="grid gap-4">
                                {order.items.map((item, index) => (
                                    <div
                                        key={item._id || item.productId || index}
                                        className="group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white 
                                                   rounded-2xl border-2 border-gray-100 hover:border-indigo-200 
                                                   hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white 
                                                          rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                                {item.quantity}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-bold text-gray-900 mb-2 text-lg">{item.name}</h5>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">
                                                    Size: {item.size}
                                                </span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                                                    ${item.pricing?.current?.toFixed(2)} each
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                                            <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 
                                                         bg-clip-text text-transparent">
                                                ${(item.pricing?.current * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white border-t border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                                Delivery Address
                            </h4>

                            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-lg mb-3">
                                            {order.shippingAddress.name}
                                        </p>

                                        <div className="space-y-2 text-gray-700">
                                            <p className="leading-relaxed">{order.shippingAddress.address}</p>
                                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                            {order.shippingAddress.landmark && (
                                                <p className="text-gray-500 italic text-sm">
                                                    Landmark: {order.shippingAddress.landmark}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Phone className="w-4 h-4" />
                                                <span className="font-semibold">{order.shippingAddress.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}