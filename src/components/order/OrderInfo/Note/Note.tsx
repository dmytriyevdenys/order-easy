import { ChangeEvent, useEffect, useRef, useState } from "react";
import s from "./Note.module.scss";

type NoteProps = {
  note?: string;
  active?: boolean;
  onNoteChange: (text: string) => void;
};
export const Note: React.FC<NoteProps> = ({ note, active, onNoteChange}) => {
  const [text, setText] = useState(note || '');
  const [isActive, setIsActive] = useState(active || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handldeSetIsActive = () => {
    setIsActive(true);
  };
  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleOnBlur = () => {
    setIsActive(false);
 
  };
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onNoteChange(value)
  };

  useEffect(() => {
    if (isActive && textareaRef.current && containerRef.current) {
      const textareaHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${textareaHeight}px`;
    }
  }, [text, isActive]);

  const height = Number(containerRef.current?.clientHeight) ;
  const width = Number(containerRef.current?.clientWidth) + 3;
  
  return (
    <div
      className={s.container}
      onClick={handldeSetIsActive}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      ref={containerRef}
    >
      {(isActive || active) && (
        <div><textarea
          ref={textareaRef}
          className={s.textarea}
          value={text}
          onChange={handleOnChange}
          autoFocus
          style={{
            height: height,
            width:  width
          }}
        />
        </div>
      )}
      {!isActive && !active && (
        <div className={s.value} style={{ whiteSpace: "pre-wrap" }}>
          {text}
        </div>
      )}
    </div>
  );
};
