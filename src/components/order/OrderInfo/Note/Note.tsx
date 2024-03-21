import { ChangeEvent, useEffect, useRef, useState } from "react";
import s from "./Note.module.scss";
import { useTextAreaHeight } from "utils/useTextareaHeight";
import { Textarea } from "components/shared/ui/Textarea/Textarea";
import { CloseButton } from "components/shared/ui/Buttons/CloseButton/CloseButton";

type NoteProps = {
  note?: string;
  active?: boolean;
  onNoteChange: (text: string) => void;
  deleteNote: () => void;
};
export const Note: React.FC<NoteProps> = ({ note, active, onNoteChange, deleteNote }) => {
  const [text, setText] = useState(note || "");
  const [isActive, setIsActive] = useState(active || false);
  const [isHover, SetIsHover] = useState(false);
  const [isClickedToDelete, setIsClickedToDelete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handldeSetIsActive = () => {
    setIsActive(true);    
  };
  const handleOnBlur = () => {
    setIsActive(false);
  };
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onNoteChange(value);
  };

  const handleDeleteNote = () => {
    deleteNote();
    setIsClickedToDelete(false);
    SetIsHover(false);
  }

  const clickToDelete = () => {
    setIsClickedToDelete(true)
    SetIsHover(true)
  }

  const handleOnMouseLeave = () => {
    if (!isClickedToDelete) {
    SetIsHover(false);
    setIsClickedToDelete(false);
    }
  }

  const cacnel = () => {
    setIsClickedToDelete(false);
    SetIsHover(false);
  }

  useTextAreaHeight({
    textareaRef: textareaRef,
    containerRef: containerRef,
    isActive: isActive,
    text,
  });

  useEffect(() => {
    setText(note || '');
    SetIsHover(false);
    setIsClickedToDelete(false)
  },[note, deleteNote]);

  const test = isClickedToDelete  ? s.clicked: '';
  
  return (
    <div
      className={s.container}
      onBlur={handleOnBlur}
      onMouseEnter={() => SetIsHover(true)}
      onMouseLeave={handleOnMouseLeave}
      ref={containerRef}
    >
      {(isActive || active) && (
        <div  >
          <Textarea 
            value={text}
            onChange={(e) => handleOnChange(e)}
            ref={textareaRef}
            autoFocus
            border
            style={{ maxHeight: '70vh',overflow: 'auto'}}
          />
        </div>
      )}
      {!isActive && !active && (
        <div className={`${s.value} ${test}`} onClick={handldeSetIsActive}>
          {text}
        </div>
      )} 
      <div className={s.close_icon} onClick={clickToDelete} >
       {(isHover && !isActive ) && <CloseButton toConfirm={handleDeleteNote} cancel={cacnel}/>}
       </div>
    </div>
  );
};
