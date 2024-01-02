import React from "react"
import ReactDOM from "react-dom"

function Note(props){
   
    return (
       <div className="note">  
        <h1>{props.answer}</h1>
        
        <p>{props.question}</p>
       </div>
    );
}

export default Note;