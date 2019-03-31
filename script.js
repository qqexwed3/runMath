var point = 0;
var pos = 960;
var max = 10;
var round = 1;
var bgSound;
var soundEnd; 
function gameStart() {
    var result = getRandom()
    bgSound = new sound('SurrealChase.mp3');
    bgSound.play();
    var elem = document.getElementById("animate");
    var id = setInterval(frame, 5);
    function frame() {
        if (point == 10) {
            round = 2;
            max = 15;
        } else if (point == 20) {
            round = 3;
            max = 20;
        } else if (point == 30) {
            round = 4;
            max = 30;
        }else if (point == 40) {
            round = 5;
            max = 30;
        }
        if (pos <= 0) {
            clearInterval(id);
            localStorage.setItem("totalscore", point);
            document.location.href = "over.html";
        } else {
            if (checkAns()) {
                result = getRandom()
                pos += 100 * round;
                elem.style.right = pos + "px";
                elem.style.left = pos + "px";
            } else {
                pos -= 0.4 * round;
                elem.style.right = pos + "px";
                elem.style.left = pos + "px";
            }
        }
    }
    
}
function checkAns() {
    var num1 = document.getElementById("num1").innerHTML;
    var num2 = document.getElementById("num2").innerHTML;
    var operator = document.getElementById("operator").innerHTML;
    var number1 = parseInt(num1);
    var number2 = parseInt(num2);
    var result = 0;
    if (operator == "+") {
        result = number1 + number2
    } else {
        result = number1 - number2
    }
    var ans = document.getElementById("answer").value;
    console.log(result + " " + ans)
    if (ans == result) {
        point++;
        score.innerHTML = point
        document.getElementById("answer").value = "";
        return true
    }
    return false
}
function getRandom() {
    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");
    var operator = document.getElementById("operator");
    var ran1 = Math.floor(Math.random() * max);
    num1.innerHTML = ran1
    var ran2 = Math.floor(Math.random() * max);
    num2.innerHTML = ran2
    var operate = ["+", "-"];
    var ranOpe = Math.floor(Math.random() * 2);
    operator.innerHTML = operate[ranOpe]
    if (ranOpe === 1) {
        if (ran1 < ran2) {
            num1.innerHTML = ran2
            num2.innerHTML = ran1
        }
    }
}
function backHome() {
    window.location.href = ""
}
function openGame() {
    window.location.href = "runMath.html"
}
function gameOver() {
    var totalScore = document.getElementById('showTotalScore');
    totalScore.innerHTML = localStorage.getItem("totalscore");
    soundEnd = new sound('oversound.wav');
    soundEnd.play();
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