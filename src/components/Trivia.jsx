import React from 'react'
import Question from './Question.jsx'

const Trivia = (props) => {
    
    return (<div className="triviaContainer">
                {/*  */}
                <Question questions={props.questions} handleClick={props.handleClick}  />
                <div className="bottomSection">
                <p className="answerCounter">{`${props.answeredCount} / ${props.questions.length}`} answered</p>
                <button className="submitQuestions">Submit questions</button>
                </div>
            </div>)
}

export default Trivia