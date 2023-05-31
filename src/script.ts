enum Player {
  X = "X",
  O = "O",
}

enum GameState {
  InProgress = "In Progress",
  Won = "Won",
  Tie = "Tie",
}

let currentPlayer: Player = Player.X;

let gameState: GameState = GameState.InProgress;

let board: Player[] = new Array(9).fill(null);

const squares = Array.from(document.querySelectorAll(".square")) as HTMLDivElement[];
const message = document.getElementById("message") as HTMLDivElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

squares.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

export function handleClick(event: MouseEvent) {
  const square = event.target as HTMLDivElement;
  const cellIndex = parseInt(square.dataset.cellIndex!);

  if (board[cellIndex] || gameState !== GameState.InProgress) {
    return;
  }

  board[cellIndex] = currentPlayer;
  square.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameState = GameState.Won;
    message.textContent = `Player ${currentPlayer} wins!`;
  } else if (checkTie()) {
    gameState = GameState.Tie;
    message.textContent = "The game ends in a tie!";
  } else {
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

export function checkWin(player: Player): boolean {
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

export function checkTie(): boolean {
  return board.every((cell) => cell !== null);
}

export function resetGame() {
  // Clear the game board
  board = new Array(9).fill(null);

  // Clear the square contents
  squares.forEach((square) => {
    square.textContent = "";
  });

  // Reset game state and current player
  gameState = GameState.InProgress;
  currentPlayer = Player.X;

  // Clear the message
  message.textContent = "Welcome to Tic Tac Toe!";
}
