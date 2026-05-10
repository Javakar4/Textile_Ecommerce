import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/productService";
import toastUtils from "../utils/toastUtils";

export const useProductServices = () => {
  const queryClient = useQueryClient();

  // -- GET ALL PRODUCTS QUERY --
  const useProducts = (params = {}) =>
    useQuery({
      queryKey: ["products", params],
      queryFn: async () => {
        console.log("req happens",params)
        const response = await productService.getAllProducts(params);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      keepPreviousData: true,
    });

  // -- GET PRODUCT BY ID QUERY --
  const useProduct = (id) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await productService.getProductById(id);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      enabled: !!id,
    });

  return {
    // Hooks for data
    useProducts,
    useProduct,
  };
};

