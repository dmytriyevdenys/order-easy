import { Button } from "components/shared/ui/Buttons/Button/Button"
import s from "./Tasks.module.scss"

export const Tasks: React.FC = () => {
    return (
        <div className={s.container}>
            <label className={s.label}>Задачі</label>
            <Button variant='addSmall' color='hover' leftElement ></Button>
        </div>
    )
}