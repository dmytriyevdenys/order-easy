import { useQuery } from '@tanstack/react-query';
import { CACHE_TIME, STALE_TIME } from 'config/cacheConfig';
import { orderService } from 'services/order.service';

type StatusFilter = {
  ids?: string;
};

export const useGetStatuses = (filter?: StatusFilter) => {
    const { ids } = filter || {};
  return useQuery({
    queryKey: ids ? ['statuses', ids] : ["statuses", "all"],
    queryFn: () => orderService.getStatuses(ids),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME
  });
};
