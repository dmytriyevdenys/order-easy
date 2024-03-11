import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./OrderBoard.module.scss";
import { OrderColumn } from "../OrderColumn/OrderColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { useState } from "react";
import { OrderSmall } from "../OrderSmall/OrderSmall";
import { useGetOrderByStatus } from "hooks/Order/useGetOrderByStatus";
import { TOrderByStatus, TOrderSmall } from "interfaces/order/order-small.type";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateOrder } from "hooks/Order/useUpdateOrder";
import { TUpdateOrder } from "interfaces/order/update-order.type";
import { ErrorToast } from "components/shared/ErrorToast";
import { useNavigate } from "react-router-dom";
import { ORDER_ROUTE } from "constans/routes";

export const OrderBoard: React.FC = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data: statuses, } = useGetStatuses();
  const statusIds =  statuses?.map((status) => status.id) || [];
  const { data: ordersByStatus, isSuccess: isSuccessOrders } =
    useGetOrderByStatus(statusIds);
  const [activeDragOrder, setActiveDragOrder] = useState<TOrderSmall>();
  const [isDragMove, setIsDragMove] = useState<boolean>(false)
  const [updatedOrder, setUpdatedOrder] = useState<TUpdateOrder>();
  const { mutate: updateOrder, isError: isErrorUpdateOrder, error: errorUpdateMessage } = useUpdateOrder(
    updatedOrder || {},);

  const handleDragEnd = (e: DragEndEvent) => {
    const statusId = Number(e.over?.id);
    const status = statuses && statuses.find(status => status.id === statusId);
    if (statusId && activeDragOrder?.status_id !== statusId) {
      client.setQueryData<TOrderByStatus[]>([statusIds], (oldData) => {
        if (oldData && activeDragOrder) {
          const updateData = oldData.map((data) => {
            if (data.status_id === statusId) {
              data.orders.push({ ...activeDragOrder, status_id: statusId });
            }
            if (data.status_id === e.active?.data?.current?.status_id) {
              const prevOrders = data.orders.filter(
                (order) => order.id !== activeDragOrder.id
              );
              data.orders = prevOrders;
            }
            return data;
          });
          setActiveDragOrder({ ...activeDragOrder, status_id: statusId })
          setUpdatedOrder({...activeDragOrder, status});
          return updateData;
        }
        return oldData;
      });
    } 
    setIsDragMove(false)
    activeDragOrder?.status_id !== statusId && updateOrder();
    !isDragMove  && handleNavigate(Number(activeDragOrder?.id));
  };

  function hanldeDragStart(e: DragStartEvent) {
    if (e.active.data) {
      const draggedOrder = e.active.data?.current as TOrderSmall ;
      setActiveDragOrder(draggedOrder);
      
    }
  }
  const handleDragMove = () => {
    setIsDragMove(true)
  }
  const getColorByOrderId = (order: TOrderSmall) => {
    const status = statuses?.find((status) => status.id === order.status_id);
    return status?.color || "";
  };  
  const handleNavigate = (orderId: number) => {
    const route = orderId ? `${ORDER_ROUTE}/${orderId}` : `${ORDER_ROUTE}/new`;
    navigate(route);
  };
  
  return (
    <div className={s.container}>
      <DndContext 
        onDragStart={hanldeDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        autoScroll={false}
      >
        {isSuccessOrders &&
          statuses?.map((status) => (
            <OrderColumn
              key={status.id}
              status={status}
              orders={
                ordersByStatus.find((orders) => orders.status_id === status.id && orders.orders !== null)
                  ?.orders || []
             }
            />
          ))}
        <DragOverlay>
          {activeDragOrder && (
            <div 
              style={{
                boxShadow:
                  "0px 0px 1px 0px #091E424F, 0px 3px 5px 0px #091E4233",
              }}
            >
              <OrderSmall
                {...activeDragOrder}
                color={getColorByOrderId(activeDragOrder)}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
      {isErrorUpdateOrder && <ErrorToast message={errorUpdateMessage.response.data.message}/>}
    </div>
  );
};
