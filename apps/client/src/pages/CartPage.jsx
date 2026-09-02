import React from "react";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


function CartPage() {
    const navigate = useNavigate();
    const { cartItems, setCart, subtotal, totalDiscount, estimatedTax, total, updateItem, removeFromCart } = useCart();

    const handleIncrement = (id) => {
        const item = cartItems.find(i => (i._id || i.id) === id);
        if (item && item.quantity < 10) {
            updateItem(id, item.quantity + 1);
        }
    };

    const handleDecrement = (id) => {
        const item = cartItems.find(i => (i._id || i.id) === id);
        if (item && item.quantity > 1) {
            updateItem(id, item.quantity - 1);
        }
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        toast.success("Item deleted from cart!");
    };

    return (
        <div className="mt-20 p-6 space-y-10">

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* CART TABLE (65%) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">

                    <h2 className="text-3xl font-bold text-amber-700">Shopping Cart</h2>

                    {cartItems.length > 0 ? (
                        <>
                            <CartItem
                                cartItems={cartItems}
                                handleIncrement={(id, size) => {
                                    const item = cartItems.find(i => (i._id || i.id) === id && i.size === size);
                                    if(item) updateItem(id, item.quantity + 1);
                                }}
                                handleDecrement={(id, size) => {
                                    const item = cartItems.find(i => (i._id || i.id) === id && i.size === size);
                                    if(item) updateItem(id, Math.max(1, item.quantity - 1));
                                }}
                                handleRemove={handleRemove}
                            />
                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-10">
                            Your cart is empty.
                        </p>
                    )}
                </div>


                {/* CHECKOUT (35%) */}
                <div className="bg-white rounded-xl shadow p-4 h-fit sticky top-24">
                    <h3 className="text-lg font-semibold mb-4 text-amber-700">Order Summary</h3>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-green-600">
                        <span>Discount</span>
                        <span>- ₹{totalDiscount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <span>Estimated Tax</span>
                        <span>₹{estimatedTax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-base mb-6">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>

                    <button 
                        onClick={() => navigate("/cart/checkout")} 
                        disabled={cartItems.length === 0}
                        className={`w-full py-3 rounded-lg transition font-medium ${
                            cartItems.length > 0 
                                ? "bg-amber-800 text-white hover:bg-amber-600 shadow-sm" 
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Proceed to Checkout
                    </button>
                </div>


            </div>

            {/* RELATED PRODUCTS */}
            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-4">
                    You might also like
                </h3>

                <p className="text-gray-500 text-sm">
                    (Related Products Component Goes Here)
                </p>
            </div>
        </div>
    );
}

export default CartPage;
