import { createContext, useEffect, useState } from "react";
import { useWishlistServices } from "../hooks/useWishlistServices";
import { useAuth } from "../hooks/useAuth";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const { 
        useWishlist, 
        addToWishlist: addToWishlistApi, 
        removeFromWishlist: removeFromWishlistApi,
        isAddingToWishlist,
        isRemovingFromWishlist
    } = useWishlistServices();

    const { data: remoteWishlist, isLoading: isLoadingWishlist } = useWishlist(!!user);
    const [wishlistItems, setWishlistItems] = useState([]);

    // Keep local state in sync with remote data
    useEffect(() => {
        if (user && remoteWishlist) {
            setWishlistItems(remoteWishlist);
        } else if (!user) {
            setWishlistItems([]);
        }
    }, [remoteWishlist, user]);

    const addToWishlist = async (product) => {
        // Optimistic update
        setWishlistItems((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) return prev;
            return [...prev, product];
        });

        const res = await addToWishlistApi(product._id);
        if (!res.ok) {
            // Revert if failed
            setWishlistItems(remoteWishlist || []);
        }
    };

    const removeFromWishlist = async (productId) => {
        // Optimistic update
        setWishlistItems((prev) => prev.filter(item => item._id !== productId));

        const res = await removeFromWishlistApi(productId);
        if (!res.ok) {
            // Revert if failed
            setWishlistItems(remoteWishlist || []);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item._id === productId);
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoadingWishlist,
        isAddingToWishlist,
        isRemovingFromWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};


