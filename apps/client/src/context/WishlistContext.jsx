import { createContext, useEffect, useState } from "react";
import { useWishlistServices } from "../hooks/useWishlistServices";
import { useAuth } from "../hooks/useAuth";
import toastUtils from "../utils/toastUtils";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const { 
        useWishlist, 
        addToWishlist: addToWishlistApi, 
        removeFromWishlist: removeFromWishlistApi,
        clearWishlist: clearWishlistApi,
        isAddingToWishlist,
        isRemovingFromWishlist,
        isClearingWishlist
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
        if (!user) {
            toastUtils.error("Please login to manage your wishlist");
            window.location.href = "/auth";
            return;
        }

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
        if (!user) {
            toastUtils.error("Please login to manage your wishlist");
            window.location.href = "/auth";
            return;
        }

        // Optimistic update
        setWishlistItems((prev) => prev.filter(item => item._id !== productId));

        const res = await removeFromWishlistApi(productId);
        if (!res.ok) {
            // Revert if failed
            setWishlistItems(remoteWishlist || []);
        }
    };

    const clearWishlist = async () => {
        if (!user) {
            toastUtils.error("Please login to manage your wishlist");
            return;
        }

        const prevItems = [...wishlistItems];
        // Optimistic update
        setWishlistItems([]);

        const res = await clearWishlistApi();
        if (!res.ok) {
            // Revert if failed
            setWishlistItems(prevItems);
            toastUtils.error("Failed to clear wishlist");
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item._id === productId);
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        isLoadingWishlist,
        isAddingToWishlist,
        isRemovingFromWishlist,
        isClearingWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
