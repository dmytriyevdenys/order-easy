// import { CACHE_TIME, STALE_TIME } from "config/cacheConfig";
// import queryClient from "config/queryConfig";
// import { authService } from "services/auth.service";
// import { orderService } from "services/order.service";

// export const usePrefetchData = () => {

//   const prefetchData = () => {
//     queryClient.prefetchQuery({
//       queryKey: ['user', 'me'],
//       queryFn: () => authService.authMe(),
//     });

//     queryClient.prefetchQuery({
//       queryKey: ['roles'],
//       queryFn: () => authService.getRoles(),
//       cacheTime: CACHE_TIME,
//       staleTime: STALE_TIME
//     });

//     queryClient.prefetchQuery({
//       queryKey: ['manager', 'all'],
//       queryFn: () => orderService.getUsers(),
//       cacheTime: CACHE_TIME,
//       staleTime: STALE_TIME
//     });

//     queryClient.prefetchQuery({
//       queryKey: ["statuses", "all"],
//       queryFn: () => orderService.getStatuses(),
//       cacheTime: CACHE_TIME,
//       staleTime: STALE_TIME
//     });

//     queryClient.prefetchQuery({
//       queryKey: ["sources"],
//       queryFn: () => orderService.getSources(),
//       cacheTime: CACHE_TIME,
//       staleTime: STALE_TIME
//     });

//     queryClient.prefetchQuery({
//       queryKey: ["paymentMethods"],
//       queryFn: () => orderService.getPaymentMethods(),
//       cacheTime: CACHE_TIME,
//       staleTime: STALE_TIME
//     });
//   };

//   return { prefetchData };
// };
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
