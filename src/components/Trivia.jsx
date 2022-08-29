import React from 'react'
import Question from './Question.jsx'

const Trivia = (props) => {
    
    let feedback = ''

    if(props.correctAnswersGiven >= 0 && props.correctAnswersGiven < 2){
        feedback = 'You can do better!'
    }else if(props.correctAnswersGiven >= 2 && props.correctAnswersGiven < 3) {
        feedback = 'Not bad!'
    } else {
        feedback = 'Congratulations!'
    }
    
    return (<div className="triviaContainer">
                
                <Question gameOver={props.gameOver} questions={props.questions} handleClick={props.handleClick}  />
                
                <div className="bottomSection">
                <>
                    {props.gameOver 
                    ?
                    <div className="gameOverSection"><p className="feedback">{`You've scored ${props.correctAnswersGiven}/${props.questions.length} answers correctly. ${feedback}`}</p>
                    <button className="submitQuestions" onClick={props.startGameHandler}>Play again</button></div>
                     :
                     <>
                     <p className="answerCounter"><span className={`${props.error ? "red_num" : ""}`}>{`${props.answeredCount}`}</span> / {`${props.questions.length}`} answered</p>
                     <button onMouseOut={props.onMouseLeaveShakeOff} onClick={props.checkAnswers} className={`submitQuestions ${props.shake ? "shake" : ""} ${props.error ? "errorbtn" : ""}`}>Submit questions</button>
                     </>
               }
               </>
               
                </div>
                {props.error && <p className="error">Please answer all the questions</p>}
            </div>
            )
}

export default Trivia