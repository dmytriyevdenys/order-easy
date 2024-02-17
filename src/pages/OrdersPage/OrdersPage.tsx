import { OrderBoard } from "components/orders/OrderBoard/OrderBoard";
import s from "./OrdersPage.module.scss";
import { OrderActionsPanel } from "components/orders/OrderActionsPanel/OrderActionsPanel";

export const OrdersPage: React.FC = () => {
  return (
    <div className={s.container}>
        <OrderActionsPanel/>
        <div className={s.bord}>
          <OrderBoard/>
        </div>
    </div>
  );
};
