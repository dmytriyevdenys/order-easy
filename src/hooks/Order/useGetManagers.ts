import { useQuery } from "@tanstack/react-query";
import { orderService } from "services/order.service";

export const useGetManagers = () => {
  return useQuery({
    queryKey: ['manager', 'all'],
    queryFn: () => orderService.getUsers(),
    select: (users) => {
      return users.map((user) => {
        if (user.profile) {
          return {
            manager_id: user.profile.manager_id,
            manager_name: user.profile.manager_name,
          };
        }
        return null;
      }).filter(Boolean); 
    },
  });
};
