const startBtn = document.getElementById("btn");
const circle = document.getElementById("circle");
const redCircle = document.getElementById("redCircle");
const timerDisplay = document.getElementById("tmr");
const scoreboard = document.getElementById("score");
const finalscore = document.getElementById("finalscore");
const delta = document.getElementById("delta");

let totalTime = 30000;
let timerInterval;
let times = [];
let wrongTimes = [];
circle.style.display = "none";
redCircle.style.display = "none"
function updateTimer() {
  let seconds = Math.floor(totalTime / 1000);
  let milliseconds = Math.floor((totalTime % 1000) / 10); 


  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  timerDisplay.textContent = seconds + ":" + milliseconds;

  if (totalTime > 0) {
    totalTime -= 10; 
  } else {
    clearInterval(timerInterval);
    timerDisplay.textContent = "0:00";
    startBtn.style.display = "inline-block";
    finalscore.style.display = "inline-block";
    circle.style.display = "none";
    redCircle.style.display = "none";
    timerDisplay.textContent = "Timer"
    finalscore.textContent = "Score: " + (times.length - wrongTimes.length)
    return;
  }
}

function randomPos(greenOrRed){

  let randomTop = Math.floor(Math.random() * 80+10);
  let randomLeft = Math.floor(Math.random() * 80+10);
  let RrandomTop = Math.floor(Math.random() * 80+10);
  let RrandomLeft = Math.floor(Math.random() * 80+10);

  circle.style.top = randomTop + "%";
  circle.style.left = randomLeft + "%";
  redCircle.style.top = RrandomTop + "%";
  redCircle.style.left = RrandomLeft + "%"

  if(greenOrRed == "green"){
    times.push(timerDisplay.textContent); 
    scoreboard.textContent = "Score: " + (times.length - wrongTimes.length);
  }
  else if (greenOrRed=="red"){
    wrongTimes.push(timerDisplay.textContent);
    scoreboard.textContent = "Score: " + (times.length - wrongTimes.length);
  }
  

}
startBtn.addEventListener("click", function() {
  startBtn.style.display = "none";
  finalscore.style.display = "none";
  circle.style.display = "inline-block";
  redCircle.style.display = "inline-block";
  totalTime = 10000;
  timerInterval = setInterval(updateTimer, 10);
  times = [];
  randomPos();
});

circle.addEventListener("mouseover",()=>{
  randomPos("green")
});
redCircle.addEventListener("mouseover",()=>{
  randomPos("red")
});