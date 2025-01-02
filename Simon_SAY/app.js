
document.addEventListener("DOMContentLoaded", function () {
    // Check if the player has visited prepg.html
    const visitedPrepg = localStorage.getItem("visitedPrepg");

    if (!visitedPrepg) {
        // Redirect to prepg.html if not visited
        window.location.href = "prepg.html";
    }
});
let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");
let scoreValue = document.getElementById("scoreValue");
let messageDisplay = document.getElementById("message");

// Check if prepg.html should redirect to index.html
if (window.location.pathname.endsWith("prepg.html")) {
    // Redirect to index.html after 3 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}

// Start the game when a key is pressed
document.addEventListener("keypress", function () {
    if (!started && window.location.pathname.endsWith("index.html")) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log("Game sequence:", gameSeq);

    if (randBtn) {
        gameFlash(randBtn);
    } else {
        console.error(`Button with class ${randColor} not found.`);
    }
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Player loses the game
        h2.innerHTML = `Game over! Your score was <b>${level}</b>.`;

        // Display the score and "Better Luck Next Time!" message
        // scoreDisplay.style.display = "block";
        // scoreValue.textContent = level;

        // messageDisplay.classList.add("show");

        // Add a log to verify redirection is triggered
        console.log("Player lost. Redirecting to prepg.html...");

        // Redirect back to prepg.html after showing the message
        setTimeout(() => {
            localStorage.removeItem("visitedPrepg"); // Clear flag for the next game
            window.location.href = "prepg.html";
        }, 2000); // Adjust the delay as needed
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000); // Adjust the delay as needed
}



