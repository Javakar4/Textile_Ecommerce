import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import brandService from "../services/brandService";
import { toast } from "react-toastify";

export const useBrandServices = () => {
  const queryClient = useQueryClient();

  // -- GET ALL BRANDS QUERY --
  const useBrands = () =>
    useQuery({
      queryKey: ["brands"],
      queryFn: async () => {
        const response = await brandService.getAllBrands();
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
    });

  // -- GET BRAND BY ID QUERY --
  const useBrand = (id) =>
    useQuery({
      queryKey: ["brand", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await brandService.getBrandById(id);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      enabled: !!id,
    });

  return {
    // Hooks for data
    useBrands,
    useBrand,
  };
};

