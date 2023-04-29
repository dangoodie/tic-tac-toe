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
      oScore: o.getScore(),
    };
    return obj;
  };

  const playRound = (i) => {
    if (gameBoard.board[i] !== null) {
      return null;
    }

    let winner = "";
    activePlayer = getActivePlayer();
    gameBoard.playMove(i, activePlayer.getSide());

    // check for winner
    if (gameBoard.checkWinner(activePlayer.getSide())) {
      activePlayer.win();
      winner = activePlayer.getSide();
    } else {
      // check for tie game
      if (!gameBoard.getBoard().includes(null)) {
        winner = "tie";
      }
      switchPlayerTurn();
    }
    return winner;
  };

  const newGame = () => {
    gameBoard.newGame();
    activePlayer = x;
  };

  return {
    getActivePlayer,
    playRound,
    getBoard: gameBoard.getBoard,
    getScores,
    newGame,
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
    output.textContent = `${activePlayer.getSide().toUpperCase()}'s turn`;

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

  const modalContainer = document.querySelector(".modal-container");
  const modalHeader = document.querySelector(".modal-header");
  const newRound = document.querySelector(".new-round");

  function displayNewRound(message) {
    modalContainer.classList.remove("hidden");
    if (message === "x" || message === "o" || message === "tie") {
      if (message === "tie") {
        modalHeader.textContent = "Tie game";
      } else {
        modalHeader.textContent = `${message} wins!`;
      }
      console.log(message);
    }
  }

  function clickHandlerNewRound(e) {
    e.preventDefault();
    boardDiv.addEventListener("click", clickHandlerBoard);
    modalContainer.classList.add("hidden");
    game.newGame();
    console.log("Clicked!");
    updateScreen();
  }

  newRound.addEventListener("click", clickHandlerNewRound);

  function clickHandlerBoard(e) {
    const selectedCell = e.target.dataset.index;
    const winner = game.playRound(selectedCell);

    console.log(winner);

    if (winner === "x" || winner === "o" || winner === "tie") {
      displayNewRound(winner);
      updateScreen();
      boardDiv.removeEventListener("click", clickHandlerBoard);
      if (winner === "tie") {
        output.textContent = "Tie game";
      } else {
        output.textContent = `${winner} wins!`;
      }
      return;
    }
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

DisplayController();
