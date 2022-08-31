
export function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export function createRandomNumbersArray(containerArray, maxNum){
    if(containerArray.length === maxNum){
        return containerArray 
    }
    let randNum = Math.floor(Math.random()*maxNum)
    if(!containerArray.includes(randNum)){
        containerArray.push(randNum)
    }
    createRandomNumbersArray(containerArray, maxNum)
}

export function shuffleAnswers(answers) {
    let randomNumbersContainer = []
    createRandomNumbersArray(randomNumbersContainer, answers.length)
    let shuffledAnswers = []
    for(let i = 0; i < answers.length; i++){
        shuffledAnswers[randomNumbersContainer[i]] = answers[i]
    }
    return shuffledAnswers;
}