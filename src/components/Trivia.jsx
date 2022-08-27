import React from 'react'
import Question from './Question.jsx'

const Trivia = (props) => {
    
    return (<div className="triviaContainer">
                <h2>trivia container</h2>
                <Question questions={props.questions} handleClick={props.handleClick}  />
            </div>)
}

export default Trivia