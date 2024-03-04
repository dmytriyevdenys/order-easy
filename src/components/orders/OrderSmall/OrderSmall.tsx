import { useDraggable } from "@dnd-kit/core";
import { order } from "../OrderColumn/OrderColumn";
import s from "./OrderSmall.module.scss"
import { useState } from "react";
type OrderSmallProps = order & {
    color: string;
}
export const OrderSmall: React.FC<OrderSmallProps> = ({ buyer, created_at, total_price, IntDoc, additionalInforation, color, id }) => {
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
  boxShadow: transform ? '0px 0px 1px 0px #091E424F, 0px 3px 5px 0px #091E4233': '',
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
        <span>{buyer.full_name}</span>
        <span>{created_at.toLocaleDateString()}</span>
      </div>
      <div className={s.general_info_block}>
        <span>{additionalInforation}</span>
        <div className={s.int_doc_sum_block}>
          <div>{IntDoc}</div>
          <span>{total_price} ₴</span>
        </div>
      </div>
    </div>
  );
}