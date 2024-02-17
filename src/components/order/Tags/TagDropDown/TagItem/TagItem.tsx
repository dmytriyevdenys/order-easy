import { TTag } from "interfaces/order/tag.type";
import { ReactComponent as CloseIcon } from "assets/icons/orderIcons/close.svg";
import s from "./TagItem.module.scss";

type TagItemProps = Omit<TTag, 'alias'> & {
  closeIcon?: boolean;
  removeTag?: (id: number) => void;
};

export const TagItem: React.FC<TagItemProps> = ({ name, color, closeIcon,  id, removeTag }) => {
  return (
    <div className={s.container} style={{ backgroundColor: color }}>
      {name}
      {closeIcon && <div onClick={() => removeTag && removeTag(id)}><CloseIcon /></div>}
    </div>
  );
};
