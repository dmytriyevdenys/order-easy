import { TStatus } from "interfaces/order/status.type";
import s from "./OrderColumn.module.scss";
import { OrderColumnHead } from "./OrderColumnHead/OrderColumnHead";
import { OrderSmall } from "../OrderSmall/OrderSmall";
import { useDroppable } from "@dnd-kit/core";
import { TOrderSmall } from "interfaces/order/order-small.type";

type OrderColumnProps = {
  status: TStatus;
  orders: TOrderSmall[];
};
export const OrderColumn: React.FC<OrderColumnProps> = (props) => {
 
  const { setNodeRef } = useDroppable({ id: props.status.id });
  const totalSum = props?.orders?.length
    ? props.orders.reduce((sum, order) => sum + (order?.total_price || 0), 0)
    : 0;
  return (
    <div className={s.container} ref={setNodeRef}>
      <OrderColumnHead
        status={props.status}
        amount={props.orders.length}
        totalSum={totalSum || 0}
      />
      <div className={s.orders_container}>
        {props.orders !== null &&
          props.orders?.map((order) => (
            <div key={order.id}>
              <OrderSmall {...order} color={props.status.color} key={order.id}/>
            </div>
          ))}
      </div>
    </div>
  );
};
