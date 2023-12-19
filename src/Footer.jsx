import React from "react"
import ReactDOM from "react-dom"
function Footer(){
    const date = new Date().getFullYear();

    return (
        <footer>
    <p>Created by Fuad Fataliyev for Web Mobile 1 course {date}</p>
    </footer>
    );
}

export default Footer;