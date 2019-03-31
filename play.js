var checkpoint = 0;
var score;
var mySound;
var myHomeSound;
var soundCorrect;
var soundIncorrect;
var soundEnd;


function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startGame() {
    score = 0;
    startTime();
    updateQuestion();
    mySound = new sound("bgSound.mp3");
    mySound.play();
}

function playSound() {
    myHomeSound = new sound("homeSound.mp3");
    myHomeSound.play();
}

function correct() {
    soundCorrect = new sound("correct.mp3");
    soundCorrect.play();
}

function inCorrect() {
    soundIncorrect = new sound("incorrect.wav");
    soundIncorrect.play();
}



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


function updateQuestion() {

    checkpoint++;
    clearAnswer();
    updateStatus();

    console.log("level " + checkpoint);

    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");
    var operator = document.getElementById("operator")
    // var answer = document.getElementById("answer").value;

    var choice1 = document.getElementById("choice1");
    var choice2 = document.getElementById("choice2");
    var choice3 = document.getElementById("choice3");
    var choice4 = document.getElementById("choice4");


    if (checkpoint > 20) {
        num1.innerHTML = randomRange(1, 20);
        num2.innerHTML = randomRange(1, 9);
        operator.innerHTML = "x";
    } else if (checkpoint > 15) {
        num1.innerHTML = randomRange(30, 50);
        num2.innerHTML = randomRange(10, 30);
        operator.innerHTML = "-";
    } else if (checkpoint > 10) {
        num1.innerHTML = randomRange(20, 30);
        num2.innerHTML = randomRange(20, 30);
        operator.innerHTML = "+";

    } else {
        num1.innerHTML = randomRange(10, 20);
        num2.innerHTML = randomRange(10, 20);
        operator.innerHTML = "+";
    }


    if (checkpoint <= 15) {
        var total = parseInt(num1.innerHTML) + parseInt(num2.innerHTML);
    } else if (checkpoint > 15 && checkpoint <= 20) {
        var total = parseInt(num1.innerHTML) - parseInt(num2.innerHTML);
    } else if (checkpoint > 20) {
        var total = parseInt(num1.innerHTML) * parseInt(num2.innerHTML);
    }

    var randomAns = randomRange(1, 4);
    if (randomAns === 1) {
        choice1.innerHTML = total
    } else {
        choice1.innerHTML = total - randomRange(2, 4);
    }
    if (randomAns === 2) {
        choice2.innerHTML = total
    } else {
        choice2.innerHTML = total - randomRange(6, 8);
    }
    if (randomAns === 3) {
        choice3.innerHTML = total
    } else {
        choice3.innerHTML = total + randomRange(2, 4);
    }
    if (randomAns === 4) {
        choice4.innerHTML = total
    } else {
        choice4.innerHTML = total + randomRange(6, 8);
    }
    console.log(total)
}


function checkAnswer() {
    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");
    var answer = document.getElementById("answer").value;

    if (checkpoint <= 15) {
        var total = parseInt(num1.innerHTML) + parseInt(num2.innerHTML);
    } else if (checkpoint > 15 && checkpoint <= 20) {
        var total = parseInt(num1.innerHTML) - parseInt(num2.innerHTML);
    } else if (checkpoint > 20) {
        var total = parseInt(num1.innerHTML) * parseInt(num2.innerHTML);
    }
    // checkpoint++;

    if (parseInt(answer) === total) {
        score++;
        localStorage.setItem("totalscore", score);
        console.log('correct')
        correct();
        if (checkpoint >= 25) {
            window.location.href = "end.html";
        } else {
            updateQuestion()
        }
    } else {
        localStorage.setItem("totalscore", score);
        console.log('incorrect')
        inCorrect();
        if (checkpoint >= 25) {
            window.location.href = "end.html";
        } else {
            updateQuestion()
        }
    }
}

function clearAnswer() {
    var answer = document.getElementById("answer");
    answer.value = "";
}

function updateStatus() {
    document.getElementById('showLevel').innerHTML = checkpoint;
    document.getElementById('showScore').innerHTML = score;
}

document.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('Text', event.target.innerHTML);

});

function gameOver() {
    var totalScore = document.getElementById('showTotalScore');
    totalScore.innerHTML = localStorage.getItem("totalscore");

    soundEnd = new sound("end.wav");
    soundEnd.play();
}

var startTime = () => {
    var seconds = 120, $seconds = document.querySelector('#countdown');
    (function countdown() {
        $seconds.textContent = seconds + ' s '
        if (seconds-- > 0) {
            setTimeout(countdown, 1000)
        } else {
            localStorage.setItem("totalscore", score);
            console.log('timeout');
            window.location.href = "end.html"
        }
    })();


}

