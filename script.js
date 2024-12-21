const board = document.querySelector('#board');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('#restartButton');
const statusMessage = document.querySelector('#statusMessage');
const resultScreen = document.querySelector('#resultScreen');
const resultMessage = document.querySelector('#resultMessage');
const newGameButton = document.querySelector('#newGameButton');

let currentPlayer = 'X'; // Tracks current player
let isGameOver = false;

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Event listeners for cells
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Handle cell click
function handleClick(e) {
  if (isGameOver) return;
  const cell = e.target;

  // Mark cell
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (isDraw()) {
    endGame('It\'s a draw!');
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
  }
}

// Check if a player has won
function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

// End the game
function endGame(message) {
  isGameOver = true;
  resultMessage.textContent = message;
  resultScreen.classList.remove('hidden');
}

// Update status message
function updateStatusMessage() {
  statusMessage.textContent = `It's ${currentPlayer}'s turn`;
}

// Restart game
restartButton.addEventListener('click', restartGame);

newGameButton.addEventListener('click', () => {
  restartGame();
  resultScreen.classList.add('hidden');
});

function restartGame() {
  currentPlayer = 'X';
  isGameOver = false;
  statusMessage.textContent = "It's X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
}
