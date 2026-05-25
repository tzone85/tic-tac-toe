/**
 * DOM bindings for the TicTacToe game.
 *
 * Pure logic lives in `./game.ts`; this module only wires events and
 * renders state changes. Re-renders the whole board on every transition —
 * fine at 9 cells, no need for diffing.
 */
import { TicTacToe } from "./game.js";

const WIN_LINE_CLASS = "winning-line";

export function mount(root: HTMLElement, game = new TicTacToe()): { game: TicTacToe } {
  const squares: HTMLDivElement[] = [];
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.className = "square";
    div.setAttribute("role", "button");
    div.setAttribute("data-cell-index", String(i));
    div.setAttribute("aria-label", `cell ${i + 1}`);
    div.tabIndex = 0;
    div.addEventListener("click", () => attempt(i));
    div.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        attempt(i);
      }
    });
    squares.push(div);
  }

  const board = document.createElement("div");
  board.id = "board";
  board.append(...squares);

  const message = document.createElement("div");
  message.id = "message";
  message.setAttribute("role", "status");

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.type = "button";
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", () => {
    game.reset();
    render();
  });

  root.replaceChildren(board, message, resetButton);
  render();

  function attempt(cell: number) {
    const result = game.play(cell);
    if (!result.ok) {
      message.textContent = `Invalid move: ${result.reason}`;
      return;
    }
    render();
  }

  function render() {
    for (let i = 0; i < 9; i++) {
      squares[i].textContent = game.board[i] ?? "";
      squares[i].classList.remove(WIN_LINE_CLASS);
    }
    const status = game.status;
    if (status.kind === "in-progress") {
      message.textContent = `Player ${status.currentPlayer}'s turn`;
    } else if (status.kind === "won") {
      message.textContent = `Player ${status.winner} wins!`;
      for (const i of status.line) squares[i].classList.add(WIN_LINE_CLASS);
    } else {
      message.textContent = "The game ends in a tie.";
    }
  }

  return { game };
}
