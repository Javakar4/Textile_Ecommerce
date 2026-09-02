import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { XCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clear } = useCart();
    const [show, setShow] = useState(false);
    const queryClient = useQueryClient();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    const isSuccess = status === "SUCCESS" || status === "PAYMENT_SUCCESS";

    useEffect(() => {
        if (isSuccess) {
            clear();
        }
        // Trigger animation after mount
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, [isSuccess, clear]);

    useEffect(() => {
        if (isSuccess) {
            const redirectTimer = setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["myOrders"] });
                window.location.href = '/my-orders';
            }, 4000);
            return () => clearTimeout(redirectTimer);
        }
    }, [isSuccess, navigate, queryClient]);

    return (
        <div className="payment-callback-overlay">
            <div className={`payment-callback-modal ${show ? 'payment-callback-modal--visible' : ''}`}>
                {isSuccess ? (
                    <>
                        {/* Animated SVG Checkmark */}
                        <div className="payment-tick-container">
                            <svg className="payment-tick-svg" viewBox="0 0 52 52">
                                <circle className="payment-tick-circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="payment-tick-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>

                        <h1 className="payment-callback-title payment-callback-title--success">
                            Payment Successful!
                        </h1>

                        <p className="payment-callback-message">
                            Thank you for your order! Your order
                            {orderId && <span className="payment-callback-orderid"> #{orderId}</span>}
                            {" "}has been placed successfully.
                        </p>

                        <p className="payment-callback-redirect-text">
                            Redirecting to your orders...
                        </p>

                        <div className="payment-callback-progress">
                            <div className="payment-callback-progress-bar"></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`payment-fail-icon ${show ? 'payment-fail-icon--visible' : ''}`}>
                            <XCircle size={80} />
                        </div>

                        <h1 className="payment-callback-title payment-callback-title--fail">
                            Payment Failed
                        </h1>

                        <p className="payment-callback-message">
                            Unfortunately, your payment could not be processed. Please try again or choose a different payment method.
                        </p>
                    </>
                )}

                <div className="payment-callback-actions">
                    <button
                        onClick={() => {
                            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
                            window.location.href = '/my-orders';
                        }}
                        className="payment-callback-btn payment-callback-btn--primary"
                    >
                        View My Orders
                    </button>
                    {!isSuccess && (
                        <button
                            onClick={() => navigate('/cart/checkout', { replace: true })}
                            className="payment-callback-btn payment-callback-btn--secondary"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
