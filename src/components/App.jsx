import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import programmingQuestions from "./data.json"; 

function App() {
  const [notes, setNotes] = useState(programmingQuestions); 
  const [editNote, setEditNote] = useState(null);

  function addOrUpdateNote(newNote) {
    if (editNote) {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === editNote.id ? { ...newNote, id: editNote.id } : note
        )
      );
      setEditNote(null); // Reset edit note
    } else {
      const newId = Math.max(...notes.map(note => note.id)) + 1; 
      setNotes(prevNotes => [{ ...newNote, id: newId }, ...prevNotes]);
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function editNoteHandler(id) {
    const noteToEdit = notes.find(note => note.id === id);
    setEditNote(noteToEdit);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addOrUpdateNote} editNote={editNote} />
      {notes.map(noteItem => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.question}
          content={noteItem.ans}
          onDelete={deleteNote}
          onEdit={editNoteHandler}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
