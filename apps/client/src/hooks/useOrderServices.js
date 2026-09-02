import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../services/orderService";
import toastUtils from "../utils/toastUtils";

export const useOrderServices = () => {
  const queryClient = useQueryClient();

  // -- GET MY ORDERS (INFINITE SCROLL) --
  const useMyOrders = () =>
    useInfiniteQuery({
      queryKey: ["myOrders"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await orderService.getMyOrders(pageParam, 5);
        if (!response.ok) {
          throw new Error(response.message);
        }
        return {
          orders: response.data,
          pagination: response.pagination
        };
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination?.hasMore) {
          return lastPage.pagination.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      refetchOnMount: 'always',
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
        toastUtils.success("Order created successfully");
        queryClient.invalidateQueries({ queryKey: ["myOrders"] });
        
        // Redirect to PhonePe payment page if redirectUrl is available
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
        }
      } else {
        toastUtils.error(res.message);
      }
    },
    onError: (err) => {
      toastUtils.error(err.message || "Failed to create order");
    },
  });

  // -- UPDATE PAYMENT STATUS MUTATION --
  const updatePaymentStatusMutation = useMutation({
    mutationFn: (data) => orderService.updatePaymentStatus(data),
    onSuccess: (res) => {
      if (res.ok) {
        toastUtils.success("Payment status updated");
        queryClient.invalidateQueries({ queryKey: ["myOrders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
      } else {
        toastUtils.error(res.message);
      }
    },
    onError: (err) => {
      toastUtils.error(err.message || "Failed to update payment status");
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

