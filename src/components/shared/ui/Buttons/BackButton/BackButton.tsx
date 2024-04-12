import { useNavigate } from "react-router-dom";
import s from "./BackButton.module.scss"
import {ReactComponent as ArrowIcon} from "assets/icons/arrow.svg";

export const BackButton: React.FC = () => {
    const navigate = useNavigate()
    
    return (
        <div className={s.container} onClick={() => navigate(-1)}>
            <ArrowIcon/>
        </div>
    )
}