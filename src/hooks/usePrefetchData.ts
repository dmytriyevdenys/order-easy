import { useQueryClient } from "@tanstack/react-query";
import { CACHE_TIME, STALE_TIME } from "constans/queryConfig";
import { authService } from "services/auth.service";
import { orderService } from "services/order.service";

export const usePrefetchData = () => {
  const client = useQueryClient();

  client.prefetchQuery({
    queryKey: ['user, me'],
    queryFn: () => authService.authMe(),
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME
  })
  client.prefetchQuery({
    queryKey: ['manager', 'all'],
    queryFn: () => orderService.getUsers(),
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME
  })
  client.prefetchQuery({
    queryKey: ["statuses", "all"],
    queryFn: () => orderService.getStatuses(),
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
  });
  client.prefetchQuery({
    queryKey: ["sources"],
    queryFn: () => orderService.getSources(),
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
  });

  client.prefetchQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => orderService.getPaymentMethods(),
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
  });
};