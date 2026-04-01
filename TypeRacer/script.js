let typedText = "";
let targetText = "";
let whichRL = "Lwords.json" //standard json is leftside json file
let start = 0
let end = 0
let circleRL = null
let typed = null

const quoteEl = document.getElementById("quote"); //what user will type
//dropdown buttons for game versions
const leftSide = document.getElementById("leftText") 
const rightSide = document.getElementById("rightText")
const justText = document.getElementById("justText")
//stats
const elapsedTime = document.getElementById("elapsedTime")
const accuracyId = document.getElementById("accuracy")


// Get the elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");

// aimtrain vars
const startBtn = document.getElementById("btn");
const circle = document.getElementById("circle");
const redCircle = document.getElementById("redCircle");
const timerDisplay = document.getElementById("tmr");
const scoreboard = document.getElementById("score");
const finalscore = document.getElementById("finalscore");
const delta = document.getElementById("delta");

function defaultState(){
  elapsedTime.style.display = "none"
  accuracyId.style.display = "none"
  quoteEl.style.display = "none"
  circle.style.display = "none";
  redCircle.style.display = "none"
  timerDisplay.style.display = "none"
  scoreboard.style.display = "none"
  finalscore.style.display = "none"
}
defaultState()
//game listener
leftSide.addEventListener("click",()=>{
    defaultState()
    nextWord(true)

    quoteEl.style.display = "inline-block"

    elapsedTime.style.display = "inline-block"
    accuracyId.style.display = "inline-block"
    
    end = 0

    circleRL = "Right"
    finalscore.style.display = "none";
    /*
    circle.style.display = "inline-block";
    redCircle.style.display = "inline-block";
    */
    timerDisplay.style.display = "inline-block"
    scoreboard.style.display = "inline-block"
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

    elapsedTime.style.display = "inline-block"
    accuracyId.style.display = "inline-block"
    
    end = 0

    circleRL = "Left"
    finalscore.style.display = "none";
    /*
    circle.style.display = "inline-block";
    redCircle.style.display = "inline-block";
    */
    timerDisplay.style.display = "inline-block"
    scoreboard.style.display = "inline-block"
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

    elapsedTime.style.display = "inline-block"
    accuracyId.style.display = "inline-block"
});
startBtn.addEventListener("click", function() {
    defaultState()
    finalscore.style.display = "none";
    circle.style.display = "inline-block";
    redCircle.style.display = "inline-block";
    timerDisplay.style.display = "inline-block"
    scoreboard.style.display = "inline-block"

    totalTime = 10000;
    timerInterval = setInterval(updateTimer, 10);
    times = [];
    randomPos();
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
    elapsedTime.classList.add("onLeft")
    elapsedTime.classList.remove("onRight")
    accuracyId.classList.add("onLeft")
    accuracyId.classList.remove("onRight")
  }
  else if(RL == false){ //right side
      whichRL = "Rwords.json"
      quoteEl.classList.add("onRight")
      quoteEl.classList.remove("onLeft")
      elapsedTime.classList.add("onRight")
      elapsedTime.classList.remove("onLeft")
      accuracyId.classList.add("onRight")
      accuracyId.classList.remove("onLeft")
  }
  else if(RL == null){ //full
    whichRL = "words.json"
    quoteEl.classList.remove("onLeft")
    quoteEl.classList.remove("onRight")
    elapsedTime.classList.remove("onLeft")
    elapsedTime.classList.remove("onRight")
    accuracyId.classList.remove("onLeft")
    accuracyId.classList.remove("onRight")
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
  if(typed==true && circle.style.display == "none"){
    circle.style.display = "inline-block"
    redCircle.style.display = "inline-block"
  }
  if(typedText.length==1){
    start = Date.now() //captures the time the first key is pressed
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
    timerDisplay.textContent = seconds

    if(circle.style.display!="none"){
      circle.style.display = "none"
      redCircle.style.display = "none"
      typed = false
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
//aimtrain logic
let totalTime = 30000;
let timerInterval;
let times = [];
let wrongTimes = [];

function updateTimer() {
  let seconds = Math.floor(totalTime / 1000);
  let milliseconds = Math.floor((totalTime % 1000) / 10); 


  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  timerDisplay.textContent = seconds + ":" + milliseconds;
  //stops timer
  if(timerDisplay.style.display == "none"){
    timerDisplay.textContent = "0:00"
    return;
  }
  if (totalTime > 0) {
    totalTime -= 10; 
  } else {
    clearInterval(timerInterval);
    timerDisplay.textContent = "0:00";
    finalscore.style.display = "inline-block";
    circle.style.display = "none";
    redCircle.style.display = "none";
    timerDisplay.textContent = "Timer"
    finalscore.textContent = "Score: " + (times.length - wrongTimes.length)
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
