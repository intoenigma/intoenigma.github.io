const gridSize = 10;
const mineCount = 10;
let grid = [];
let gameOver = false;

const gridEl = document.getElementById('grid');

function init() {
    gridEl.innerHTML = '';
    grid = [];
    gameOver = false;

    // Create empty grid
    for (let r = 0; r < gridSize; r++) {
        grid[r] = [];
        for (let c = 0; c < gridSize; c++) {
            grid[r][c] = { r, c, mine: false, revealed: false, flagged: false, count: 0 };
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.addEventListener('click', (e) => handleClick(r, c));
            cell.addEventListener('contextmenu', (e) => handleRightClick(e, r, c));
            gridEl.appendChild(cell);
            grid[r][c].el = cell;
        }
    }

    // Place Mines
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const r = Math.floor(Math.random() * gridSize);
        const c = Math.floor(Math.random() * gridSize);
        if (!grid[r][c].mine) {
            grid[r][c].mine = true;
            minesPlaced++;
        }
    }

    // Calc Counts
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (!grid[r][c].mine) {
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (r + i >= 0 && r + i < gridSize && c + j >= 0 && c + j < gridSize) {
                            if (grid[r + i][c + j].mine) count++;
                        }
                    }
                }
                grid[r][c].count = count;
            }
        }
    }
}

function handleClick(r, c) {
    if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

    const cell = grid[r][c];
    cell.revealed = true;
    cell.el.classList.add('revealed');

    if (cell.mine) {
        cell.el.classList.add('mine');
        cell.el.textContent = '💣';
        gameOver = true;
        revealAll();
        setTimeout(() => alert('BOOM! System compromised.'), 100);
    } else {
        if (cell.count > 0) {
            cell.el.textContent = cell.count;
            cell.el.classList.add(`c-${cell.count}`);
        } else {
            // Flood fill
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (r + i >= 0 && r + i < gridSize && c + j >= 0 && c + j < gridSize) {
                        handleClick(r + i, c + j);
                    }
                }
            }
        }
    }
}

function handleRightClick(e, r, c) {
    e.preventDefault();
    if (gameOver || grid[r][c].revealed) return;
    const cell = grid[r][c];
    cell.flagged = !cell.flagged;
    cell.el.textContent = cell.flagged ? '🚩' : '';
    cell.el.classList.toggle('flag');
}

function revealAll() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (grid[r][c].mine) {
                grid[r][c].el.classList.add('revealed', 'mine');
                grid[r][c].el.textContent = '💣';
            }
        }
    }
}

document.getElementById('reset-btn').addEventListener('click', init);
init();
