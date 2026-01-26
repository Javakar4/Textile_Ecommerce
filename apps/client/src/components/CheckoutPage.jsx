import { useNavigate } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";
import { useState } from "react";

export default function CheckoutPage() {
    const { cartItems, setCartItems, subtotal, totalDiscount, estimatedTax, total, addOrderItem, clearCart, addresses, setAddresses } = UseAppContext();
    const navigate = useNavigate();


    const [selectedIndex, setSelectedIndex] = useState(0); // Index of selected shipping address

    // Check if selected address is fully filled (required fields)
    const selectedComplete = () => {
        const addr = addresses[selectedIndex];
        return addr?.name && addr?.phone && addr?.address && addr?.city && addr?.state && addr?.zip;
    };

    const handleChange = (index, e) => {
        const copy = [...addresses];
        copy[index][e.target.name] = e.target.value;
        setAddresses(copy);
    };

    const addNewAddress = () => {
        if (!selectedComplete()) return;
        if (addresses.length >= 2) return; // Limit to 2 addresses
        setAddresses([
            ...addresses,
            { name: "", phone: "", address: "", landmark: "", city: "", state: "", zip: "", country: "" },
        ]);
        setSelectedIndex(addresses.length); // Auto-select new address
    };

    const saveAddress = (index) => {
        const addr = addresses[index];
        if (!addr.name || !addr.phone || !addr.address || !addr.city || !addr.state || !addr.zip) {
            alert("Please fill all required fields before saving.");
            return;
        }
        alert(`Address ${index === 0 ? "Primary" : index} saved successfully!`);
    };

    const removeAddress = (index) => {
        if (index === 0) return; // Cannot remove primary
        const copy = addresses.filter((_, i) => i !== index);
        setAddresses(copy);
        if (selectedIndex === index) setSelectedIndex(0); // Reset selection if removed
    };

    const handlePlaceOrder = () => {
        if (!selectedComplete()) {
            alert("Please complete the selected shipping address.");
            return;
        }

        const selectedAddress = addresses[selectedIndex];

        const newOrder = {
            id: Date.now(),

            // Order data
            items: cartItems,
            shippingAddress: selectedAddress,
            total,

            // ✅ Order status
            trackingStatus: "Ordered",     // Ordered | Shipping | Delivered
            paymentStatus: "Confirmed",    // Confirmed | Failed | Pending

            // Meta
            createdAt: new Date().toISOString(),
        };

        // ✅ Save order
        addOrderItem(newOrder);

        // ✅ Clear cart
        clearCart();

        // ✅ Navigate after everything is done
        // navigate(`/order-success/${newOrder.id}`);
        navigate(`/my-orders`);
    };



    return (
        <div className="max-w-5xl mx-auto mt-20 px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT — Shipping Section */}
            <div className="lg:col-span-2 space-y-8">
                {addresses.map((addr, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    checked={selectedIndex === index}
                                    onChange={() => setSelectedIndex(index)}
                                    className="accent-amber-900 w-5 h-5"
                                />
                                <h2 className="text-xl font-semibold text-amber-700">
                                    {index === 0 ? "Shipping Address" : `Additional Address ${index}`}
                                </h2>
                            </div>
                            {index === 0 ? (
                                <span className="text-sm text-gray-500">Required</span>
                            ) : (
                                <button
                                    onClick={() => removeAddress(index)}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="name"
                                    value={addr.name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="phone"
                                    value={addr.phone}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="+1 234 567 890"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={addr.address}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="123 Main St"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Near Famous Area / Landmark
                                </label>
                                <input
                                    name="landmark"
                                    value={addr.landmark}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="Near Central Park"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="city"
                                    value={addr.city}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="New York"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="state"
                                    value={addr.state}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="NY"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    ZIP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="zip"
                                    value={addr.zip}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="10001"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Country
                                </label>
                                <input
                                    name="country"
                                    value={addr.country}
                                    onChange={(e) => handleChange(index, e)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    placeholder="USA"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => saveAddress(index)}
                            className="mt-6 w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-900 transition font-medium"
                        >
                            Save / Update Address
                        </button>
                    </div>
                ))}

                {/* Add New Address */}
                <button
                    onClick={addNewAddress}
                    disabled={addresses.length >= 2 || !selectedComplete()}
                    className={`border border-dashed rounded-lg py-3 w-full mt-4 transition
                        ${addresses.length < 2 && selectedComplete()
                            ? "hover:bg-gray-50 cursor-pointer"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    + Add New Address
                </button>

                {addresses.length >= 2 && (
                    <p className="text-xs text-gray-500 mt-2">
                        Maximum of 2 addresses allowed.
                    </p>
                )}
            </div>

            {/* RIGHT — Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

                <div className="space-y-2 text-sm mb-4">
                    {cartItems.map((i) => (
                        <div key={i.id} className="flex justify-between">
                            <span className="text-gray-700">
                                {i.name} × {i.quantity}
                            </span>
                            <span className="text-gray-700">${(i.pricing.original * i.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-sm mb-2 text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-green-600 mb-2">
                    <span>Discount</span>
                    <span>- ${totalDiscount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm mb-4 text-gray-500">
                    <span>Estimated Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-base mb-6 text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedComplete()}
                    className={`w-full py-3 rounded-lg transition font-medium
                        ${selectedComplete()
                            ? "bg-amber-700 text-white hover:bg-amber-900"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
