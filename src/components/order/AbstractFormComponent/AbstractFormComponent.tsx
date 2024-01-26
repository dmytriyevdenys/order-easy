import React from "react";
import s from "./AbstractFormComponent.module.scss";

type AbstractFormComponentProps = {
  label: string;
  Component: React.ReactElement;
};

export const AbstractFormComponent: React.FC<AbstractFormComponentProps> = ({
  label,
  Component
}) => {
  return (
    <div className={s.container}>
      <div className={s.label_container}>
      <label>{label}</label>
    </div>
     
      <div className={s.drop_container}>
        {React.cloneElement(Component)}
      </div>
    </div>
  );
};
