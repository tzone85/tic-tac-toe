/**
 * Tic-tac-toe pure game state. No DOM, fully testable.
 */
export type Player = "X" | "O";
export type Cell = Player | null;
export type Status =
  | { kind: "in-progress"; currentPlayer: Player }
  | { kind: "won"; winner: Player; line: readonly [number, number, number] }
  | { kind: "tie" };

const WINNING_LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export class TicTacToe {
  private _board: Cell[] = new Array(9).fill(null);
  private _currentPlayer: Player = "X";
  private _status: Status = { kind: "in-progress", currentPlayer: "X" };

  get board(): readonly Cell[] { return this._board; }
  get status(): Status { return this._status; }
  get currentPlayer(): Player { return this._currentPlayer; }

  /**
   * Attempt to place the current player's mark in `cell` (0..8).
   * @returns {ok:true} if it was a legal move; {ok:false, reason} otherwise.
   */
  play(cell: number): { ok: true; status: Status } | { ok: false; reason: string } {
    if (!Number.isInteger(cell) || cell < 0 || cell > 8) {
      return { ok: false, reason: "cell index out of range" };
    }
    if (this._status.kind !== "in-progress") {
      return { ok: false, reason: "game is over" };
    }
    if (this._board[cell] !== null) {
      return { ok: false, reason: "cell already taken" };
    }

    this._board[cell] = this._currentPlayer;
    const winLine = this._findWinningLine(this._currentPlayer);
    if (winLine) {
      this._status = { kind: "won", winner: this._currentPlayer, line: winLine };
    } else if (this._board.every((c) => c !== null)) {
      this._status = { kind: "tie" };
    } else {
      this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
      this._status = { kind: "in-progress", currentPlayer: this._currentPlayer };
    }
    return { ok: true, status: this._status };
  }

  reset(): void {
    this._board = new Array(9).fill(null);
    this._currentPlayer = "X";
    this._status = { kind: "in-progress", currentPlayer: "X" };
  }

  private _findWinningLine(player: Player): readonly [number, number, number] | null {
    for (const line of WINNING_LINES) {
      if (line.every((i) => this._board[i] === player)) return line;
    }
    return null;
  }
}
