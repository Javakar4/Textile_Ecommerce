import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useProfileServices } from "../hooks/useProfileServices";
import { useOrderServices } from "../hooks/useOrderServices";
import { useState, useEffect } from "react";
import toastUtils from "../utils/toastUtils";
import fallbackImage from "../assets/fallback-image.png";

const getSafeImgSrc = (url) => {
    if (!url || url.includes('placehold.co') || url.includes('via.placeholder.com') || url.includes('dummyimage.com')) {
        return fallbackImage;
    }
    return url;
};

export default function CheckoutPage() {
    const { addresses, isLoadingProfile } = useProfileServices();
    const { createOrder, isCreatingOrder } = useOrderServices();
    const { cartItems, subtotal, totalDiscount, estimatedTax, total, clear } = useCart();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("Online");

    // Filter out invalid/empty addresses from the list if any
    const validAddresses = addresses || [];

    // Check if selected address is fully filled
    const selectedComplete = () => {
        const addr = validAddresses[selectedIndex];
        return addr?.name && addr?.phone && addr?.address && addr?.city && addr?.state && addr?.pincode;
    };

    const handlePlaceOrder = async () => {
        if (!selectedComplete()) {
            toastUtils.error("Please complete the selected shipping address.");
            return;
        }

        const selectedAddress = validAddresses[selectedIndex];

        // Map items to backend schema
        const orderItems = cartItems.map(item => ({
            productId: item.productId || item._id, // Handle different ID fields
            name: item.name,
            quantity: item.quantity,
            size: item.size || "M", // Default size if missing
            image: item.image,
            pricing: {
                current: item.pricing?.current || item.price,
                original: item.pricing?.original || item.price,
                discount: (item.pricing?.original || item.price) - (item.pricing?.current || item.price)
            }
        }));

        const orderData = {
            items: orderItems,
            total,
            paymentMethod: paymentMethod,
            shippingAddress: {
                name: selectedAddress.name,
                phone: selectedAddress.phone,
                address: selectedAddress.address,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.pincode || selectedAddress.zip
            }
        };

        try {
            const res = await createOrder(orderData);
            if (res.ok || res.success) {
                // Determine if there is a redirect URL for online payment
                if (res.redirectUrl) {
                    window.location.href = res.redirectUrl;
                } else {
                    clear();
                    navigate(`/my-orders`);
                }
            }
        } catch (error) {
            console.error("Order placement failed:", error);
        }
    };

    if (isLoadingProfile) {
        return <div className="min-h-screen flex items-center justify-center">Loading checkout...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-20 px-4 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 overflow-hidden">
            {/* LEFT — Shipping Section */}
            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Shipping Address</h2>
                
                {validAddresses.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200 text-center">
                        <p className="text-gray-600 mb-4">No addresses found in your profile.</p>
                        <button 
                            onClick={() => navigate('/profile')}
                            className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition"
                        >
                            Add Address in Profile
                        </button>
                    </div>
                ) : (
                    validAddresses.map((addr, index) => (
                        <div
                            key={addr._id || index}
                            className={`bg-white rounded-2xl shadow-lg p-6 border transition-all ${
                                selectedIndex === index ? "border-amber-700 ring-2 ring-amber-100" : "border-gray-200"
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        checked={selectedIndex === index}
                                        onChange={() => setSelectedIndex(index)}
                                        className="accent-amber-900 w-5 h-5"
                                    />
                                    <h2 className="text-xl font-semibold text-amber-700">
                                        {addr.isDefault ? "Default Address" : `Address ${index + 1}`}
                                    </h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                                <p><span className="font-medium">Name:</span> {addr.name}</p>
                                <p><span className="font-medium">Phone:</span> {addr.phone}</p>
                                <p className="md:col-span-2"><span className="font-medium">Address:</span> {addr.address}</p>
                                {addr.landmark && <p className="md:col-span-2"><span className="font-medium">Landmark:</span> {addr.landmark}</p>}
                                <p><span className="font-medium">City:</span> {addr.city}</p>
                                <p><span className="font-medium">State:</span> {addr.state}</p>
                                <p><span className="font-medium">Pincode:</span> {addr.pincode || addr.zip}</p>
                                <p><span className="font-medium">Country:</span> {addr.country || "India"}</p>
                            </div>
                        </div>
                    ))
                )}

                <button
                    onClick={() => navigate('/profile')}
                    className="border border-dashed border-amber-700 text-amber-900 rounded-lg py-3 w-full mt-4 hover:bg-amber-50 transition font-medium"
                >
                    + Manage Addresses
                </button>
            </div>

            {/* RIGHT — Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit lg:sticky lg:top-24">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

                <div className="space-y-4 text-sm mb-4 max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map((i) => (
                        <div key={i.id || i._id} className="flex gap-3">
                            <img src={getSafeImgSrc(i.image)} alt={i.name} className="w-12 h-12 rounded object-cover bg-gray-100" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }} />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 line-clamp-1">{i.name}</p>
                                <p className="text-gray-500">{i.quantity} × ₹{(i.pricing?.current || i.price).toFixed(2)}</p>
                            </div>
                            <span className="text-gray-700 font-medium">
                                ₹{((i.pricing?.current || i.price) * i.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-700">
                        <span>Subtotal</span>
                        <span>₹{subtotal?.toFixed(2)}</span>
                    </div>

                    {totalDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>- ₹{totalDiscount?.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Estimated Tax</span>
                        <span>₹{estimatedTax?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t text-gray-900">
                        <span>Total</span>
                        <span>₹{total?.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Payment Method</p>
                    <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Online' ? 'bg-amber-50 border-amber-500' : 'bg-white border-gray-200'}`}>
                        <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="Online" 
                            checked={paymentMethod === 'Online'} 
                            onChange={() => setPaymentMethod('Online')}
                            className="accent-amber-700 w-5 h-5"
                        />
                        <span className="text-gray-800 font-medium">Online Payment (UPI/Cards)</span>
                    </label>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedComplete() || isCreatingOrder || cartItems.length === 0}
                    className={`w-full py-3 sm:py-4 rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg mt-4
                        ${selectedComplete() && !isCreatingOrder && cartItems.length > 0
                            ? "bg-amber-700 text-white hover:bg-amber-800 hover:shadow-xl transform hover:-translate-y-0.5"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                >
                    {isCreatingOrder ? "Placing Order..." : "Confirm & Place Order"}
                </button>
            </div>
        </div>
    );
}
