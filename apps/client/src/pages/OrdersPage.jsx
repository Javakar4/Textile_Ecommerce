import { useState, useRef, useEffect, useCallback } from "react";
import { useOrderServices } from "../hooks/useOrderServices";
import OrderItemCard from "../components/profile/OrderItemCard";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
    const { useMyOrders } = useOrderServices();
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useMyOrders();

    const [activeTab, setActiveTab] = useState("All orders");
    const observerRef = useRef(null);
    const loadMoreRef = useRef(null);

    // Intersection Observer for infinite scroll
    const handleObserver = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "200px",
            threshold: 0,
        });

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver]);

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 mt-20 min-h-[60vh] flex items-center justify-center">
                <div className="flex items-center gap-3 text-amber-700">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="font-medium text-lg">Fetching your orders...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 mt-20 min-h-[60vh] flex items-center justify-center">
                <div className="text-red-500 font-medium">Error: {error.message || "Failed to load orders"}</div>
            </div>
        );
    }

    // Flatten all pages into a single orders array
    const allOrders = data?.pages?.flatMap((page) => page.orders) || [];

    const filteredOrders = allOrders.filter((order) => {
        if (activeTab === "Active") {
            return order.trackingStatus !== "Delivered";
        }
        if (activeTab === "Delivered") {
            return order.trackingStatus === "Delivered";
        }
        if (activeTab === "Payment Pending") {
            return order.paymentStatus !== "Confirmed";
        }
        return true; // "All orders"
    });

    const tabs = ["All orders", "Active", "Delivered", "Payment Pending"];

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 mt-20 min-h-[100vh]">
            {/* Page Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                        My Orders
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track and view your order history
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex space-x-2 border-b border-amber-100 pb-3">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                            activeTab === tab
                                ? "bg-amber-700 text-white shadow-md"
                                : "text-gray-500 hover:text-amber-700 hover:bg-amber-50"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && !isFetchingNextPage ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
                    <p className="text-gray-500 text-sm">
                        No orders found for the selected filter.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <OrderItemCard
                            key={order._id || order.orderId}
                            order={order}
                        />
                    ))}
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={loadMoreRef} className="py-6 flex justify-center">
                {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-amber-700">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-medium">Loading more orders...</span>
                    </div>
                )}
                {!hasNextPage && allOrders.length > 0 && (
                    <p className="text-sm text-gray-400">You've reached the end of your orders</p>
                )}
            </div>
        </div>
    );
}
