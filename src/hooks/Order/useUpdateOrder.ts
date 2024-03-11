import { useMutation } from "@tanstack/react-query";
import { TUpdateOrder } from "interfaces/order/update-order.type";
import { orderService } from "services/order.service";
import { handleAxiosError } from "utils/axiosError";

export const useUpdateOrder = (order: TUpdateOrder) => {    
    return useMutation({
      mutationFn: () => orderService.updateOrder(order),
      onError: handleAxiosError
    });
  };
  
  
  
