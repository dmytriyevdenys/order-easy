import React, { Component, ReactNode, useState } from "react";
import s from "./PostComponentContainer.module.scss"
import { ReactComponent as ArrovIcon } from 'assets/icons/orderIcons/arrow.svg';

type PostComponentContainerProps = {
    text: string,
    children?: ReactNode;
    open? : boolean;
}
export const PostComponentContainer: React.FC<PostComponentContainerProps> = ({text, children, open}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open || false);

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