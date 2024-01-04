import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router components along with Link and Routes
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Contact from './Contact';
import Cards from './Cards';
function App() {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Cards">Cards</Link>
            </li>
            <li>
              <Link to="/Contact">Contact with Me</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;