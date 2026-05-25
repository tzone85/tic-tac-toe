import { describe, expect, it } from "vitest";
import { TicTacToe } from "../../src/game.js";

describe("TicTacToe", () => {
  it("starts with X to move and empty board", () => {
    const g = new TicTacToe();
    expect(g.currentPlayer).toBe("X");
    expect(g.board.every((c) => c === null)).toBe(true);
    expect(g.status).toEqual({ kind: "in-progress", currentPlayer: "X" });
  });

  it("places mark + swaps player on legal move", () => {
    const g = new TicTacToe();
    const r = g.play(0);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.status.kind).toBe("in-progress");
    expect(g.board[0]).toBe("X");
    expect(g.currentPlayer).toBe("O");
  });

  it("rejects already-taken cell", () => {
    const g = new TicTacToe();
    g.play(0);
    const r = g.play(0);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toMatch(/already taken/);
  });

  it.each([[-1], [9], [1.5], [Number.NaN]])(
    "rejects invalid cell %s",
    (cell) => {
      const g = new TicTacToe();
      expect(g.play(cell as number).ok).toBe(false);
    },
  );

  it("detects a row win", () => {
    const g = new TicTacToe();
    // X plays 0, O plays 3, X plays 1, O plays 4, X plays 2 → win line 0,1,2
    [0, 3, 1, 4, 2].forEach((c) => g.play(c));
    expect(g.status.kind).toBe("won");
    if (g.status.kind === "won") {
      expect(g.status.winner).toBe("X");
      expect(g.status.line).toEqual([0, 1, 2]);
    }
  });

  it("detects a diagonal win for O", () => {
    const g = new TicTacToe();
    // X 1, O 0, X 2, O 4, X 5, O 8 → O wins 0,4,8
    [1, 0, 2, 4, 5, 8].forEach((c) => g.play(c));
    expect(g.status.kind).toBe("won");
    if (g.status.kind === "won") expect(g.status.winner).toBe("O");
  });

  it("detects a tie", () => {
    const g = new TicTacToe();
    // a known full board with no winner:
    //  X | O | X
    //  X | O | O
    //  O | X | X
    // move order: 0,1,2,4,3,5,7,6,8 → 5 X + 4 O, no winning line
    [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach((c) => g.play(c));
    expect(g.status).toEqual({ kind: "tie" });
  });

  it("rejects play after game over", () => {
    const g = new TicTacToe();
    [0, 3, 1, 4, 2].forEach((c) => g.play(c)); // X wins
    const r = g.play(5);
    expect(r.ok).toBe(false);
  });

  it("reset clears board + status", () => {
    const g = new TicTacToe();
    [0, 3, 1, 4, 2].forEach((c) => g.play(c));
    g.reset();
    expect(g.status).toEqual({ kind: "in-progress", currentPlayer: "X" });
    expect(g.board.every((c) => c === null)).toBe(true);
  });

  it("board getter is typed readonly (compile-time)", () => {
    const g = new TicTacToe();
    expect(g.board).toHaveLength(9);
    // Note: readonly is a TypeScript-level contract; runtime is not frozen.
  });
});
