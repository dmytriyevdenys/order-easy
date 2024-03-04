import { TStatus } from "interfaces/order/status.type"
import s from "./OrderColumn.module.scss"
import { OrderColumnHead } from "./OrderColumnHead/OrderColumnHead";
import { OrderSmall } from "../OrderSmall/OrderSmall";
import { useDroppable } from "@dnd-kit/core";

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
    orders: order[]
}
export const OrderColumn: React.FC<OrderColumnProps> = (props) => {
    const { status, orders } = props;
    const {  setNodeRef } = useDroppable({ id: status.id });
    const totalSum = orders.reduce((sum, order) => sum + order.total_price, 0);
    return (
      <div className={s.container} ref={setNodeRef}>
     <OrderColumnHead status={status} amount={orders.length} totalSum={totalSum} />
        <div className={s.orders_container}>
          {orders.map((order) => (
            <OrderSmall key={order.id} {...order} color={status.color} />
          ))}
        </div>
      </div>
    );
  };
