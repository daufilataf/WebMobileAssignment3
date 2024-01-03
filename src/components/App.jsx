import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  // Function to fetch flashcards from the server
  const fetchNotes = () => {
    fetch("http://localhost:3001/flashcards")
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error:', error));
  };

  // Fetch flashcards when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  function addOrUpdateNote(newNote) {
    const noteData = {
      question: newNote.title,
      answer: newNote.content,
      lastModified: new Date().toISOString()
    };

    if (editNote) {
      // Update flashcard
      fetch(`http://localhost:3001/flashcards/${editNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      })
      .then(() => {
        setNotes(prevNotes => prevNotes.map(note => 
          note.id === editNote.id ? { ...noteData, id: editNote.id } : note
        ));
        setEditNote(null);
      })
      .catch(error => console.error('Error:', error));
    } else {
      // Add new flashcard
      fetch("http://localhost:3001/flashcards", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => [data, ...prevNotes]); // Prepend the new note
      })
      .catch(error => console.error('Error:', error));
    }
  }
  function deleteNote(id) {
    fetch(`http://localhost:3001/flashcards/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    })
    .catch(error => console.error('Error:', error));
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
    content={noteItem.answer}
    lastModified={noteItem.lastModified} // Pass the lastModified prop
    onDelete={deleteNote}
    onEdit={editNoteHandler}
  />
))}
      <Footer />
    </div>
  );
}

export default App;
