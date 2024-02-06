import { RefObject, useEffect } from "react"

type TextAreaHeightProps = {
textareaRef: RefObject<HTMLTextAreaElement>;
containerRef: RefObject<HTMLDivElement>;
isActive: boolean;
text: string
}

export const useTextAreaHeight = ({textareaRef, containerRef, isActive, text}: TextAreaHeightProps) => {

    useEffect(() => {
        if (isActive && textareaRef.current && containerRef.current) {
          const textareaHeight = textareaRef.current.scrollHeight;
          textareaRef.current.style.height = `${textareaHeight}px`;
        }
      },  [isActive, text, textareaRef, containerRef]);
    
      const height = Number(containerRef.current?.clientHeight) ;
      const width = Number(containerRef.current?.clientWidth) ;
      
      return {
        height,
        width
      }
}