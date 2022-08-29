import React from 'react'

const StartPage = (props) => {
    return (
    <div className="start_container">
        <h1>TRIVIA</h1>
        <h3>Test your knowledge</h3>
        <div className="categories">
            <h3 className="cat_selection">Select a category</h3>
        <button className="categoryButton" value={17} onClick={props.startGameHandler}>Science and Nature</button>
        <button className="categoryButton" value={24} onClick={props.startGameHandler}>Politics</button>
        <button className="categoryButton" value={21} onClick={props.startGameHandler}>Sport</button>
        <button className="categoryButton" value={22} onClick={props.startGameHandler}>Geography</button>
        <button className="categoryButton col-span-2" value={''} onClick={props.startGameHandler}>All categories</button>
        </div>
    </div>
    )
}

export default StartPage