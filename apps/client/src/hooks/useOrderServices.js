import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../services/orderService";
import { toast } from "react-toastify";

export const useOrderServices = () => {
  const queryClient = useQueryClient();

  // -- GET MY ORDERS QUERY --
  const useMyOrders = () =>
    useQuery({
      queryKey: ["myOrders"],
      queryFn: async () => {
        const response = await orderService.getMyOrders();
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
    });

  // -- GET ORDER BY ID QUERY --
  const useOrder = (id) =>
    useQuery({
      queryKey: ["order", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await orderService.getOrderById(id);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.data;
      },
      enabled: !!id,
    });

  // -- CREATE ORDER MUTATION --
  const createOrderMutation = useMutation({
    mutationFn: (data) => orderService.createOrder(data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Order created successfully");
        queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create order");
    },
  });

  // -- UPDATE PAYMENT STATUS MUTATION --
  const updatePaymentStatusMutation = useMutation({
    mutationFn: (data) => orderService.updatePaymentStatus(data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Payment status updated");
        queryClient.invalidateQueries({ queryKey: ["myOrders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update payment status");
    },
  });

  return {
    // Hooks for data
    useMyOrders,
    useOrder,

    // Mutations
    createOrder: createOrderMutation.mutateAsync,
    updatePaymentStatus: updatePaymentStatusMutation.mutateAsync,

    // Loading states
    isCreatingOrder: createOrderMutation.isPending,
    isUpdatingPaymentStatus: updatePaymentStatusMutation.isPending,
  };
};

