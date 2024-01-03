import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Contact from './Contact';


function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("LastModifiedDesc");
  // Search Part
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter(note => {
    const searchMatch = searchTerm === "" || note.question.toLowerCase().includes(searchTerm.toLowerCase()) || note.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = filter === "All" || note.status === filter;

    return searchMatch && filterMatch;
  });

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
    const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  function addOrUpdateNote(newNote, status = "Noted") {
    const noteData = {
      question: newNote.title,
      answer: newNote.content,
      lastModified: new Date().toISOString(),
      status: status 
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedAndFilteredNotes = filteredNotes.slice().sort((a, b) => {
    function compareLastModifiedDesc() {
      return new Date(b.lastModified) - new Date(a.lastModified);
    }
  
    function compareLastModifiedAsc() {
      return new Date(a.lastModified) - new Date(b.lastModified);
    }
  
    function compareQuestionAsc() {
      return (a.question || "").localeCompare(b.question || "");
    }
  
    function compareQuestionDesc() {
      return (b.question || "").localeCompare(a.question || "");
    }
  
    function compareStatusAsc() {
      return (a.status || "").localeCompare(b.status || "");
    }
  
    function compareStatusDesc() {
      return (b.status || "").localeCompare(a.status || "");
    }
  
    switch (sortOption) {
      case "LastModifiedDesc":
        return compareLastModifiedDesc();
      case "LastModifiedAsc":
        return compareLastModifiedAsc();
      case "QuestionAsc":
        return compareQuestionAsc();
      case "QuestionDesc":
        return compareQuestionDesc();
      case "StatusAsc":
        return compareStatusAsc();
      case "StatusDesc":
        return compareStatusDesc();
      default:
        return 0;
    }
  });
  const handleNoteSelection = (id) => {
    setSelectedNotes(prevSelected => {
      const newSelected = prevSelected.includes(id) 
                          ? prevSelected.filter(noteId => noteId !== id) 
                          : [...prevSelected, id];
      console.log("Selected Notes: ", newSelected);
      return newSelected;
    });
  };
  


  const shareNotes = () => {
    const notesToShare = notes.filter(note => selectedNotes.includes(note.id));
    const notesJson = JSON.stringify(notesToShare, null, 2); // Beautify the JSON string
  
    const emailBody = encodeURIComponent(notesJson);
  
    const mailtoLink = `mailto:?subject=Shared Notes&body=${emailBody}`;
  
    window.location.href = mailtoLink;
  };
  
  return (
    <div>
            <Contact />

      <Header />
      <button onClick={shareNotes}>Share Selected Notes</button>
      <input
        type="text"
        placeholder="Search for notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Learned">Learned</option>
        <option value="Want to Learn">Want to Learn</option>
        <option value="Noted">Noted</option>
      </select>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="LastModifiedDesc">Last Modified (Newest)</option>
        <option value="LastModifiedAsc">Last Modified (Oldest)</option>
        <option value="QuestionAsc">Question (A-Z)</option>
        <option value="QuestionDesc">Question (Z-A)</option>
        <option value="StatusAsc">Status (A-Z)</option>
        <option value="StatusDesc">Status (Z-A)</option>
      </select>
      <CreateArea onAdd={addOrUpdateNote} editNote={editNote} />
      {sortedAndFilteredNotes.map(noteItem => (
        <Note
          key={noteItem.id}
    id={noteItem.id}
    title={noteItem.question}
    content={noteItem.answer}
    status={noteItem.status}
    lastModified={noteItem.lastModified}
    onEdit={editNoteHandler}
    onDelete={deleteNote}
    onSelectionToggle={() => handleNoteSelection(noteItem.id)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;