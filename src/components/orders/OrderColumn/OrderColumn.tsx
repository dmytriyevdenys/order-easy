import { TStatus } from "interfaces/order/status.type"
import s from "./OrderColumn.module.scss"

type OrderColumnProps = {
    status: TStatus,
    totalSum?: number;
    amount?: number
}
export const OrderColumn: React.FC<OrderColumnProps> = ({status, totalSum, amount}) => {
    const {name, color} = status;
    return (
        <div className={s.container}>
            <div className={s.title}>
            <div className={s.name} >{name}</div>
            <div className={`${s.sort_icon} asc`}></div>
                </div>
            <div className={s.info}>
                <span>{amount || 0} угод</span>
                <span>{totalSum || 0} ₴</span>
            </div>
            <div className={s.color} style={{backgroundColor: color}}></div>
        </div>
    )
}