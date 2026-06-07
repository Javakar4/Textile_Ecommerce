import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartItem({ cartItems, handleIncrement, handleDecrement, handleRemove }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 py-10 flex flex-col justify-between">
                {/* Make table scrollable on small screens */}
                <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-500/20">
                    <table className="table-auto w-full min-w-[600px]">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Size</th>
                                <th className="px-4 py-3 font-semibold truncate">Price</th>
                                <th className="px-4 py-3 font-semibold truncate">Quantity</th>
                                <th className="px-4 py-3 font-semibold truncate">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-stone-700">
                            {cartItems.map((item) => (
                                <tr key={`${item.id}-${item.size}`} className="border-t border-gray-500/20">
                                    {/* Product cell */}
                                    <td className="px-4 py-3 flex items-center space-x-3 truncate">
                                        <div
                                            className="border border-gray-300 rounded cursor-pointer"
                                            onClick={() => navigate(`/collection-detail/${item.id}`)}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 md:w-32 md:h-32 object-cover"
                                            />
                                        </div>

                                        {/* Hide details on mobile, show from sm and up */}
                                        <div className="hidden sm:flex flex-col">
                                            <span className="truncate font-medium">{item.name}</span>
                                            <span className="text-xs text-gray-400">
                                                <s>${item.pricing?.original?.toFixed(2)}</s>
                                                <span className="text-green-600 ml-1">${item.pricing?.current?.toFixed(2)}</span>
                                            </span>
                                            <span className="text-xs text-amber-700">
                                                Save ${item.pricing?.savings?.toFixed(2)} ({item.pricing?.discount}%)
                                            </span>
                                        </div>
                                    </td>


                                    {/* Size */}
                                    <td className="px-4 py-3">{item.size}</td>

                                    {/* Price */}
                                    <td className="px-4 py-3">${item.pricing?.current?.toFixed(2)}</td>

                                    {/* Quantity controls */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDecrement(item.id, item.size)}
                                                disabled={item.quantity === 1}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrement(item.id, item.size)}
                                                disabled={item.quantity === 10}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </td>

                                    {/* Delete button */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
