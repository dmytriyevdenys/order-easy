import s from "./AbstractFormComponent.module.scss"

type AbstractFormComponentProps = {
    label: string
    Component: React.FC<any>; 
    componentProps?: Record<string, any>; }
export const AbstractFormComponent: React.FC<AbstractFormComponentProps> = ({label, Component, componentProps}) => {
    return (
        <div className={s.container}>
            <label>{label}</label>
            <div className={s.drop_container}>
            <Component {...componentProps}/>
            </div>
        </div>
    )
}