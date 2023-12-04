import { LiHTMLAttributes } from 'react';
import s from './DropDownItem.module.scss';

type ItemProps<T> = LiHTMLAttributes<HTMLLIElement> & {
    data: T;
};

export const DropDownItem: React.FC<ItemProps<any>> = ({ data, ...props }) => {
    return <li className={s.item} {...props}>{data}</li>;
};
