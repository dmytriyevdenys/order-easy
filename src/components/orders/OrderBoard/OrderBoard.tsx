import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./OrderBoard.module.scss";
import { OrderColumn } from "../OrderColumn/OrderColumn";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import { OrderSmall } from "../OrderSmall/OrderSmall";
import { useGetOrderByStatus } from "hooks/Order/useGetOrderByStatus";
import { TOrderByStatus, TOrderSmall } from "interfaces/order/order-small.type";
import { useQueryClient } from "@tanstack/react-query";
import { log } from "console";


export const OrderBoard: React.FC = () => {
  const client = useQueryClient();
  const orders = client.getQueryData<TOrderSmall[]>(['orders'])
  
  const { data: statuses } = useGetStatuses();
  const {data: ordersByStatus, isSuccess: isSuccessOrders,} = useGetOrderByStatus([1,2,3,4,5,6,7])
  
  const [activeDragOrder, setActiveDragOrder] = useState<TOrderSmall>();
  const handleDragEnd = (e: DragEndEvent) => {
    const statusId = Number(e.over?.id);
    if (statusId) {
      client.setQueryData<TOrderByStatus>([[1,2,3,4,5,6,7]], (oldData) => {
      if (oldData) {
        
        return {
          ...oldData,
          statusId: activeDragOrder && [oldData[statusId].push(activeDragOrder)]
        }
      }
      return {}
     })
      
    }
  };
  const hanldeDragStart = (e: DragStartEvent) => {    
    const orderId = e.active.id;
    const draggedOrder = orders?.find(elem => elem.id === orderId);
    setActiveDragOrder(draggedOrder);
    
  }
  const getColorByOrderId = (order: TOrderSmall) => {
    const status = statuses?.find(status => status.id === order.status_id);
    return status?.color || '';
 
  };

  return ( 
    <div className={s.container} >
      <DndContext onDragStart={hanldeDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners} autoScroll={false}>
        {isSuccessOrders  &&  statuses?.map((status) => (
          <OrderColumn
            key={status.id}
            status={status}
            orders={ordersByStatus[status.id]
            }
          />
        ))}
            <DragOverlay>
              {activeDragOrder && (
                <div style={{boxShadow: '0px 0px 1px 0px #091E424F, 0px 3px 5px 0px #091E4233'}}><OrderSmall {...activeDragOrder} color={getColorByOrderId(activeDragOrder)}/></div>
              )}
            </DragOverlay>
      </DndContext>
   </div>
  );
};
