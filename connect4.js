/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const startbtn = document.querySelector('#gameStart');
const restartbtn = document.querySelector('#restart')
let gameOver = false;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */






function resetBoard(){
  //Resets all values in the board then makes a new one
  for(let i = 0; i < HEIGHT; i++){
    board.pop()
  }

  //Deletes HtmlBoard then makes a new one
  let tbl = document.getElementById('board');
  if(tbl) tbl.parentNode.removeChild(tbl);
  let div = document.querySelector('#game')
  let newBoard = document.createElement('table');
  newBoard.setAttribute('id', 'board')
  div.appendChild(newBoard)

  gameOver = false

}
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // for(let i = 0; i < HEIGHT; i++){
  //   board[i] = new Array(WIDTH);
  // }
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}



function makeHtmlBoard() {
  //get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')

  // sets top to item in html with id 'tr' and gives it an event listner and sets an id
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
//creats top cells and appends them to 'top' element then appends it all top the board
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // creates all other board cells and gives them an id based off their index on the matrix
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
      return null 


}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //if gameover then exit function
  if(!gameOver){
  //Creates piece element and adds its classes
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`player-${currPlayer}`);
  
  //gets var for the tr where piece needs to be appened
  const spot = document.getElementById(`${y}-${x}`)
  spot.append(piece)
  }
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
  //Sets game over to true so players can keep placing peices
  gameOver = true;
  restartbtn.classList.remove('hidden')
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }


  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }


 

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

   // switch players
  // switch currPlayer 1 <-> 2
 currPlayer = currPlayer === 1 ? 2 : 1;
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


restartbtn.addEventListener('click', (e)=>{
  e.preventDefault();
  resetBoard();
  makeBoard();
makeHtmlBoard();

})

startbtn.addEventListener('click', (e)=>{
  e.preventDefault();
  makeBoard();
makeHtmlBoard();
startbtn.classList.add('hidden')

})


