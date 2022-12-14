import { useState, useEffect } from 'react'
import './style.css'
import StartPage from './components/StartPage.jsx'
import Trivia from './components/Trivia.jsx'
import Header from './components/Header.jsx'
import {nanoid} from 'nanoid'
import {htmlDecode, shuffleAnswers} from './utilityFunctions.js'






function App() {

  const [questions, setQuestions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [correctAnswersGiven, setCorrectAnswersGiven] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [category, setCategory] = useState("https://opentdb.com/api.php?amount=5")
  // CSS FLAGS
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)


//https://opentdb.com/api.php?amount=5
  useEffect(()=>{
    const parsedData = fetch(category)
    .then(response => response.json())
    .then(data => setQuestions(parseData(data.results)))
  }, [gameStarted])

  function parseData(results){

    const parsedQuestions = results.map(result => {
      
      //mapping wrong answers
      const allAnswers = result.incorrect_answers.map(wrongAnswer => {
        return {
          id: nanoid(),
          answer: htmlDecode(wrongAnswer),
          selected: false,
          correct: false
        }
      })
  
      //mapping correct answer
      const correctAnswer = {
        id: nanoid(),
        answer: htmlDecode(result.correct_answer),
        selected: false,
        correct: true
      }
      //adding correct answer to allAnswers
      allAnswers.push(correctAnswer)
      
      const shuffledAnswers = shuffleAnswers(allAnswers)
    

      //assembling question
      return {
        id: nanoid(),
        question: htmlDecode(result.question),
        correctAnswer: result.correct_answer,
        selectedAnswer: '',
        answers: shuffledAnswers,
        answeredCorrectly: false
          }
    })
    return parsedQuestions
  }


  const questionSelection = (event, questionId, answerId)=>{
    if(gameOver){return}
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

  useEffect(() => {
    countAnsweredQuestions()
    setError(false)
  }, [questions])


  const checkAnswers = () => {
    if(answeredCount < questions.length){
      setError(true)
      setShake(true)
    }else{
      const correctAnswersCount = questions.filter(question => question.correctAnswer === question.selectedAnswer).length
      setCorrectAnswersGiven(correctAnswersCount)
      setGameOver(true)
      console.log(correctAnswersCount)
    }

    

  }

  const countAnsweredQuestions = () => {
      const answered = questions.filter(question => question.selectedAnswer.length > 0).length
      setAnsweredCount(answered)
  }

  //CSS button error
  function onMouseLeaveShakeOff(){
      setShake(false)
  }
  console.log(questions)
  console.log(category)

  const toggleStart = (event) => {
    
    setCategory(() => {
      const baseCategory = "https://opentdb.com/api.php?amount=5"
      return baseCategory + `&category=${event.target.value}`
    })
    setGameStarted(!gameStarted)
    setGameOver(false)
    setQuestions([])
    
  }


  return (
    <>
    { 
      <div className="mainContainer">
      {
      gameStarted && questions.length > 0
      ?
      <>
      <Header startGameHandler={toggleStart}/>
      <div className="appContainer">
        <Trivia questions={questions} 
        handleClick={questionSelection} 
        answeredCount={answeredCount} 
        correctAnswersGiven={correctAnswersGiven}
        startGameHandler={toggleStart}
        error={error} 
        shake={shake}
        gameOver={gameOver}
        checkAnswers={checkAnswers}
        onMouseLeaveShakeOff={onMouseLeaveShakeOff}/>
      </div>
      </>
      :
      <StartPage startGameHandler={toggleStart}/>
      }

    </div>}
    </>
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