import React from 'react'

const StartPage = (props) => {
    return (
    <div className="start_container">
        <h1>Trivia Quiz</h1>
        <h3>Test your knowledge</h3>
        <button onClick={props.clickHandler}>Start Trivia</button>
    </div>
    )
}

export default StartPage