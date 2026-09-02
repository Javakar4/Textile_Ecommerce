import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import wishlistService from "../services/wishlistService";
import toastUtils from "../utils/toastUtils";

export const useWishlistServices = () => {
  const queryClient = useQueryClient();

  // -- GET ALL WISHLIST ITEMS (for context / isInWishlist checks) --
  const useWishlist = (enabled = true) =>
    useQuery({
      queryKey: ["wishlist"],
      queryFn: async () => {
        const response = await wishlistService.getAllWishlistIds();
        if (!response.ok) {
          throw new Error(response.message);
        }

        // Extract the actual product objects from the wishlist document
        const wishlistData = response.data?.data || response.data || {};
        const productsArr = wishlistData.products || [];

        return productsArr.map(item => item.productId).filter(Boolean);
      },
      enabled,
    });

  // -- INFINITE SCROLL WISHLIST (for WishlistPage) --
  const useInfiniteWishlist = (enabled = true) =>
    useInfiniteQuery({
      queryKey: ["wishlist", "infinite"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await wishlistService.getWishlist({ page: pageParam, limit: 8 });
        if (!response.ok) {
          throw new Error(response.message);
        }

        const wishlistData = response.data?.data || response.data || {};
        const productsArr = wishlistData.products || [];

        return {
          products: productsArr.map(item => item.productId).filter(Boolean),
          page: wishlistData.page || pageParam,
          totalPages: wishlistData.totalPages || 0,
          totalItems: wishlistData.totalItems || 0,
        };
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.page || !lastPage.totalPages) return undefined;
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      enabled,
    });

  // -- ADD TO WISHLIST MUTATION --
  const addToWishlistMutation = useMutation({
    mutationFn: (productId) => wishlistService.addToWishlist(productId),
    onSuccess: (res) => {
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
  });

  // -- REMOVE FROM WISHLIST MUTATION --
  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId) => wishlistService.removeFromWishlist(productId),
    onSuccess: (res) => {
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
  });

  // -- CLEAR WISHLIST MUTATION --
  const clearWishlistMutation = useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: (res) => {
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
  });

  return {
    // Hooks for data
    useWishlist,
    useInfiniteWishlist,

    // Mutations
    addToWishlist: addToWishlistMutation.mutateAsync,
    removeFromWishlist: removeFromWishlistMutation.mutateAsync,
    clearWishlist: clearWishlistMutation.mutateAsync,

    // Loading states
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
  };
};
