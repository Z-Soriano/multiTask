let typedText = "";
let targetText = "";
let whichRL = "Lwords.json" //standard json is leftside json file
let start = 0
let end = 0
let circleRL = null
let typed = null

//aimtrain logic
let totalTime = 30000;
let timerInterval;
let times = [];
let wrongTimes = [];
let timeout0 = 0;
let timeout1 = 0;
let timeout2 = 0;

const quoteEl = document.getElementById("quote"); //what user will type
//dropdown buttons for game versions
const leftSide = document.getElementById("leftText") 
const rightSide = document.getElementById("rightText")
const justText = document.getElementById("justText")
//stats
const elapsedTime = document.getElementById("elapsedTime")
const accuracyId = document.getElementById("accuracy")
const timerDisplay = document.getElementById("tmr");
const scoreboard = document.getElementById("score");


// Get the elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");

// aimtrain vars
const startBtn = document.getElementById("btn");
const circle = document.getElementById("circle");
const redCircle = document.getElementById("redCircle");
const countdown = document.getElementById("countdown")

function toggleItem(id, show) {
  const el = document.getElementById(id);
  el.style.visibility = show ? "visible" : "hidden";
  // keeps the slot but hides the content
}

/* Usage:
toggleItem("slot-wpm", false);
toggleItem("slot-accuracy", false);
toggleItem("slot-score", true);
toggleItem("slot-timer", true);
*/
function defaultState(){
  elapsedTime.style.visibility = "hidden"
  elapsedTime.textContent = "WPM: 0"
  accuracyId.style.visibility = "hidden"
  accuracyId.textContent = "Accuracy: 0%"
  quoteEl.style.display = "none"
  circle.style.display = "none";
  redCircle.style.display = "none"
  timerDisplay.style.visibility = "hidden"
  timerDisplay.textContent = "Timer: 0:00"
  scoreboard.style.visibility = "hidden"
  scoreboard.textContent = "Score: 0"
  clearInterval(timerInterval)
  countdown.style.opacity = 0
  countdown.textContent = "3"
  clearInterval(timeout0)
  clearInterval(timeout1)
  clearInterval(timeout2)
}
defaultState()

//game listener
leftSide.addEventListener("click",()=>{
    defaultState()
    nextWord(true)

    quoteEl.style.display = "inline-block"

    elapsedTime.style.visibility = "visible"
    accuracyId.style.visibility = "visible"
    
    end = 0

    circleRL = "Right"
    /*
    circle.style.display = "inline-block";
    redCircle.style.display = "inline-block";
    */
    timerDisplay.style.visibility = "visible"
    scoreboard.style.visibility = "visible"
    /*
    totalTime = 10000;
    timerInterval = setInterval(updateTimer, 10);
    times = [];
    */
    randomPos(null, circleRL)
});

rightSide.addEventListener("click",()=>{
    defaultState()
    nextWord(false)
    quoteEl.style.display = "inline-block"

    elapsedTime.style.visibility = "visible"
    accuracyId.style.visibility = "visible"
    
    end = 0

    circleRL = "Left"
    /*
    circle.style.display = "inline-block";
    redCircle.style.display = "inline-block";
    */
    timerDisplay.style.visibility = "visible"
    scoreboard.style.visibility = "visible"
    /*
    totalTime = 10000;
    timerInterval = setInterval(updateTimer, 10);
    times = [];
    */
    randomPos(null, circleRL)
});

justText.addEventListener("click",()=>{
    defaultState()  
    nextWord()
    quoteEl.style.display = "inline-block"

    elapsedTime.style.visibility = "visible"
    accuracyId.style.visibility = "visible"
    end = 0
    circleRL = "Center"
});


startBtn.addEventListener("click", function() {
    defaultState()
    /* countdown logic for start of aimtrainer */
    countdown.style.opacity = 1
    timeout0 = setTimeout(() => {
      countdown.textContent = "2"
    }, 1000);
    timeout1 = setTimeout(() => {
      countdown.textContent = "1"
    }, 2000);
    timeout2 = setTimeout(() => {
      circle.style.display = "inline-block";
      redCircle.style.display = "inline-block";
      timerDisplay.style.visibility = "visible"
      scoreboard.style.visibility = "visible"
      countdown.style.opacity = 0
      totalTime = 10000;
      timerInterval = setInterval(updateTimer, 10);
      
      times = [];
      randomPos();
    }, 3000);
    
    
  });


// Toggle the "show" class when the button is clicked
dropdownBtn.addEventListener("click", function(e) {
  e.stopPropagation(); // Prevents the click event from bubbling up to the document
  dropdownMenu.classList.toggle("show");
});

// Close the dropdown if the user clicks outside of it
document.documentElement.addEventListener("click", function() {
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show");
  }
});

function nextWord(RL) {
  if(RL){ //left side
    whichRL = "Lwords.json"
    quoteEl.classList.add("onLeft")
    quoteEl.classList.remove("onRight")

  }
  else if(RL == false){ //right side
      whichRL = "Rwords.json"
      quoteEl.classList.add("onRight")
      quoteEl.classList.remove("onLeft")

  }
  else if(RL == null){ //full
    whichRL = "words.json"
    quoteEl.classList.remove("onLeft")
    quoteEl.classList.remove("onRight")

  }
  fetch(whichRL) //retrieve 14 words from a json file and puts it into targetText, then renders the text
  .then(res => res.json())
  .then(words => {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    for(let i=0; i<14; i++){
      randomWord = randomWord + " " +words[Math.floor(Math.random() * words.length)];
    }
    targetText = randomWord;
    typedText = "";
    renderText();
  });
}
//controls what letter we are currently trying to type and if you type it correctly
function renderText() { 
  quoteEl.innerHTML = "";

  for (let i = 0; i < targetText.length; i++) {
    const span = document.createElement("span");
    span.textContent = targetText[i];

    if (i < typedText.length) {
      span.classList.add(
        typedText[i] === targetText[i] ? "correct" : "incorrect"
      );
    }

    if (i === typedText.length) {
      span.classList.add("current");
    }

    quoteEl.appendChild(span);
  }
}

//simple get how many chatacters are typed
function getCorrectCharCount() {
  let correctCount = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctCount++;
    }
  }

  return correctCount;
}


//listens if a letter or space is pressed while length of typedtext is not equal to targetText
document.addEventListener("keydown", (event) => {
  if (!targetText || end!=0) return;
  //if (event.key === "Backspace") {
  //  typedText = typedText.slice(0, -1);
  /*} else */if ((event.key.length === 1 || event.key == "Space") && typedText.length < targetText.length) {
    typedText += event.key;
    typed = true
  }
  if(typed==true && circle.style.display == "none" && circleRL!="Center"){
    circle.style.display = "inline-block"
    redCircle.style.display = "inline-block"
  }
  if(typedText.length==1){
    start = Date.now() //captures the time the first key is pressed
    totalTime = 0
    timerInterval = setInterval(updateReverseTimer, 10);
  }
  renderText();
  //calculate wpm & accuracy
  if (typedText.length == targetText.length) {
    end = Date.now()
    let seconds = ((end-start)/1000)
    let timeSpent = (targetText.length/5)/ ((seconds)/60)
    timeSpent = Math.round(timeSpent*100)/100
    let accuracy = getCorrectCharCount()/targetText.length
    accuracy *= 100
    accuracy = Math.round(accuracy*100)/100
    elapsedTime.textContent = "WPM: " + timeSpent
    accuracyId.textContent = "Accuracy: " + accuracy + "%"
    typed = false
    if(circle.style.display!="none"){
      circle.style.display = "none"
      redCircle.style.display = "none"
    }
    //continues to the next set of words from the same json file we just read
    /*if(whichRL=="Lwords.json"){
        nextWord(true);
    }
    else if(whichRL=="Rwords.json"){
        nextWord(false);
    }
    else{
        nextWord();
    }*/
  }
});


function updateTimer() {
  let seconds = Math.floor(totalTime / 1000);
  let milliseconds = Math.floor((totalTime % 1000) / 10); 


  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  timerDisplay.textContent = "Timer: " + seconds + ":" + milliseconds;
  
  if (totalTime > 0) {
    totalTime -= 10; 
  } else {
    clearInterval(timerInterval);
    circle.style.display = "none"
    redCircle.style.display = "none"
    return;
  }
}
function updateReverseTimer(){
  if (typedText.length!=targetText.length) {
    totalTime += 10; 
    let seconds = Math.floor(totalTime / 1000);
    let milliseconds = Math.floor((totalTime % 1000) / 10);
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    timerDisplay.textContent = "Timer: " + seconds + ":" + milliseconds;

  } else {
    clearInterval(timerInterval);
    return;
  }
}
function randomPos(greenOrRed,LRcircles){

  let randomTop = Math.floor(Math.random() * 80+10);
  let randomLeft = Math.floor(Math.random() * 40+50);
  let RrandomTop = Math.floor(Math.random() * 80+10);
  let RrandomLeft = Math.floor(Math.random() * 40+50);
  if(LRcircles=="Left"){
    randomLeft = Math.floor(Math.random() * 40+10);
    RrandomLeft = Math.floor(Math.random() * 40+10);
  }
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

circle.addEventListener("mouseover",()=>{
  randomPos("green", circleRL)
});
redCircle.addEventListener("mouseover",()=>{
  randomPos("red", circleRL)
});

const helpBtn = document.getElementById("helpBtn");
const closeHelpBtn = document.getElementById("closeHelpBtn");
const helpModal = document.getElementById("helpModal");

helpBtn.addEventListener("click", () => {
  helpModal.classList.remove("noshow");
});

closeHelpBtn.addEventListener("click", () => {
  helpModal.classList.add("noshow");
});