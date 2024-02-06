import { useResizableContainer } from "utils/useResizableContainer";
import s from "./Resize.module.scss";
import { ReactNode } from "react";

type ResizeContainerProps = {
  minWidth: number;
  maxWidth: number;
  width: string;
  side: "left" | "right";
  children: ReactNode;
};
export const ResizeContainer: React.FC<ResizeContainerProps> = ({
  maxWidth,
  minWidth,
  side,
  width,
  children,
}) => {
  const { resizeHandleRef, handleMouseDown, containerRef } =
    useResizableContainer({ minWidth, maxWidth, side });
    const sideClass = side === 'right' ? s.right : s.left
  return (
    <div ref={containerRef} className={s.container} style={{ width }}>
      <div
        ref={resizeHandleRef}
        className={`${s.resizeHandle} ${sideClass}`}
        onMouseDown={handleMouseDown}
      ></div>
      {children}
    </div>
  );
};
