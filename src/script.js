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
var currentPlayer = Player.X;
var gameState = GameState.InProgress;
var board = new Array(9).fill(null);
var squares = Array.from(document.querySelectorAll(".square"));
var message = document.getElementById("message");
var resetButton = document.getElementById("reset");
squares.forEach(function (square) {
    square.addEventListener("click", handleClick);
});
resetButton.addEventListener("click", resetGame);
function handleClick(event) {
    var square = event.target;
    var cellIndex = parseInt(square.dataset.cellIndex);
    if (board[cellIndex] || gameState !== GameState.InProgress) {
        return;
    }
    board[cellIndex] = currentPlayer;
    square.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        gameState = GameState.Won;
        message.textContent = "Player ".concat(currentPlayer, " wins!");
    }
    else if (checkTie()) {
        gameState = GameState.Tie;
        message.textContent = "The game ends in a tie!";
    }
    else {
        currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
        message.textContent = "Player ".concat(currentPlayer, "'s turn");
    }
}
function checkWin(player) {
    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winningCombinations.some(function (combination) {
        return combination.every(function (cellIndex) { return board[cellIndex] === player; });
    });
}
function checkTie() {
    return board.every(function (cell) { return cell !== null; });
}
function resetGame() {
    board = new Array(9).fill(null);
    squares.forEach(function (square) {
        square.textContent = "";
    });
    gameState = GameState.InProgress;
    currentPlayer = Player.X;
    message.textContent = "";
}
