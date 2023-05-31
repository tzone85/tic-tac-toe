var Player;
(function (Player) {
    Player["X"] = "X";
    Player["O"] = "O";
})(Player || (Player = {}));
var GameState;
(function (GameState) {
    GameState["InProgress"] = "In Progress";
    GameState["Won"] = "Won";
    GameState["Tie"] = "Tie";
})(GameState || (GameState = {}));
let currentPlayer = Player.X;
let gameState = GameState.InProgress;
let board = new Array(9).fill(null);
const squares = Array.from(document.querySelectorAll(".square"));
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
squares.forEach((square) => {
    square.addEventListener("click", handleClick);
});
resetButton.addEventListener("click", resetGame);
function handleClick(event) {
    const square = event.target;
    const cellIndex = parseInt(square.dataset.cellIndex);
    if (board[cellIndex] || gameState !== GameState.InProgress) {
        return;
    }
    board[cellIndex] = currentPlayer;
    square.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        gameState = GameState.Won;
        message.textContent = `Player ${currentPlayer} wins!`;
    }
    else if (checkTie()) {
        gameState = GameState.Tie;
        message.textContent = "The game ends in a tie!";
    }
    else {
        currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}
function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winningCombinations.some((combination) => {
        return combination.every((cellIndex) => board[cellIndex] === player);
    });
}
function checkTie() {
    return board.every((cell) => cell !== null);
}
function resetGame() {
    board = new Array(9).fill(null);
    squares.forEach((square) => {
        square.textContent = "";
    });
    gameState = GameState.InProgress;
    currentPlayer = Player.X;
    message.textContent = "";
}
