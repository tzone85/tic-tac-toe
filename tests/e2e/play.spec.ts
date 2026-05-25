import { expect, test } from "@playwright/test";

test("loads + shows initial X turn", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /tic-tac-toe/i })).toBeVisible();
  await expect(page.locator("#message")).toHaveText(/X's turn/);
  await expect(page.locator(".square")).toHaveCount(9);
});

test("X wins top row", async ({ page }) => {
  await page.goto("/");
  const squares = page.locator(".square");
  // X 0, O 3, X 1, O 4, X 2 → X wins line 0,1,2
  for (const i of [0, 3, 1, 4, 2]) {
    await squares.nth(i).click();
  }
  await expect(page.locator("#message")).toHaveText(/X wins/);
  await expect(squares.nth(0)).toHaveClass(/winning-line/);
  await expect(squares.nth(1)).toHaveClass(/winning-line/);
  await expect(squares.nth(2)).toHaveClass(/winning-line/);
});

test("Reset clears the board", async ({ page }) => {
  await page.goto("/");
  const squares = page.locator(".square");
  await squares.nth(0).click();
  await squares.nth(4).click();
  await page.getByRole("button", { name: /reset/i }).click();
  await expect(squares.nth(0)).toHaveText("");
  await expect(squares.nth(4)).toHaveText("");
  await expect(page.locator("#message")).toHaveText(/X's turn/);
});

test("Invalid move shows feedback", async ({ page }) => {
  await page.goto("/");
  const squares = page.locator(".square");
  await squares.nth(0).click();
  await squares.nth(0).click();
  await expect(page.locator("#message")).toHaveText(/invalid|taken/i);
});
