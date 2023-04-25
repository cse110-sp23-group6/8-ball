const eightBall = document.getElementById("eightBall");
const clickSound = new Audio('click_sound.mp3'); /* Provide your own click sound file */
const crashSound = new Audio('909crsh.wav');
const input = document.getElementById("user-input");

const responseElement = document.getElementById("response");

const SHORT_SHAKE_DURATION = 200;
const LONG_SHAKE_DURATION = 1000;

const HISTORY_LOCAL_STORAGE_KEY = "history";

let timeouts = [];

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

let history = [];

const clearButton = document.getElementById("clear-button");

function clearTimeouts() {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }

    timeouts = [];
}

function getAnswer() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function updateResponseText() {
    const responseElement = document.getElementById("response");
    responseElement.innerText = getAnswer();
}

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

function shakeBallShort() {
    eightBall.style.animation = "0.1s shakeShort linear infinite";
    timeouts.push(
        setTimeout(() => {
            eightBall.style.animation = "0.7s shake linear infinite";
        }, 200)
    );
}

function writeToLocalStorage(question, response) {
    history.push({
        question: question,
        response: response
    });

    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
}

function appendResultRow(question, response) {
    const resultsBody = document.getElementById("results-body");
    const newRow = resultsBody.insertRow(0);
    const questionCell = newRow.insertCell(0);
    const responseCell = newRow.insertCell(1);
    questionCell.innerText = question;
    responseCell.innerText = response;
}

function shakeBall(userInput) {
    let shakeDuration = LONG_SHAKE_DURATION;
    eightBall.style.animationPlayState = "running";

    if (!userInput) {
        shakeDuration = SHORT_SHAKE_DURATION;
        shakeBallShort();
    } else {
        cycleResponses();
    }

    timeouts.push(
        setTimeout(() => {
            eightBall.style.animationPlayState = "paused";
        }, shakeDuration)
    );
}

eightBall.addEventListener('click', () => {
    clickSound.pause();
    crashSound.pause();

    clearTimeouts();

    let userInput = document.getElementById("user-input").value;
    
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
        clickSound.currentTime = 0;
        crashSound.currentTime = 0;
        clickSound.play();
    }
    
    shakeBall(userInput);
});


function clearTable() {
    const resultsBody = document.getElementById("results-body");
    while (resultsBody.firstChild) {
        resultsBody.firstChild.remove();
    }

    history = [];
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
}

window.onload = function() {
    let loadedHistory = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY);
    if (loadedHistory == null) {
        history = [];
        localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(history));
    } else {
        history = JSON.parse(loadedHistory);

        history.map((historyItem) => {
            appendResultRow(historyItem.question, historyItem.response);
        })
    }
}

clearButton.addEventListener("click", clearTable);
