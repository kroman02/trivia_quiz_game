import React from 'react'




export default function Question(props) {

    

    function createAnswerElements(answers, questionId){

        return answers.map(answer => {


            
            

            return <button 
            key={answer.id} 
            value={answer.answer} 
            onClick={(event) => props.handleClick(event, questionId, answer.id)}
            className={`answer ${props.gameOver ? (answer.selected ? (answer.correct ? "gameover correct" : "gameover wrong" ) : (answer.correct ? "gameover correct" : "gameover") ) : (answer.selected ? "selected" : "")}`}>
                {answer.answer}
            </button>
         })
    }


    const questionElements = props.questions.map(question => {
    
        const answerElements = createAnswerElements(question.answers, question.id)
        
        return (<div key={question.id} className="questionContainer">
                    <p className="questionText">{question.question}</p>
                    <div className="answersContainer">{answerElements}</div>
                </div>)
    })

    return(
        <div>
           {questionElements}
          
        </div>    
    )


}
