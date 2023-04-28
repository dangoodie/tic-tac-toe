const GameBoard = function () {
  this.board = [null, null, null, null, null, null, null, null, null];

  this.playMove = (i, side) => {
    this.board[i] = side;
  };

  this.newGame = () => {
    this.board = [null, null, null, null, null, null, null, null, null];
  };
};

const playerFactory = (side) => {
  let score = 0;

  const getScore = () => score;
  const getSide = () => side;
  const win = () => {
    score += 1;
    return `${side} wins`;
  };
  const newGame = () => {
    score = 0;
    return "Reset score to 0";
  };

  return { getSide, win, getScore, newGame };
};

function GameController() {
  const x = playerFactory("x");
  const o = playerFactory("o");

  const gameBoard = new GameBoard();

  let activePlayer = x;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === x ? o : x;
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (i) => {
    if (gameBoard.board[i] !== null) {
      return;
    }
    gameBoard.playMove(i, getActivePlayer().getSide());

    // check winner here

    switchPlayerTurn();
  };

  return { getActivePlayer, playRound, board: gameBoard.board };
}

function DisplayController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");

  function updateScreen() {
    boardDiv.textContent = "";

    const {board} = game;
    const activePlayer = game.getActivePlayer();

    board.forEach((cell, i) => {
      const cellAnchor = document.createElement("a");
      cellAnchor.classList.add("cell");

      cellAnchor.dataset.index = i;
      cellAnchor.textContent = cell;
      boardDiv.appendChild(cellAnchor);
    });
  }

  function clickHandlerBoard(e) {
    const selectedCell = e.target.dataset.index;
    game.playRound(selectedCell);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

DisplayController();
