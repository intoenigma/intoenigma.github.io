const rows = 6;
const cols = 7;
let currentPlayer = 1; // 1 or 2
let board = []; // 2D array
let gameOver = false;

const gridEl = document.getElementById('grid');
const playerSpan = document.getElementById('current-player');
const winnerModal = document.getElementById('winner-modal');
const winnerText = document.getElementById('winner-text');

// Init
function init() {
    board = Array(rows).fill().map(() => Array(cols).fill(0));
    gridEl.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.addEventListener('click', () => dropPiece(c));
            gridEl.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    if (gameOver) return;

    // Find lowest empty row
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = currentPlayer;
            updateBoard(r, col);
            if (checkWin(r, col)) {
                gameOver = true;
                setTimeout(() => {
                    winnerText.textContent = `Player ${currentPlayer} Wins!`;
                    winnerText.style.color = currentPlayer === 1 ? 'var(--primary)' : 'var(--secondary)';
                    winnerModal.classList.remove('hidden');
                }, 500);
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                playerSpan.textContent = `P${currentPlayer}`;
                playerSpan.className = currentPlayer === 1 ? 'p1' : 'p2';
            }
            return;
        }
    }
}

function updateBoard(r, c) {
    // We need to find the specific cell DIV. 
    // Grid order is row-major. Index = r * cols + c
    const index = r * cols + c;
    const cell = gridEl.children[index];
    cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');
}

function checkWin(r, c) {
    // Check all 4 directions
    return (
        checkDir(r, c, 1, 0) || // Horizontal
        checkDir(r, c, 0, 1) || // Vertical
        checkDir(r, c, 1, 1) || // Diagonal /
        checkDir(r, c, 1, -1)   // Diagonal \
    );
}

function checkDir(r, c, dr, dc) {
    let count = 1;
    // Positive direction
    for (let i = 1; i < 4; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === currentPlayer) count++;
        else break;
    }
    // Negative direction
    for (let i = 1; i < 4; i++) {
        const nr = r - dr * i;
        const nc = c - dc * i;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === currentPlayer) count++;
        else break;
    }
    return count >= 4;
}

document.getElementById('reset-btn').addEventListener('click', () => location.reload());

init();
