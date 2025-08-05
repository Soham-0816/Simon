let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"]; 

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("high-score").innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function() {
     if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
     }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns (idx) {
    if (userSeq[idx] === gameSeq[idx]) {
       if (userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 500);
       }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
   let btn = this;
   userFlash(btn);

   useColor = btn.getAttribute("id");
   userSeq.push(useColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        document.getElementById("high-score").innerText = `High Score: ${highScore}`;
    }

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

document.getElementById("reset-btn").addEventListener("click", function () {
    const confirmReset = confirm("Are you sure you want to reset your high score?");
    if (confirmReset) {
        localStorage.removeItem("highScore");
        highScore = 0;
        document.getElementById("high-score").innerText =`High Score: 0`;
        alert("High score has been reset.");
    }
});

