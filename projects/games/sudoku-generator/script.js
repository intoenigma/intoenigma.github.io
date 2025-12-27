const board = document.getElementById('sudoku-board');

function init() {
    board.innerHTML = '';
    // Generate 81 input cells
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('cell');
        input.dataset.index = i;

        // Simple 3x3 border css fix
        if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) input.style.borderRight = '2px solid #555';
        if (Math.floor(i / 9) % 3 === 2 && Math.floor(i / 9) !== 8) input.style.borderBottom = '2px solid #555';

        // Validation
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1);
            if (e.target.value === '0') e.target.value = '';
        });

        board.appendChild(input);
    }
    generate();
}

function generate() {
    // Basic valid generator (simplified for demo: pre-fill diagonal boxes and solve)
    clearBoard();
    fillDiagonal();
    solveSudoku();
    removeDigits();
}

const N = 9;
const SRN = 3;

function fillDiagonal() {
    for (let i = 0; i < N; i += SRN) fillBox(i, i);
}

function unUsedInBox(rowStart, colStart, num) {
    for (let i = 0; i < SRN; i++)
        for (let j = 0; j < SRN; j++)
            if (getVal(rowStart + i, colStart + j) == num) return false;
    return true;
}

function fillBox(row, col) {
    let num;
    for (let i = 0; i < SRN; i++) {
        for (let j = 0; j < SRN; j++) {
            do {
                num = Math.floor(Math.random() * N + 1);
            } while (!unUsedInBox(row, col, num));
            getValEl(row + i, col + j).value = num;
        }
    }
}

function checkIfSafe(i, j, num) {
    return (unUsedInRow(i, num) && unUsedInCol(j, num) && unUsedInBox(i - i % SRN, j - j % SRN, num));
}

function unUsedInRow(i, num) {
    for (let j = 0; j < N; j++) if (getVal(i, j) == num) return false;
    return true;
}

function unUsedInCol(j, num) {
    for (let i = 0; i < N; i++) if (getVal(i, j) == num) return false;
    return true;
}

function solveSudoku() {
    // Backtracking algorithm
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (getVal(row, col) == '') {
                for (let num = 1; num <= 9; num++) {
                    if (checkIfSafe(row, col, num)) {
                        getValEl(row, col).value = num;
                        if (solveSudoku()) return true;
                        getValEl(row, col).value = '';
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function removeDigits() {
    let count = 40; // Remove 40 digits
    while (count != 0) {
        let cellId = Math.floor(Math.random() * 81);
        let el = board.children[cellId];
        if (el.value != '') {
            el.value = '';
            el.classList.remove('fixed');
            count--;
        }
    }
    // Mark remaining as fixed
    Array.from(board.children).forEach(c => {
        if (c.value !== '') {
            c.readOnly = true;
            c.classList.add('fixed');
        }
    });
}

function clearBoard() {
    Array.from(board.children).forEach(c => {
        c.value = '';
        c.readOnly = false;
        c.classList.remove('fixed');
    });
}

// Helpers
function getValEl(r, c) { return board.children[r * 9 + c]; }
function getVal(r, c) { return board.children[r * 9 + c].value; }

document.getElementById('new-game-btn').addEventListener('click', generate);
document.getElementById('solve-btn').addEventListener('click', () => {
    // Simple solve trigger (won't work perfectly on user bad input but works for generated puzzles)
    solveSudoku();
});

init();
