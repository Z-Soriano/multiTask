let typedText = "";
let targetText = "";
const quoteEl = document.getElementById("quote");
const leftSide = document.getElementById("leftText")
const rightSide = document.getElementById("rightText")
const justText = document.getElementById("justText")
let whichRL = "Lwords.json"
let start = 0
let end = 0
const elapsedTime = document.getElementById("elapsedTime")
const accuracyId = document.getElementById("accuracy")
function nextWord(RL) {
    if(RL){
        whichRL = "Lwords.json"
        quoteEl.classList.add("onLeft")
        quoteEl.classList.remove("onRight")
        elapsedTime.classList.add("onLeft")
        elapsedTime.classList.remove("onRight")
        accuracyId.classList.add("onLeft")
        accuracyId.classList.remove("onRight")
    }
    else if(RL == false){
        whichRL = "Rwords.json"
        quoteEl.classList.add("onRight")
        quoteEl.classList.remove("onLeft")
        elapsedTime.classList.add("onRight")
        elapsedTime.classList.remove("onLeft")
        accuracyId.classList.add("onRight")
        accuracyId.classList.remove("onLeft")
    }
    else if(RL == null){
      whichRL = "words.json"
      quoteEl.classList.remove("onLeft")
      quoteEl.classList.remove("onRight")
      elapsedTime.classList.remove("onLeft")
      elapsedTime.classList.remove("onRight")
      accuracyId.classList.remove("onLeft")
      accuracyId.classList.remove("onRight")
    }

    fetch(whichRL)
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
function getCorrectCharCount() {
  let correctCount = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctCount++;
    }
  }

  return correctCount;
}
document.addEventListener("keydown", (event) => {
  if (!targetText) return;
  //if (event.key === "Backspace") {
  //  typedText = typedText.slice(0, -1);
  /*} else */if ((event.key.length === 1 || event.key == "Space") && typedText.length < targetText.length) {
    typedText += event.key;
  }
  if(typedText.length==1){
    start = Date.now()
  }
  renderText();

  if (typedText.length === targetText.length) {
    end = Date.now()
    let timeSpent = (targetText.length/5)/((end-start)/1000/60)
    timeSpent = Math.round(timeSpent*100)/100
    let accuracy = getCorrectCharCount()/targetText.length
    accuracy *= 100
    accuracy = Math.round(accuracy*100)/100
    elapsedTime.textContent = "WPM: " + timeSpent
    accuracyId.textContent = "Accuracy: " + accuracy + "%"

    if(whichRL=="Lwords.json"){
        nextWord(true);
    }
    else if(whichRL=="Rwords.json"){
        nextWord(false);
    }
    else{
        nextWord();
    }
    
  }
});


leftSide.addEventListener("click",()=>{
    nextWord(true)
});

rightSide.addEventListener("click",()=>{
    nextWord(false)
});

justText.addEventListener("click",()=>{
    nextWord()
});
// Get the elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");

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
