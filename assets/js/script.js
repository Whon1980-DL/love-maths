// wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            // this = button in this case
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type")
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");

})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's amswer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = ("");
    // Enable the cursor to be in the ansewr-box everytime the runGame function is called
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);    
    } else if (gameType === "division") {
        num1 = num1 * num2;
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        // "throw" keyword will stop the game from running and print keyword in the console for debugging
        throw `unknown game type: ${gameType}. Aborting!`;
    }   

}

/**
 * Checks the answer against the first element in 
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    // CLear answer input field after entering value
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right!:D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus stc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    // parseInt ensure the value that is returned from DOM is an integer and not a string
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"]; 
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplmeneted operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and incremnents it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Gets the current tally of incorrect answers from the DOM and incremnents it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById(`operand1`).textContent = operand1;
    document.getElementById(`operand2`).textContent = operand2;
    document.getElementById(`operator`).textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    // Use of ternary operator to shorten the chekcing condition
    document.getElementById(`operand1`).textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById(`operand2`).textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById(`operator`).textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById(`operand1`).textContent = operand1;
    document.getElementById(`operand2`).textContent = operand2;
    document.getElementById(`operator`).textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById(`operand1`).textContent = operand1;
    document.getElementById(`operand2`).textContent = operand2;
    document.getElementById(`operator`).textContent = "/";
}

