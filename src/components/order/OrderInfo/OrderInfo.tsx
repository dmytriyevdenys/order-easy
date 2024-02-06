import { useState } from "react";
import s from "./OrderInfo.module.scss";
import { SwitchInfoButton } from "./SwitchInfoButton/SwitchInfoButton.";
import { ReactComponent as NoteIcon } from "assets/icons/orderIcons/NoteIcon.svg";
import { ReactComponent as RecentIcon } from "assets/icons/orderIcons/RecentIcon.svg";
import { Note } from "./Note/Note";
import { Button } from "components/shared/ui/Button/Button";

type OrderInfoProps = {
  notes?: string[];
};

export const OrderInfo: React.FC<OrderInfoProps> = ({ notes }) => {
  const buttons = [
    { id: "notes", text: "Записи", icon: <NoteIcon /> },
    { id: "history", text: "Історія змін", icon: <RecentIcon /> },
  ];
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [notesLocal, setNotesLocal] = useState<string[]>(notes || []);
  const [newNote, setNewNote] = useState(false);

  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
    setNewNote(false);
  };

  const addNewNote = () => {
    setNewNote(true);
    setNotesLocal((prev) => [...prev, ""]);
  };

  const handleNoteChange = (index: number, newText: string) => {
    setNotesLocal((prev) => {
      const updatedNotes = [...prev];
      updatedNotes[index] = newText.trim();
      return updatedNotes;
    });
  };

  const filterNonEmptyNotes = () => {
    if (!newNote) {
      const filteredNotes = notesLocal.filter((note) => !!note.length);
      setNotesLocal(filteredNotes);      
    }
  };

  return (
    <div className={s.container}>
      <div className={s.buttons_container}>
        {buttons.map((button) => (
          <SwitchInfoButton
            key={button.id}
            text={button.text}
            icon={button.icon}
            OnClick={() => handleButtonClick(button.id)}
            selected={selectedButton === button.id}
          />
        ))}
      </div>
      <div>
        <div className={s.note_container}>
          <Button
            variant="addSmall"
            color="hover"
            leftElement
            onClick={() => addNewNote()}
            onBlur={() => setNewNote(false)}
          ></Button>
          <div className={s.notes_container} onBlur={() => filterNonEmptyNotes()}>
            {notesLocal.map((note, index) => (
              <Note
                key={index}
                note={note}
                active={newNote}
                onNoteChange={(newText) => handleNoteChange(index, newText)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
