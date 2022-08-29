import React from 'react'
import '../style.css'

export default function Header () {

    return (
        <header >
            <div><h1 className="logo">TRIVIA</h1></div>
            <button className="changeCategory">Change Category</button>
        </header>
    )

}