import { useState, useEffect } from 'react'
import './style.css'
import StartPage from './components/StartPage.jsx'
import Trivia from './components/Trivia.jsx'
import {nanoid} from 'nanoid'

function App() {

  const [questions, setQuestions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [correctAnswersGiven, setCorrectAnswersGiven] = useState(0)

  useEffect(()=>{
    const parsedData = fetch("https://opentdb.com/api.php?amount=3")
    .then(response => response.json())
    .then(data => setQuestions(parseData(data.results)))
  }, [])

  function parseData(results){

    const parsedQuestions = results.map(result => {
      
      //mapping wrong answers
      const allAnswers = result.incorrect_answers.map(wrongAnswer => {
        return {
          id: nanoid(),
          answer: wrongAnswer,
          selected: false,
          correct: false
        }
      })
  
      //mapping correct answer
      const correctAnswer = {
        id: nanoid(),
        answer: result.correct_answer,
        selected: false,
        correct: true
      }
      //adding correct answer to allAnswers
      allAnswers.push(correctAnswer)
      
      //assembling question
      return {
        id: nanoid(),
        question: result.question,
        correctAnswer: result.correct_answer,
        selectedAnswer: '',
        answers: allAnswers,
        answeredCorrectly: false
          }
    })
    return parsedQuestions
  }


  const questionSelection = (event, questionId, answerId)=>{

    setQuestions(oldQuestions => {
      return oldQuestions.map(oldQuestion => {
        
        if(oldQuestion.id === questionId){
          let oldAnswers = oldQuestion.answers
          let newAnswers = oldAnswers.map(oldAnswer => {
             return oldAnswer.id === answerId ? {...oldAnswer, selected: !oldAnswer.selected} : {...oldAnswer, selected: false}
          })
          return {...oldQuestion, answers: newAnswers, selectedAnswer: (event.target.value === oldQuestion.selectedAnswer ? '' : event.target.value)}
        }else{
          return oldQuestion
        }
        
      })
    })
    
  }

  console.log(questions)


  return (
    questions.length > 0 &&
    <div className="appContainer">
      <h1>app container</h1>
      <Trivia questions={questions} handleClick={questionSelection} />
    </div>
  )
  

}




export default App




// response_code: 0
// results: Array(3)
// 0:
// category: "Entertainment: Cartoon & Animations"
// correct_answer: "Willi Wakker"
// difficulty: "medium"
// incorrect_answers: Array(3)
  // 0: "Dick Tingeler"
  // 1: "Helmut Schmacker"
  // 2: "Rod Tapper"
// length: 3
// question: "What is the cartoon character, Andy Capp, known as in Germany?"
// type: "multiple"

// ---ANSWER
// id: nanoid(),
// answer: wrongAnswer,
// selected: false,
// correct: false