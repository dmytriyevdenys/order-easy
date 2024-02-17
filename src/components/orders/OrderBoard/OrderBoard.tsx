import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./OrderBoard.module.scss";
import { OrderColumn } from "../OrderColumn/OrderColumn";

type OrderBoard = {};
export const OrderBoard: React.FC = () => {
  const { data: statuses } = useGetStatuses();
  return (
    <div className={s.container}>
        {statuses?.map(status => (
            <OrderColumn key={status.id} status={status} />
        ))}

    </div>
  );
};
