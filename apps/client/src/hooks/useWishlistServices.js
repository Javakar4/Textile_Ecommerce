import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import wishlistService from "../services/wishlistService";
import { toast } from "react-toastify";

export const useWishlistServices = () => {
  const queryClient = useQueryClient();

  // -- GET WISHLIST QUERY --
  const useWishlist = (enabled = true) =>
    useQuery({
      queryKey: ["wishlist"],
      queryFn: async () => {
        const response = await wishlistService.getWishlist();
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      enabled,
    });

  // -- ADD TO WISHLIST MUTATION --
  const addToWishlistMutation = useMutation({
    mutationFn: (productId) => wishlistService.addToWishlist(productId),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Added to wishlist");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add to wishlist");
    },
  });

  // -- REMOVE FROM WISHLIST MUTATION --
  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId) => wishlistService.removeFromWishlist(productId),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Removed from wishlist");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove from wishlist");
    },
  });

  // -- CLEAR WISHLIST MUTATION --
  const clearWishlistMutation = useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Wishlist cleared");
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to clear wishlist");
    },
  });

  return {
    // Hooks for data
    useWishlist,

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
