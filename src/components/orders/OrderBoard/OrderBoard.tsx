import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./OrderBoard.module.scss";
import { OrderColumn } from "../OrderColumn/OrderColumn";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { useState } from "react";

const orders = [
  {
    status_id: 1,
    orders: [
      {
        id: 1,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Божедай Богдан",
        },
        IntDoc: "20450828176982",
        total_price: 1313,
        additionalInforation: "К-т 50см грав друк ",
      },
      {
        id: 2,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Неприємний Микола",
        },
        IntDoc: "20450863910017",
        total_price: 1234,
        additionalInforation: "К-т 40cм грав друк ",
      },
      {
        id: 3,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Чупакабра Аркадій",
        },
        IntDoc: "20450864057381",
        total_price: 3000,
        additionalInforation: "набір шампурів Бадьорий ",
      },
    ],
  },
  {
    status_id: 2,
    orders: [
      {
        id: 14,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Дохлик Юрій",
        },
        IntDoc: "20450870528573",
        total_price: 1231,
        additionalInforation: "коробка 6ш дер, шамп дер грав 6шт чарки грав ",
      },
    ],
  },
  {
    status_id: 3,
    orders: [
      {
        id: 10,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Дохлик Юрій",
        },
        IntDoc: "20450870528573",
        total_price: 1231,
        additionalInforation: "коробка 6ш дер, шамп дер грав 6шт чарки грав ",
      },
      {
        id: 6,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Дура Наталія",
        },
        IntDoc: "20450870528573",
        total_price: 1231,
        additionalInforation: "коробка 6ш дер, шамп дер грав 6шт чарки грав ",
      },
    ],
  },
  
  {
    status_id: 5,
    orders: [
      {
        id: 5,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Братішка Вадим",
        },
        IntDoc: "20450870528573",
        total_price: 1231,
        additionalInforation: "коробка 6ш дер, шамп дер грав 6шт чарки грав ",
      },
     
    ],
  },
  {
    status_id: 4,
    orders: [
      {
        id: 7,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Дядя Петя",
        },
        IntDoc: "20450867572395",
        total_price: 1231,
        additionalInforation: "ск садж 60см грав і друк  ",
      },
      {
        id: 8,
        created_at: new Date(Math.random()),
        buyer: {
          full_name: "Сусід з Села Василь",
        },
        IntDoc: "20450866220326",
        total_price: 1231,
        additionalInforation: "чашка з грав (синій карабін)",
      },
    ],
  },
];
export const OrderBoard: React.FC = () => {
  const { data: statuses } = useGetStatuses();
  const [ordersDrags] = useState(orders);

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over?.id) {
      const draggedOrderId = e.active.id;
      const sourceStatusId = ordersDrags.find((order) =>
        order.orders.some((o) => o.id === draggedOrderId)
      )?.status_id;
  
      const destinationStatusId = e.over.id;
  
      if (sourceStatusId && destinationStatusId && sourceStatusId !== destinationStatusId) {
        const sourceStatus = ordersDrags.find((order) => order.status_id === sourceStatusId);
        const destinationStatus = ordersDrags.find((order) => order.status_id === destinationStatusId);
  
        const draggedOrder = sourceStatus?.orders.find((o) => o.id === draggedOrderId);
  
        if (draggedOrder) {
          sourceStatus?.orders.splice(
            sourceStatus?.orders.findIndex((o) => o.id === draggedOrderId),
            1
          );
  
          destinationStatus?.orders.push(draggedOrder);
        }
      }
    }
  };
  

  return (
    <div className={s.container}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} autoScroll={false}>
        {statuses?.map((status) => (
          <OrderColumn
            key={status.id}
            status={status}
            orders={
              ordersDrags.find((order) => order.status_id === status.id)?.orders ||
              []
            }
          />
        ))}
      </DndContext>
    </div>
  );
};
