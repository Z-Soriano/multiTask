let typedText = "";
let targetText = "";
const quoteEl = document.getElementById("quote");
const leftSide = document.getElementById("leftText")
const rightSide = document.getElementById("rightText")
let whichRL = "Lwords.json"
let start = 0
let end = 0
const elapsedTime = document.getElementById("elapsedTime")
function nextWord(RL) {
    if(RL){
        whichRL = "Lwords.json"
    }
    else{
        whichRL = "Rwords.json"
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

document.addEventListener("keydown", (event) => {
  if (!targetText) return;
  if (event.key === "Backspace") {
    typedText = typedText.slice(0, -1);
  } else if ((event.key.length === 1 || event.key == "Space") && typedText.length < targetText.length) {
    typedText += event.key;
  }
  if(typedText.length==1){
    start = Date.now()
  }
  renderText();

  if (typedText === targetText) {
    end = Date.now()
    let timeSpent = 15/((end-start)/1000/60)
    timeSpent = Math.round(timeSpent*100)/100
    elapsedTime.textContent = "WPM: " + timeSpent
    if(whichRL=="Lwords.json"){
        nextWord(true);
    }
    else{
        nextWord(false);
    }
    
  }
});


leftSide.addEventListener("click",()=>{
    nextWord(true)
});

rightSide.addEventListener("click",()=>{
    nextWord(false)
});