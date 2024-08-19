
import { QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query';
import { CACHE_TIME, STALE_TIME } from 'config/cacheConfig';
import queryClient from 'config/queryConfig';
import { authService } from 'services/auth.service';
import { orderService } from 'services/order.service';

const defaultQueryOptions = {
  staleTime: STALE_TIME,
  cacheTime: CACHE_TIME
};

const prefetchQueryWithDefaults = (client: QueryClient, queryKey: QueryKey, queryFn: QueryFunction) => {
  client.prefetchQuery({
    queryKey,
    queryFn,
    ...defaultQueryOptions,
  });
};

export const usePrefetchData = () => {

  const prefetchData = () => {
    prefetchQueryWithDefaults(queryClient, ['user', 'me'], () => authService.authMe());
    prefetchQueryWithDefaults(queryClient, ['roles'], () => authService.getRoles());
    prefetchQueryWithDefaults(queryClient, ['manager', 'all'], () => orderService.getUsers());
    prefetchQueryWithDefaults(queryClient, ['statuses', 'all'], () => orderService.getStatuses());
    prefetchQueryWithDefaults(queryClient, ['sources'], () => orderService.getSources());
    prefetchQueryWithDefaults(queryClient, ['paymentMethods'], () => orderService.getPaymentMethods());
  };

  return { prefetchData };
};
