import React, { forwardRef, TextareaHTMLAttributes } from "react";
import s from "./Textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  border?: boolean
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, border, ...props }, ref) => {
    const borderClass = border ? s.border: '';
    return (
      <textarea className={`${s.container} ${borderClass}`} value={value} ref={ref} {...props} />
    );
  }
);
