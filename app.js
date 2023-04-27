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

const DisplayController = function (board) {

};

const x = playerFactory("x");
const o = playerFactory("o");

const gameBoard = new GameBoard();
const displayController = new DisplayController(gameBoard.board);
