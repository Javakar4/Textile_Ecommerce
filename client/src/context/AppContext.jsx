import { createContext, useContext, useState } from "react";
import assets from '../assets/assets'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(true);
    const products = assets.productData;
    const mensCollection = products.filter(product => product.category === 'MC');
    const kidsCollection = products.filter(product => product.category === 'KC');
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    // console.log(cartItems);
    const [addresses, setAddresses] = useState([
        {
            name: "",
            phone: "",
            address: "",
            landmark: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
    ]);

    const subtotal = cartItems.reduce(
        (s, i) => s + i.pricing.original * i.quantity,
        0
    );

    const totalDiscount = cartItems.reduce(
        (s, i) =>
            s + (i.pricing.original - i.pricing.current) * i.quantity,
        0
    );

    // simple category-based tax rule
    const taxRate = (category) => {
        switch (category) {
            case "KC":
                return 0.08; // 8% clothing
            default:
                return 0.05; // 5% fallback
        }
    };

    const estimatedTax = cartItems.reduce(
        (s, i) =>
            s +
            (i.pricing.current * i.quantity) *
            taxRate(i.category || i.Category),
        0
    );

    const total = subtotal - totalDiscount + estimatedTax;


    const updateCartQuantity = (productId, size, type) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === productId && item.size === size) {
                    const newQty =
                        type === "inc"
                            ? Math.min(item.quantity + 1, 20)
                            : Math.max(item.quantity - 1, 1);

                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };




    const addToCart = (productData, selectedSize, quantity) => {
        // if (!showUserLogin) {
        //     navigate("/login");
        //     return;
        // }

        setCartItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.id === productData.id && item.size === selectedSize
            );

            // If item exists → increase quantity
            if (existingIndex !== -1) {
                const updatedCart = [...prev];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + quantity,
                };
                return updatedCart;
            }

            // Else → add new item
            return [
                ...prev,
                {
                    id: productData.id,
                    name: productData.name,
                    category: productData.category,
                    pricing: productData.pricing,
                    image: productData.images?.main || "",
                    size: selectedSize,
                    quantity,
                },
            ];
        });
    };


    const addOrderItem = (order) => {
        setOrderItems((prevOrders) => [...prevOrders, order]);
    };
    console.log(orderItems)


    const clearCart = () => {
        setCartItems([]);
    };



    const value = {
        user, setUser, admin, setAdmin, showUserLogin, setShowUserLogin,
        assets, products, mensCollection, kidsCollection, cartItems, setCartItems, addToCart, updateCartQuantity,
        subtotal, totalDiscount, estimatedTax, total, addOrderItem, orderItems, clearCart,
        addresses, setAddresses,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const UseAppContext = () => {
    return useContext(AppContext);
};
