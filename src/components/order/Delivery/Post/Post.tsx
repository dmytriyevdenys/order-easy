import { useResizableContainer } from "utils/useResizableContainer";
import s from "./Post.module.scss";
import {ReactComponent as NovaPostIcon} from "assets/icons/orderIcons/Nova_Poshta.svg";

export const Post: React.FC = () => {
const {containerRef, resizeHandleRef, handleMouseDown} = useResizableContainer({minWidth: 200, maxWidth: 400, side:'left'})
    return (
        <div className={s.container} ref={containerRef}>
            <div
          ref={resizeHandleRef}
          className={s.resizeHandle}
          onMouseDown={handleMouseDown}
        ></div>
            <div className={s.buttons_container}>
                <div className={s.post}>
                    <NovaPostIcon/>
                </div>
            </div>
        </div>
    )
}