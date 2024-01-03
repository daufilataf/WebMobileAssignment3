import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  function addNote(newNote) {
    if (editNote) {
      setNotes(prevNotes =>
        prevNotes.map((note, index) =>
          index === editNote.id ? { title: newNote.title, content: newNote.content } : note
        )
      );
      setEditNote(null); // Reset edit note
    } else {
      // Add new note logic
      setNotes(prevNotes => {
        return [newNote, ...prevNotes];
      });
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNoteHandler(id) {
    const noteToEdit = notes[id];
    setEditNote({
      ...noteToEdit,
      id: id
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} editNote={editNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNoteHandler}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
