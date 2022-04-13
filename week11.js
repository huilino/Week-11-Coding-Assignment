let boxes = document.querySelectorAll(".box");
let display = document.getElementById("display");
let overlay = document.getElementById("overlay");
let restartBtn = document.getElementById("btn-restart");
let quitBtn = document.getElementById("btn-quit");
let currentTurn = "Player X";
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let wonArray;

// once box is clicked, the value cannot be changed
boxes.forEach((box) => {
    box.addEventListener("click", startGame, {once: true});
});

restartBtn.addEventListener("click", restart);
quitBtn.addEventListener("click", quit);

// Re-start game
function restart(){
    display.innerText = "Player X`s Turn";
    overlay.classList.remove("active");

    boxes.forEach((box) => {
        box.classList.remove("cross");
        box.classList.remove("cross-hover");
        box.classList.remove("circle");
        box.classList.remove("circle-hover");
        box.classList.remove("highlight");
        box.style.cursor = "pointer";
        box.removeEventListener("click", startGame);
        box.addEventListener("click", startGame, {once: true});
    });

}

// Quit game
function quit(){
    window.close();
}

// Game start when one of the box is clicked
function startGame(){

    let currentClass = currentTurn === "Player X" ? "cross" : "circle";
    this.classList.add(currentClass);

    if (isWinner(currentClass)){
        display.innerText = `${currentTurn} Won !!!`;
        wonArray.forEach((i) => boxes[i].classList.add("highlight"));
        
        reset();
        return;

    } else {
        // If the boxes are filled with 2 X`s or 2 O`s, it is a draw.
        let tie = Array.from(boxes).every((box) => {
            
            return box.classList.length === 2;
        });
        if(tie){
            display.innerText = `It is a TIE!!!`;
            
        reset();
        return;
        }
    }
   
    currentTurn === "Player X" 
    ? (currentTurn = "Player O")
    : (currentTurn = "Player X");

    display.innerText = `${currentTurn}'s Turn!`;
}


function isWinner(currClass){
     return winningCombination.some((win) => {
         let possibility = win.every((i) => boxes[i].classList.contains(currClass));
       
    if(possibility){
            wonArray = win;   
        }
        
    return possibility;
     });
}

function reset(){
    boxes.forEach((box) => {
        box.style.cursor = "not-allowed";
        box.removeEventListener("click",startGame);
    });

    setTimeout(() => {
        overlay.classList.add("active");
    }, 1000);

}



        
