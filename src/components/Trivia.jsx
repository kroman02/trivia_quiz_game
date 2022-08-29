import React from 'react'
import Question from './Question.jsx'

const Trivia = (props) => {
    


    return (<div className="triviaContainer">
                
                <Question gameOver={props.gameOver} questions={props.questions} handleClick={props.handleClick}  />
                <div className="bottomSection">
                
                <p className="answerCounter"><span className={`${props.error ? "red_num" : ""}`}>{`${props.answeredCount}`}</span> / {`${props.questions.length}`} answered</p>
               <button onMouseOut={props.onMouseLeaveShakeOff} onClick={props.checkAnswers} className={`submitQuestions ${props.shake ? "shake" : ""} ${props.error ? "errorbtn" : ""}`}>Submit questions</button>
               
                </div>
                {props.error && <p className="error">Please answer all the questions</p>}
            </div>)
}

export default Trivia