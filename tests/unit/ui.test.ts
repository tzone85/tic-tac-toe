import { beforeEach, describe, expect, it } from "vitest";
import { TicTacToe } from "../../src/game.js";
import { mount } from "../../src/ui.js";

describe("mount", () => {
  let root: HTMLElement;
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    root = document.getElementById("app")!;
  });

  it("renders 9 squares + message + reset button", () => {
    mount(root, new TicTacToe());
    expect(root.querySelectorAll(".square").length).toBe(9);
    expect(root.querySelector("#message")?.textContent).toMatch(/X's turn/);
    expect(root.querySelector("#reset")).toBeTruthy();
  });

  it("clicking an empty square places X and advances to O's turn", () => {
    mount(root, new TicTacToe());
    const first = root.querySelector(".square") as HTMLDivElement;
    first.click();
    expect(first.textContent).toBe("X");
    expect(root.querySelector("#message")?.textContent).toMatch(/O's turn/);
  });

  it("reset button clears the board", () => {
    mount(root, new TicTacToe());
    (root.querySelector(".square") as HTMLDivElement).click();
    (root.querySelector("#reset") as HTMLButtonElement).click();
    const squares = root.querySelectorAll(".square");
    expect(Array.from(squares).every((s) => s.textContent === "")).toBe(true);
  });

  it("winning line highlights the cells with `winning-line` class", () => {
    const g = new TicTacToe();
    mount(root, g);
    const squares = root.querySelectorAll(".square") as NodeListOf<HTMLDivElement>;
    [0, 3, 1, 4, 2].forEach((i) => squares[i].click());
    expect(squares[0].classList.contains("winning-line")).toBe(true);
    expect(squares[1].classList.contains("winning-line")).toBe(true);
    expect(squares[2].classList.contains("winning-line")).toBe(true);
    expect(squares[3].classList.contains("winning-line")).toBe(false);
  });

  it("Enter key on a focused square plays the cell", () => {
    mount(root, new TicTacToe());
    const first = root.querySelector(".square") as HTMLDivElement;
    first.focus();
    first.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    expect(first.textContent).toBe("X");
  });

  it("clicking taken cell shows invalid-move message", () => {
    mount(root, new TicTacToe());
    const first = root.querySelector(".square") as HTMLDivElement;
    first.click();
    first.click(); // already taken
    expect(root.querySelector("#message")?.textContent).toMatch(/Invalid|taken/i);
  });
});
