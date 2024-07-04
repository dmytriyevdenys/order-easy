import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CACHE_TIME, STALE_TIME } from 'constans/queryConfig';
import { orderService } from 'services/order.service';
import { TStatus } from 'types/order/status.type';

type StatusFilter = {
  ids?: string;
};

export const useGetStatuses = (filter?: StatusFilter) => {
    const { ids } = filter || {};
    const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<TStatus[]>(["statuses", "all"]);
  console.log(cachedData);
  
  return useQuery({
    queryKey: ids ? ['statuses', ids] : ["statuses", "all"],
    queryFn: () => orderService.getStatuses(ids),
    initialData: () => {
      if (ids ) {
        return cachedData?.filter(status => ids.includes(String(status.id))) || [];
      }
      return cachedData || [{
        id: 1,
        name: 'Нове замовлення',
        alias: 'new',
        color: '#36B441',
        is_active: true
      }];
    },
    staleTime: STALE_TIME, 
    cacheTime: CACHE_TIME
  });
};
