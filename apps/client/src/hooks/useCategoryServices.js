import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "../services/categoryService";
import { toast } from "react-toastify";

export const useCategoryServices = () => {
  const queryClient = useQueryClient();

  // -- GET ALL CATEGORIES QUERY --
  const useCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const response = await categoryService.getAllCategories();
        if (!response.ok) {
          throw new Error(response.message);
        }
        console.log("return data", response.data)
        return response.data;
      },
    });

  // -- GET CATEGORY BY ID QUERY --
  const useCategory = (id) =>
    useQuery({
      queryKey: ["category", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await categoryService.getCategoryById(id);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      enabled: !!id,
    });

  return {
    // Hooks for data
    useCategories,
    useCategory,
  };
};

