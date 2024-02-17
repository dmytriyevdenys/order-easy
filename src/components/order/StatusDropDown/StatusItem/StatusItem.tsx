import { TStatus } from "interfaces/order/status.type"
import s from "./StatusItem.module.scss"
import { LiHTMLAttributes } from "react"

type StatusItemProps =   {
    name: string;
    color: string;
}
export const StatusItem: React.FC<StatusItemProps> = ({name, color, ...props}) => { 
    return (
        <div className={s.container} {...props}>
         <div className={s.color_block} style={{backgroundColor: color}}></div> 
            <span>{name}</span>
        </div>
    )
}