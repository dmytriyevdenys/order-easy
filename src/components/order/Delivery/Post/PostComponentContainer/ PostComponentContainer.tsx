import React, { Component, ReactNode, useState } from "react";
import s from "./PostComponentContainer.module.scss"
import { ReactComponent as ArrovIcon } from 'assets/icons/orderIcons/arrow.svg';

type PostComponentContainerProps = {
    text: string,
    children?: ReactNode;
}
export const PostComponentContainer: React.FC<PostComponentContainerProps> = ({text, children}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleSetIsOpen = () => {
      setIsOpen((prev) => !prev);
    };
 const openClass = isOpen ? s.open: ''
    return (
        <div >
            <div className={`${s.container_elem} ${openClass} `}  onClick={handleSetIsOpen}>
            <span>{text}</span>
                <ArrovIcon className={isOpen ? s.open_icon : ''}/>
        </div>
            {isOpen && children}
        </div>
    )
}