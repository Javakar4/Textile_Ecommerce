import { UseAppContext } from "../context/AppContext";
import OrderItemCard from "../components/OrderItemCard";

export default function OrdersPage() {
    const { orderItems } = UseAppContext();

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
            {orderItems.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                    <p className="text-gray-500 text-sm">
                        You haven’t placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orderItems
                        .slice()
                        .reverse()
                        .map((order) => (
                            <OrderItemCard
                                key={order.id}
                                order={order}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
