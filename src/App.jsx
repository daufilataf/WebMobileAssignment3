import React from "react"
import ReactDOM from "react-dom"
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import Questions from './Questions';

function answering(flash){
    return <div>
        <Note key= {flash.id} question= {flash.question} answer = {flash.ans} />
    </div>
}

function App(){
    return (
        <div>
            <Header />
            <CreateArea />
            {Questions.map(answering)}
            <Footer />

        </div>
    )
    

}

export default App;