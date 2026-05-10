import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services/profileService";
import { toast } from "react-toastify";

export const useProfileServices = () => {
  const queryClient = useQueryClient();

  // -- GET PROFILE QUERY --
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await profileService.getProfile();
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  // -- UPDATE PROFILE MUTATION --
  const updateProfileMutation = useMutation({
    mutationFn: (data) => profileService.updateProfile(data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  // -- ADD ADDRESS MUTATION --
  const addAddressMutation = useMutation({
    mutationFn: (data) => profileService.addAddress(data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Address added successfully");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(res.message);
      }
    },
  });

  // -- REMOVE ADDRESS MUTATION --
  const removeAddressMutation = useMutation({
    mutationFn: (id) => profileService.removeAddress(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Address removed successfully");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(res.message);
      }
    },
  });

  // -- SET DEFAULT ADDRESS MUTATION --
  const setDefaultAddressMutation = useMutation({
    mutationFn: (id) => profileService.setDefaultAddress(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Default address updated");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(res.message);
      }
    },
  });

  return {
    // Data
    profile: profileData, // { user, addresses }
    addresses: profileData?.addresses || [],
    userProfile: profileData?.user || null,

    // States
    isLoadingProfile,
    isErrorProfile,
    errorProfile,

    // Mutations
    updateProfile: updateProfileMutation.mutateAsync,
    addAddress: addAddressMutation.mutateAsync,
    removeAddress: removeAddressMutation.mutateAsync,
    setDefaultAddress: setDefaultAddressMutation.mutateAsync,

    // Loading states for mutations
    isUpdatingProfile: updateProfileMutation.isPending,
    isAddingAddress: addAddressMutation.isPending,
    isRemovingAddress: removeAddressMutation.isPending,
    isSettingDefaultAddress: setDefaultAddressMutation.isPending,
  };
};
