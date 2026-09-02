import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import fallbackImageSrc from "../../assets/fallback-image.png";

export default function OrderItemCard({ order }) {
    const getStatusColor = (status) => {
        const colors = {
            Placed: "text-amber-700",
            Packed: "text-blue-600",
            Shipped: "text-orange-500",
            Delivered: "text-green-600",
            Ordered: "text-amber-700",
        };
        return colors[status] || "text-gray-700";
    };

    const getStatusIcon = (status) => {
        const icons = {
            Placed: <Clock className="w-4 h-4" />,
            Packed: <Package className="w-4 h-4" />,
            Shipped: <Truck className="w-4 h-4" />,
            Delivered: <CheckCircle className="w-4 h-4" />,
            Ordered: <Clock className="w-4 h-4" />,
        };
        return icons[status] || null;
    };

    const getPaymentColor = (status) => {
        const colors = {
            Confirmed: "text-green-600 bg-green-50",
            Initiated: "text-amber-700 bg-amber-50",
            Pending: "text-yellow-600 bg-yellow-50",
            Failed: "text-red-600 bg-red-50",
            Refunded: "text-purple-600 bg-purple-50",
            Refund_Failed: "text-red-700 bg-red-50",
        };
        return colors[status] || "text-gray-600 bg-gray-50";
    };

    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = new Date(order.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const fallbackImage = fallbackImageSrc;

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden mb-6 border-l-4 border-l-amber-700 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header Section */}
            <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Order #: {order.orderId || order._id}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {order.items?.length || 0} Products | By {order.shippingAddress?.name || 'Unknown'} | {formattedTime}, {formattedDate}
                        </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase border ${
                        order.trackingStatus === 'Placed' || order.trackingStatus === 'Ordered' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        order.trackingStatus === 'Packed' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                        order.trackingStatus === 'Shipped' ? 'bg-orange-50 border-orange-200 text-orange-500' :
                        order.trackingStatus === 'Delivered' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}>
                        {getStatusIcon(order.trackingStatus)}
                        {order.trackingStatus}
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="border-t border-amber-100" />
            </div>

            {/* Details Section */}
            <div className="p-5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-6">
                    <div className="text-gray-500">Status:</div>
                    <div className={`sm:col-span-3 font-medium flex items-center gap-1.5 ${getStatusColor(order.trackingStatus)}`}>
                        {getStatusIcon(order.trackingStatus)}
                        {order.trackingStatus}
                    </div>

                    <div className="text-gray-500">Payment:</div>
                    <div className="sm:col-span-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                        </span>
                    </div>

                    <div className="text-gray-500">Delivered to:</div>
                    <div className="sm:col-span-3 text-gray-900">
                        {[
                            order.shippingAddress?.address,
                            order.shippingAddress?.city,
                            order.shippingAddress?.state,
                            (order.shippingAddress?.pincode || order.shippingAddress?.zip) ? `PO: ${order.shippingAddress.pincode || order.shippingAddress.zip}` : null,
                        ].filter(Boolean).join(", ")}
                    </div>

                    <div className="font-bold text-gray-900">Total:</div>
                    <div className="sm:col-span-3 font-bold text-amber-800 text-base">
                        ₹ {order.total?.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="border-t border-amber-100" />
            </div>

            {/* Order Items Section */}
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {order.items?.map((item, index) => (
                        <div key={item._id || item.productId || index} className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg bg-amber-50/50 flex-shrink-0 overflow-hidden border border-amber-200 flex items-center justify-center p-2">
                                <img
                                    src={item.image || fallbackImage}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = fallbackImage;
                                    }}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <div className="flex flex-col justify-center text-sm">
                                <h5 className="font-medium text-gray-900 mb-1">{item.name}</h5>
                                {item.quantity && item.pricing?.current && (
                                    <p className="text-gray-500">
                                        Quantity: {item.quantity}x = ₹ {(item.pricing?.current * item.quantity).toFixed(2)}
                                    </p>
                                )}
                                {item.pricing?.current && (
                                    <p className="text-gray-500">
                                        Price: ₹ {item.pricing?.current?.toFixed(2)}
                                    </p>
                                )}
                                {item.size && (
                                    <p className="text-gray-500">
                                        Size: {item.size}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}