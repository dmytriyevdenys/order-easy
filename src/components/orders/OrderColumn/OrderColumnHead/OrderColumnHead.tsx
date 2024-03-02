import { TStatus } from "interfaces/order/status.type";
import s from "./OrderColumnHead.module.scss"

type OrderColumnHeadProps = {
    status: TStatus,
    totalSum?: number;
    amount?: number;
}
export const OrderColumnHead: React.FC<OrderColumnHeadProps> = ({status, totalSum, amount}) => {
    const {name, color} = status;
    return (
        <div className={s.container}>
            <div className={s.title}>
            <div className={s.name} >{name}</div>
            <div className={`${s.sort_icon} asc`}></div>
                </div>
            <div className={s.info}>
                <span>{amount || 0} шт</span>
                <span>{totalSum || 0} ₴</span>
            </div>
            <div className={s.color} style={{backgroundColor: color}}></div>
        </div>
    )
}