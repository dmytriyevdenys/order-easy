import React from "react"
import s from "./PostField.module.scss"

type PostFieldProps = {
    label: string
    Component: React.ReactElement;
}
export const PostField: React.FC<PostFieldProps> = ({label, Component}) => {
    return (
        <div className={s.container}>
            <label>{label}</label>
            {React.cloneElement(Component)}
        </div>
    )
}