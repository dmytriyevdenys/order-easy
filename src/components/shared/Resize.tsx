import { useResizableContainer } from "utils/useResizableContainer"
import s from "./Resize.module.scss"

export const ResizeContainer : React.FC = () => {
    const {resizeHandleRef, handleMouseDown} = useResizableContainer({minWidth: 0, maxWidth: 0, side: 'left'})
    return (
        <div
          ref={resizeHandleRef}
          className={s.resizeHandle}
          onMouseDown={handleMouseDown}
        ></div>
    )
}