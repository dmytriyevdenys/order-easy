import { TTag } from "interfaces/order/tag.type"
import s from "./TagItem.module.scss"

export const TagItem: React.FC<Omit<TTag, 'alias'>> = ({id, name, color}) => {

    return (
        <div className={s.container} style={{backgroundColor: color}}>
            {name}
        </div>
    )
}