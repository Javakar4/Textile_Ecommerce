import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import productService from "../services/productService";
import toastUtils from "../utils/toastUtils";

export const useProductServices = () => {
  const queryClient = useQueryClient();

  const useInfiniteProducts = (params = {}) =>
    useInfiniteQuery({
      queryKey: ["products", "infinite", params],
      queryFn: async ({ pageParam = 1 }) => {
        const queryParams = { ...params, page: pageParam, limit: 12 };
        const response = await productService.getAllProducts(queryParams);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data || { products: [] };
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.page || !lastPage.totalPages) return undefined;
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      keepPreviousData: true,
    });

  const useProducts = (params = {}) =>
    useQuery({
      queryKey: ["products", params],
      queryFn: async () => {
        const response = await productService.getAllProducts(params);
        if (!response.ok) {
          throw new Error(response.message);
        }
        const data = response.data;
        return data?.products || data || [];
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
    useInfiniteProducts,
    useProducts,
    useProduct,
  };
};

