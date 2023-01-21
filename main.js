const X_cLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNEING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const WinningMessageElement = document.getElementById("winningMessage");
const WinningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartBUtton = document.getElementById("restartButton");


let circleTurn;
startGame();

restartBUtton.addEventListener("click", () => {
  startGame();})

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_cLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick   );
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  WinningMessageElement.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target;

  const currentClass = circleTurn ? CIRCLE_CLASS : X_cLASS;
  // step 1 place mark
  placeMark(cell, currentClass);
  // step 2 check of wins
  if (checkWin(currentClass)) {
    endGame(false)
    }
  // step 4 check of draw
  else if (isDraw()){
    endGame(true)
  }
  // step 5 switch turns
  else{
    swapTurns();
    setBoardHoverClass()
  }

  
  
  
}

function endGame(draw){
    if(draw){
     WinningMessageTextElement.innerText= "draw!";
}else{
    WinningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;

}
WinningMessageElement.classList.add('show');

}

function isDraw(){
    // destructured the cleeElement into a array 
    return [...cellElements].every(cell => {
     return cell.classList.contains(X_cLASS) || cell.classList.contains(CIRCLE_CLASS);
     
    })}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_cLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_cLASS);
  }
}

function checkWin(currentClass) {
  return WINNEING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
