// Get DOM elements
const eightBall = document.getElementById("eightBall");
const clickSound = new Audio('click_sound.mp3'); /* Provide your own click sound file */
const crashSound = new Audio('909crsh.wav');
const input = document.getElementById("user-input");
const responseElement = document.getElementById("response");
const clearButton = document.getElementById("clear-button");

// Set constants
const SHORT_SHAKE_DURATION = 200;
const LONG_SHAKE_DURATION = 1000;
const HISTORY_LOCAL_STORAGE_KEY = "history";

// Initialize variables
let timeouts = [];
let history = [];
const responses = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes, definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];

// Clear all timeouts
function clearTimeouts() {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

// Get a random response
function getAnswer() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Update the response text with a random answer
function updateResponseText() {
    const responseElement = document.getElementById("response");
    responseElement.innerText = getAnswer();
}

// Cycle through responses to simulate randomization
function cycleResponses() {
    const interval = 100;
    const duration = 1000;
    let cycles = duration / interval;
    updateResponseText();
    let intervalId = setInterval(() => {
        updateResponseText();
        cycles--;

        if (cycles <= 0) {
            clearInterval(intervalId);
            clickSound.pause();
            crashSound.play();
            let userInput = document.getElementById("user-input").value;
            appendResultRow(userInput, responseElement.innerText);
            writeToLocalStorage(userInput, responseElement.innerText);
        }
    }, interval);
}

// Short shake animation
function shakeBallShort() {
    eightBall.style.animation = "0.1s shakeShort linear infinite";
    timeouts.push(
        setTimeout(() => {
            eightBall.style.animation = "0.7s shake linear infinite";
        }, 200)
    );
}

// Save question and response to local storage
function writeToLocalStorage(question, response) {
    history.push({
        question: question,
        response: response
    });
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
}

// Append a new row to the results table
function appendResultRow(question, response) {
    const resultsBody = document.getElementById("results-body");
    const newRow = resultsBody.insertRow(0);
    const questionCell = newRow.insertCell(0);
    const responseCell = newRow.insertCell(1);
    questionCell.innerText = question;
    responseCell.innerText = response;
}

// This function starts the shaking animation of the 8-ball, and determines whether to use a long or short shake duration based on whether or not the user has entered a question.
function shakeBall(userInput) {
    let shakeDuration = LONG_SHAKE_DURATION;
    eightBall.style.animationPlayState = "running";

    if (!userInput) {
        shakeDuration = SHORT_SHAKE_DURATION;
        shakeBallShort();
    } else {
        cycleResponses();
    }

    // Adds a timeout to pause the shaking animation after the appropriate shake duration has elapsed.
    timeouts.push(
        setTimeout(() => {
            eightBall.style.animationPlayState = "paused";
        }, shakeDuration)
    );
}

// This event listener is triggered when the user clicks on the 8-ball image.
eightBall.addEventListener('click', () => {
    clickSound.pause();
    crashSound.pause();

    clearTimeouts();

    // Gets the user's question from the input element on the page.
    let userInput = document.getElementById("user-input").value;

    // If the user hasn't entered a question, displays an error message and clears it after a short delay.
    if (userInput === "") {
        const responseElement = document.getElementById("response");

        timeouts.push(
            setTimeout(() => {
                responseElement.innerText = "Please enter your question";
            }, SHORT_SHAKE_DURATION)
        );

        timeouts.push(
            setTimeout(() => {
                response.innerText = "";
            }, 2000)
        );
    } else {
        // If the user has entered a question, plays a clicking sound effect.
        clickSound.currentTime = 0;
        crashSound.currentTime = 0;
        clickSound.play();
    }

    // Starts the shaking animation of the 8-ball.
    shakeBall(userInput);
});

// This function clears the table of past results.
function clearTable() {
    const resultsBody = document.getElementById("results-body");

    // Removes all rows from the table body element.
    while (resultsBody.firstChild) {
        resultsBody.firstChild.remove();
    }

    // Clears the history array and updates the local storage.
    history = [];
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
}

// This event listener is triggered when the clear button is clicked.
clearButton.addEventListener("click", clearTable);

// This function is called when the page loads.
window.onload = function () {
    // Loads the history array from local storage, or initializes it to an empty array if there is no data in local storage.
    let loadedHistory = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY);
    if (loadedHistory == null) {
        history = [];
        localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
    } else {
        history = JSON.parse(loadedHistory);

        // Appends a row to the results table for each item in the history array.
        history.map((historyItem) => {
            appendResultRow(historyItem.question, historyItem.response);
        })
    }
}
