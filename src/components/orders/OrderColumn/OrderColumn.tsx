import { TStatus } from "interfaces/order/status.type"
import s from "./OrderColumn.module.scss"
import { OrderColumnHead } from "./OrderColumnHead/OrderColumnHead";
import { OrderSmall } from "../OrderSmall/OrderSmall";
import { useDroppable } from "@dnd-kit/core";
import { TOrderSmall } from "interfaces/order/order-small.type";
import { useState } from "react";

export type order = {
    id: number,
    created_at: Date;
    buyer: {
        full_name: string
    };
    IntDoc: string;
    total_price: number;
    additionalInforation: string
}
type OrderColumnProps = {
    status: TStatus,
    orders: TOrderSmall[]
}
export const OrderColumn: React.FC<OrderColumnProps> = (props) => {
const [ orders, setOrders] = useState(props.orders || []) 
    const {  setNodeRef } = useDroppable({ id: props.status.id });
    const totalSum = orders &&  orders.reduce((sum, order) => sum + order.total_price, 0);
    return (
      <div className={s.container} ref={setNodeRef}>
     <OrderColumnHead status={props.status} amount={orders.length} totalSum={totalSum} />
        <div className={s.orders_container}>
          {orders.map((order) => (
            <OrderSmall key={order.id} {...order} color={props.status.color} />
          ))}
        </div>
      </div>
    );
  };
