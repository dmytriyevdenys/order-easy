import { useDraggable } from "@dnd-kit/core";
import s from "./OrderSmall.module.scss"
import { useState } from "react";
import { TOrderSmall } from "interfaces/order/order-small.type";
type OrderSmallProps = TOrderSmall & {
    color: string;
}
export const OrderSmall: React.FC<OrderSmallProps> = ({ full_name, created_at, total_price, intdocnumber, additionalnformation, color, id }) => {
  const {attributes, listeners, setNodeRef, transform } = useDraggable({id})
    const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const hexToRgba = (hex: string, alpha: string) => {
    const hexClean = hex.replace(/^#/, '');
    const bigint = parseInt(hexClean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const containerStyle: React.CSSProperties = {
  transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
  border: `1px solid ${isHovered ? color : hexToRgba(color, '0.5')}`,
};

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={s.container}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.info_block}>
        <span>{full_name}</span>
        <span>{new Date (created_at).toLocaleDateString()}</span>
      </div>
      <div className={s.general_info_block}>
        <span className={s.additionalnformation}>{additionalnformation}</span>
        <div className={s.int_doc_sum_block}>
          <div>{intdocnumber}</div>
          <span>{total_price} ₴</span>
        </div>
      </div>
    </div>
  );
}