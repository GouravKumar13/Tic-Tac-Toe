const X_cLASS = "x";
const CIRCLE_CLASS = "circle";
// array of all the winning combination
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
// this select all the cells
const cellElements = document.querySelectorAll("[data-cell]");
// this select the board
const board = document.getElementById("board");
// this select the winning message div
const WinningMessageElement = document.getElementById("winningMessage");
// this select the winning message text
const WinningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
// this select the restart button
const restartBUtton = document.getElementById("restartButton");

let circleTurn;

// calling the startGame function
startGame();

// adding event listner to restart button
restartBUtton.addEventListener("click", () => {
  startGame();
});

// defining the startGame function
function startGame() {
  circleTurn = false; //this is for starting the game from player X
  cellElements.forEach((cell) => {
    cell.classList.remove(X_cLASS); // this is for removing the X class from all the cells
    cell.classList.remove(CIRCLE_CLASS); //this is for removing the circle class from all the cells
    cell.removeEventListener("click", handleClick); //this is for removing the click event from all the cells
    cell.addEventListener("click", handleClick, { once: true });
  });
  
  setBoardHoverClass();
  WinningMessageElement.classList.remove("show");//this is for removing the show class from the winning message div

}

// this is the click handler function
function handleClick(e) {
  //this is to target all the cells
  const cell = e.target;

  //the currentClass is to check if the current cell is X or circle

  const currentClass = circleTurn ? CIRCLE_CLASS : X_cLASS;
  // step 1 place mark
  placeMark(cell, currentClass);
  // step 2 check of wins
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // step 4 check of draw
  else if (isDraw()) {
    endGame(true);
  }
  // step 5 switch turns
  else {
    swapTurns();
    setBoardHoverClass();
  }
}

this is for anouncing the result ie wether it is a win or a draw
function endGame(draw) {
  if (draw) {
    WinningMessageTextElement.innerText = "draw!";
  } else {
    WinningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
  }
  WinningMessageElement.classList.add("show");
}

// this check that all the cells are filled with either X-class or circle-class 
function isDraw() {
  // destructured the cleeElement into a array
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_cLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// this function added the active class to the cell element
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

//this is to remove the hover class from all the cells and the show the hover class for only that element that is active
function setBoardHoverClass() {
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_cLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_cLASS);
  }
}

// this function checks if its a win 
function checkWin(currentClass) {
  return WINNEING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
