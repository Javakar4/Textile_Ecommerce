import React, { useState } from 'react';
import {constants} from "@config/constants";

function CartPage() {
    const [cartItems, setCartItems] = useState(constants.cartMock);

    const increaseQuantity = (index) => {
        const updated = [...cartItems];
        updated[index].quantity++;
        setCartItems(updated);
    };

    const decreaseQuantity = (index) => {
        const updated = [...cartItems];
        if (updated[index].quantity > 1) {
            updated[index].quantity--;
            setCartItems(updated);
        }
    };

    const removeItem = (index) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        setCartItems(updated);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 8.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gray-50 min-h-screen pt-26">
            {/* Progress Indicator */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                        <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-900 text-white flex items-center justify-center font-semibold text-sm sm:text-base">
                                1
                            </div>
                            <span className="ml-2 text-sm sm:text-base font-semibold text-gray-900">Shopping Cart</span>
                        </div>
                        <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold text-sm sm:text-base">
                                2
                            </div>
                            <span className="ml-2 text-sm sm:text-base text-gray-600 hidden sm:inline">Checkout</span>
                        </div>
                        <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold text-sm sm:text-base">
                                3
                            </div>
                            <span className="ml-2 text-sm sm:text-base text-gray-600 hidden sm:inline">Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                            <span className="text-gray-600">{cartItems.length} Items</span>
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="w-full sm:w-32 h-32 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                                                    </div>
                                                    <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-900 transition-colors ml-4">
                                                        <i className="fas fa-times text-xl"></i>
                                                    </button>
                                                </div>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <p>
                                                        Color: <span className="font-medium text-gray-900">{item.color}</span>
                                                    </p>
                                                    <p>
                                                        Material: <span className="font-medium text-gray-900">{item.material}</span>
                                                    </p>
                                                    <p>
                                                        Pattern: <span className="font-medium text-gray-900">{item.pattern}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button onClick={() => decreaseQuantity(index)} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                                                        <i className="fas fa-minus text-sm text-gray-600"></i>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        readOnly
                                                        className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                                                        min="1"
                                                    />
                                                    <button onClick={() => increaseQuantity(index)} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                                                        <i className="fas fa-plus text-sm text-gray-600"></i>
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} per yard</p>
                                                    <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                            <a href="#" className="inline-flex items-center text-red-900 font-semibold hover:text-red-800 transition-colors">
                                <i className="fas fa-arrow-left mr-2"></i>
                                <span>Continue Shopping</span>
                            </a>
                        </div>

                        {/* Recommended Products */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Recommended Product Example */}
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 group cursor-pointer">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image.replace('w=200&h=200', 'w=400&h=300')} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{item.material}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}/yd</span>
                                                <button className="text-red-900 hover:text-red-800 transition-colors">
                                                    <i className="fas fa-plus-circle text-xl"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 lg:sticky lg:top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent text-sm"
                                    />
                                    <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-sm transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Estimated Tax</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full bg-red-900 hover:bg-red-800 text-white py-4 rounded-lg font-bold text-lg transition-colors mb-4">
                                Proceed to Checkout
                            </button>

                            {/* Trust Badges */}
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-lock text-green-600"></i>
                                    <span>Secure SSL Encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-truck text-blue-600"></i>
                                    <span>Free shipping on orders over $100</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-undo text-red-900"></i>
                                    <span>30-day return policy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-gray-700"></i>
                                    <span>100% satisfaction guarantee</span>
                                </div>
                            </div>

                            {/* Delivery Estimate */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-calendar-alt text-red-900 mt-1"></i>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm mb-1">Estimated Delivery</p>
                                        <p className="text-sm text-gray-600">3-5 business days for standard shipping</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-600 text-center mb-3">We Accept</p>
                                <div className="flex justify-center items-center gap-3">
                                    <i className="fab fa-cc-visa text-3xl text-gray-700"></i>
                                    <i className="fab fa-cc-mastercard text-3xl text-gray-700"></i>
                                    <i className="fab fa-cc-amex text-3xl text-gray-700"></i>
                                    <i className="fab fa-cc-paypal text-3xl text-gray-700"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
