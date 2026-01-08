import React from "react";
import CartItem from "../components/CartItem";
import { UseAppContext } from "../context/AppContext";
import { toast } from 'react-toastify';

function CartPage() {
    const { cartItems, setCartItems, navigate, subtotal, totalDiscount, estimatedTax, total, updateCartQuantity } = UseAppContext();

    const handleIncrement = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity < 10
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
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
                            {/* 24-col grid headings */}
                            <CartItem
                                cartItems={cartItems}
                                handleIncrement={(id, size) => updateCartQuantity(id, size, "inc")}
                                handleDecrement={(id, size) => updateCartQuantity(id, size, "dec")}
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
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-green-600">
                        <span>Discount</span>
                        <span>- ${totalDiscount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <span>Estimated Tax</span>
                        <span>${estimatedTax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-base mb-6">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button onClick={() => navigate("/cart/checkout")} className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-600 transition">
                        Proceed to Checkout
                    </button>
                </div>


            </div>

            {/* RELATED PRODUCTS */}
            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-4">
                    You might also like
                </h3>

                {/* 👉 Render your related products slider / grid here */}
                <p className="text-gray-500 text-sm">
                    (Related Products Component Goes Here)
                </p>
            </div>
        </div>
    );
}

export default CartPage;
