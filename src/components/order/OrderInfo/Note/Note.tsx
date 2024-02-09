import { ChangeEvent, useEffect, useRef, useState } from "react";
import s from "./Note.module.scss";
import { useTextAreaHeight } from "../../../../utils/useTextareaHeight";
import { Textarea } from "components/shared/ui/Textarea/Textarea";

type NoteProps = {
  note?: string;
  active?: boolean;
  onNoteChange: (text: string) => void;
};
export const Note: React.FC<NoteProps> = ({ note, active, onNoteChange }) => {
  const [text, setText] = useState(note || "");
  const [isActive, setIsActive] = useState(active || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handldeSetIsActive = () => {
    setIsActive(true);
  };
  const handleOnFocus = () => {
    setIsActive(true);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  const handleOnBlur = () => {
    setIsActive(false);
  };
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onNoteChange(value);
  };
  const { height, width } = useTextAreaHeight({
    textareaRef: textareaRef,
    containerRef: containerRef,
    isActive: isActive,
    text,
  });

  useEffect(() => {  
   active && window.scrollTo({behavior: 'smooth', top: 0})
  text.length > 0 && containerRef.current?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest' })
  }, [text]);

  return (
    <div
      className={s.container}
      onClick={handldeSetIsActive}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      ref={containerRef}
    >
      {(isActive || active) && (
        <div>
          <Textarea 
            value={text}
            onChange={(e) => handleOnChange(e)}
            ref={textareaRef}
            autoFocus
            border
            style={{width , height}}
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
