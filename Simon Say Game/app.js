let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h4 = document.querySelector("h4");
let scoreDisplay = document.querySelector("#score");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameseq = [];
        userseq = [];
        h4.innerText = "LEVEL 0";
        scoreDisplay.innerText = "Score: 0";
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userseq = []; // Clear user input for new level
    level++;
    h4.innerText = `LEVEL ${level}`;
    scoreDisplay.innerText = `Score: ${level - 1}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    gameflash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h4.innerText = `❌ Game Over! You reached Level ${level}. Press any key to restart.`;
        scoreDisplay.innerText = `Final Score: ${level - 1}`;
        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        resetGame();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}
