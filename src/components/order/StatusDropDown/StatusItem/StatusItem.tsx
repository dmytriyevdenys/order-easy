import s from "./StatusItem.module.scss"
import { HtmlHTMLAttributes } from "react"

type StatusItemProps = HtmlHTMLAttributes<HTMLDivElement> & {
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