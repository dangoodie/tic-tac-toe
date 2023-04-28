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

function gameController() {
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

  return { getActivePlayer, playRound, getBoard: gameBoard.board };
}
