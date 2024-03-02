import { Button } from "components/shared/ui/Button/Button"
import s from "./Notes.module.scss"
import { Note } from "../Note/Note"

type NotesProps = {
    notes: string[];
    newNote: boolean
    addNewNote: () => void;
    setNewNote: (b: boolean) => void;
    filterNonEmptyNotes: () => void;
    deleteNote: (index: number) => void;
    noteChange: (index: number, text: string) => void;
}
export const Notes: React.FC<NotesProps> = ({notes, newNote, addNewNote, setNewNote, filterNonEmptyNotes, noteChange, deleteNote}) => { 
   
    return (
        <div className={s.container} >
          <label className={s.label_notes}>Нотатки</label>
          <Button
            variant="addSmall"
            color="hover"
            leftElement
            onClick={() => addNewNote()}
            onBlur={() => setNewNote(false)}
          ></Button>
          <div className={s.notes_container} onBlur={() => filterNonEmptyNotes()}>
            {notes.map((note, index) => (
              <Note
                key={index}
                note={note}
                active={newNote}
                onNoteChange={(newText) => noteChange(index, newText)}
                deleteNote={() => deleteNote(index)}
              />
            ))}
          </div>
        </div>
    )
}