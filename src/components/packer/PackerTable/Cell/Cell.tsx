import s from "./Cell.module.scss"

type CellProps ={
    content: string | number
}
export const Cell: React.FC<CellProps> = ({content}) => {
    return (
        <div className={s.container}>
            {content}
        </div>
    )
}