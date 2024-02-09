import s from "./PostComponentContainer.module.scss"
import { ReactComponent as ArrovIcon } from 'assets/icons/orderIcons/arrow.svg';

type PostComponentContainerProps = {
    text: string,
    isOpen?: boolean
}
export const PostComponentContainer: React.FC<PostComponentContainerProps> = ({text, isOpen}) => {
 const openClass = isOpen ? s.open: ''
    return (
        <div className={`${s.container} ${openClass}`}>
            <span>{text}</span>
                <ArrovIcon className={isOpen ? s.open_icon : ''}/>
        </div>
    )
}