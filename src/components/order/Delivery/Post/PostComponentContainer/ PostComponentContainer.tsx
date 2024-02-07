import { ReactNode } from "react"
import s from "./PostComponentContainer.module.scss"

type PostComponentContainerProps = {
    children: ReactNode
}
export const PostComponentContainer: React.FC<PostComponentContainerProps> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}