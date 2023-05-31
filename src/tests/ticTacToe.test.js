import { test } from 'vitest';
import { handleClick, checkWin, checkTie, resetGame } from '../src/ticTacToe.js';

test('handleClick function updates the game state correctly', (assert) => {
  // Mock initial game state
  const gameState = {
    board: [
      ['X', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'O',
    winner: null,
    isTie: false,
  };

  const updatedGameState = handleClick(0, 1, gameState);

  assert.equal(updatedGameState.board[0][1], 'O');
  assert.equal(updatedGameState.currentPlayer, 'X');
});

test('checkWin function returns true when a player wins', (assert) => {
  // Mock a winning game state
  const gameState = {
    board: [
      ['X', 'O', 'X'],
      ['', 'O', ''],
      ['', 'O', 'X'],
    ],
    currentPlayer: 'X',
    winner: null,
    isTie: false,
  };

  assert.ok(checkWin(gameState));
});

test('checkTie function returns true when the game ends in a tie', (assert) => {
  // Mock a tie game state
  const gameState = {
    board: [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ],
    currentPlayer: 'X',
    winner: null,
    isTie: false,
  };

  // Assert that checkTie returns true for the tie game state
  assert.ok(checkTie(gameState));
});

test('resetGame function resets the game state', (assert) => {
  // Mocking gameboard state with some values
  const gameState = {
    board: [
      ['X', 'O', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'O',
    winner: 'X',
    isTie: false,
  };

  const resettedGameState = resetGame(gameState);


  assert.deepEqual(resettedGameState.board, [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  assert.equal(resettedGameState.currentPlayer, 'X');
  assert.equal(resettedGameState.winner, null);
  assert.equal(resettedGameState.isTie, false);
});
