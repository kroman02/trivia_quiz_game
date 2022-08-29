import React from 'react'
import '../style.css'

export default function Header (props) {

    return (
        <header >
            <div><h1 className="logo">TRIVIA</h1></div>
            <button onClick={props.startGameHandler} className="changeCategory">Change Category</button>
        </header>
    )

}