import { useOrderServices } from "../hooks/useOrderServices";
import OrderItemCard from "../components/profile/OrderItemCard";

export default function OrdersPage() {
    const { useMyOrders } = useOrderServices();
    const { data: orderItems, isLoading, isError, error } = useMyOrders();

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 mt-20 min-h-[60vh] flex items-center justify-center">
                <div className="text-gray-500 animate-pulse font-medium text-lg">Fetching your orders...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 mt-20 min-h-[60vh] flex items-center justify-center">
                <div className="text-red-500 font-medium">Error: {error.message || "Failed to load orders"}</div>
            </div>
        );
    }

    const orders = orderItems || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 mt-20 min-h-[100vh]">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    My Orders
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Track and view your order history
                </p>
            </div>

            {/* Empty State */}
            {orders.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
                    <p className="text-gray-500 text-sm">
                        You haven’t placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderItemCard
                            key={order._id || order.orderId}
                            order={order}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
