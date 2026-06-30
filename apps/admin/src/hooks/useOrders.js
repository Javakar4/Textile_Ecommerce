import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export function useOrdersQuery(filters) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getAllOrders(filters),
  });
}

export function useOrderDetailsQuery(orderId) {
  return useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => orderService.getOrderDetails(orderId),
    enabled: !!orderId,
  });
}

export function useUpdatePaymentStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, paymentStatus }) => orderService.updatePaymentStatus(orderId, paymentStatus),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-details', variables.orderId] });
      // If there's a user associated with the order details we might also want to invalidate user details
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
    },
  });
}

export function useUpdateTrackingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, trackingStatus }) => orderService.updateTrackingStatus(orderId, trackingStatus),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-details', variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
    },
  });
}
