import { useState } from "react";
import s from "./OrderInfo.module.scss";
import { SwitchInfoButton } from "./SwitchInfoButton/SwitchInfoButton.";
import { ReactComponent as NoteIcon } from "assets/icons/orderIcons/NoteIcon.svg";
import { ReactComponent as RecentIcon } from "assets/icons/orderIcons/RecentIcon.svg";
import { Notes } from "./Notes/Notes";
import { Tasks } from "./Tasks/Tasks";

type OrderInfoProps = {
  notes?: string[];
};

export const OrderInfo: React.FC<OrderInfoProps> = ({ notes }) => {
  const buttons = [
    { id: "notes", text: "Записи", icon: <NoteIcon /> },
    { id: "history", text: "Історія змін", icon: <RecentIcon /> },
  ];
  const [selectedButton, setSelectedButton] = useState<string | null>('notes');
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

  const deleteNote = (index: number) => {
    const updatedNotes = notesLocal.filter((_, i) => i !== index);
    setNotesLocal(updatedNotes);
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
            width="100%"
          />
        ))}
      </div>
      {selectedButton === 'notes' &&  <div className={s.notations}>
        <Notes 
          notes={notesLocal}
          newNote={newNote}
          addNewNote={addNewNote}
          setNewNote={setNewNote}
          deleteNote={deleteNote}
          noteChange={handleNoteChange}
          filterNonEmptyNotes={filterNonEmptyNotes}
        />
        <Tasks/>
       </div>
        }
        {selectedButton === 'history' && <div>Цей фунціонал ще в розробці</div>}
    </div>
  );
};
