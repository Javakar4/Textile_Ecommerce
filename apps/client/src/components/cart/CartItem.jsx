import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../assets/fallback-image.png";

export default function CartItem({ cartItems, handleIncrement, handleDecrement, handleRemove }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 py-4 sm:py-6 flex flex-col gap-4">
            {cartItems.map((item) => {
                const itemId = item._id || item.id;
                return (
                <div key={`${itemId}-${item.size}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    
                    {/* Product Image & Details */}
                    <div className="flex gap-4 w-full sm:w-auto flex-1">
                        {/* Image */}
                        <div
                            className="border border-gray-100 rounded-xl cursor-pointer flex-shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center"
                            onClick={() => navigate(`/collection-detail/${itemId}`)}
                        >
                            <img
                                src={item.image || fallbackImage}
                                alt={item.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = fallbackImage;
                                }}
                            />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 justify-center py-1">
                            <span className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 pr-4">{item.name}</span>
                            
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] font-semibold tracking-wide border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded-[4px] uppercase">
                                    Size: {item.size}
                                </span>
                            </div>
                            
                            <div className="flex flex-col mt-2.5">
                                <div className="flex items-end gap-2">
                                    <span className="text-base font-extrabold text-gray-900 leading-none">₹{item.pricing?.current?.toFixed(2)}</span>
                                    {item.pricing?.original > item.pricing?.current && (
                                        <span className="text-xs font-medium text-gray-400 line-through leading-none">₹{item.pricing?.original?.toFixed(2)}</span>
                                    )}
                                </div>
                                {item.pricing?.discount > 0 && (
                                    <span className="text-[10px] font-bold tracking-wide text-green-600 mt-1 uppercase">
                                        Save ₹{item.pricing?.savings?.toFixed(2)} ({item.pricing?.discount}%)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quantity & Delete Actions */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest sm:hidden">Qty</span>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                                <button
                                    onClick={() => handleDecrement(itemId, item.size)}
                                    disabled={item.quantity === 1}
                                    className="px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg disabled:opacity-40 transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrement(itemId, item.size)}
                                    disabled={item.quantity === 10}
                                    className="px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg disabled:opacity-40 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleRemove(itemId)}
                            className="group relative inline-flex items-center text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-400 hover:text-rose-600 transition-colors duration-400 ease-out"
                            title="Remove from Cart"
                        >
                            <span className="relative pb-1">
                                Remove
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-300 group-hover:bg-transparent transition-colors duration-300"></span>
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-rose-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                            </span>
                        </button>
                        
                    </div>
                </div>
            )})}
        </div>
    );
}
