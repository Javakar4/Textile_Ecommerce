import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CheckCircle, XCircle } from "lucide-react";

export default function PaymentCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clear } = useCart();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    const isSuccess = status === "SUCCESS" || status === "PAYMENT_SUCCESS";

    useEffect(() => {
        if (isSuccess) {
            clear(); // Clear cart on successful order
        }
    }, [isSuccess, clear]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all">
                {isSuccess ? (
                    <div className="animate-bounce mb-6 flex justify-center">
                        <CheckCircle className="w-24 h-24 text-green-500" />
                    </div>
                ) : (
                    <div className="animate-pulse mb-6 flex justify-center">
                        <XCircle className="w-24 h-24 text-red-500" />
                    </div>
                )}
                
                <h1 className={`text-3xl font-extrabold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    Payment {isSuccess ? 'Successful!' : 'Failed'}
                </h1>
                
                <p className="text-gray-600 mb-8 text-lg">
                    {isSuccess 
                        ? `Thank you for your order. Your order #${orderId || ''} has been placed successfully.`
                        : "Unfortunately, your payment could not be processed. Please try again or choose a different payment method."
                    }
                </p>

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => navigate('/my-orders')}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                    >
                        View My Orders
                    </button>
                    {!isSuccess && (
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
