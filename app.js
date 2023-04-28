const GameBoard = function () {
  this.board = [null, null, null, null, null, null, null, null, null];

  this.playMove = (i, side) => {
    this.board[i] = side;
  };

  this.newGame = () => {
    this.board = [null, null, null, null, null, null, null, null, null];
  };

  this.getBoard = () => this.board;

  this.checkWinner = (side) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    let winner = false;
    winConditions.forEach((condition) => {
      if (
        this.board[condition[0]] === side &&
        this.board[condition[1]] === side &&
        this.board[condition[2]] === side
      ) {
        winner = true;
      }
    });
    return winner;
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
  const getScores = () => {
    const obj = {
      xScore: x.getScore(),
      oScore: o.getScore()
    }
    return obj;
  };

  const playRound = (i) => {
    if (gameBoard.board[i] !== null) {
      return;
    }
    activePlayer = getActivePlayer();
    gameBoard.playMove(i, activePlayer.getSide());

    const winner = gameBoard.checkWinner(activePlayer.getSide());
    if (winner) {
      activePlayer.win();
      activePlayer = x;
      gameBoard.newGame();
    } else {
      switchPlayerTurn();
    }
  };

  return {
    getActivePlayer,
    playRound,
    getBoard: gameBoard.getBoard,
    getScores,
  };
}

function DisplayController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const xScoreSpan = document.querySelector(".x-score-num");
  const oScoreSpan = document.querySelector(".o-score-num");
  const output = document.querySelector(".output");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    output.textContent = `${activePlayer.getSide().toUpperCase()}'s turn`

    const scores = game.getScores();
    xScoreSpan.textContent = scores.xScore;
    oScoreSpan.textContent = scores.oScore;

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
