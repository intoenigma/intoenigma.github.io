const container = document.getElementById('puzzle-container');
const size = 4;
let tiles = [];

// Init 1-15 and empty 0
function init() {
    tiles = Array.from({length: size*size}, (_, i) => i + 1);
    tiles[size*size - 1] = 0; // Empty
    render();
}

function render() {
    container.innerHTML = '';
    tiles.forEach((val, idx) => {
        const div = document.createElement('div');
        div.classList.add('tile');
        if(val === 0) div.classList.add('empty');
        else {
            div.textContent = val;
            if(val === idx + 1) div.classList.add('correct');
        }
        div.addEventListener('click', () => move(idx));
        container.appendChild(div);
    });
}

function move(idx) {
    const emptyIdx = tiles.indexOf(0);
    const row = Math.floor(idx / size);
    const col = idx % size;
    const emptyRow = Math.floor(emptyIdx / size);
    const emptyCol = emptyIdx % size;
    
    // Check adjacency
    const isAdjacent = (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
                       (Math.abs(col - emptyCol) === 1 && row === emptyRow);
                       
    if(isAdjacent) {
        [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
        render();
        checkWin();
    }
}

function shuffle() {
    // Random valid moves to ensure solvability
    for(let i=0; i<300; i++) {
        const emptyIdx = tiles.indexOf(0);
        const validMoves = [];
        const row = Math.floor(emptyIdx / size);
        const col = emptyIdx % size;
        
        if(row > 0) validMoves.push(emptyIdx - size);
        if(row < size-1) validMoves.push(emptyIdx + size);
        if(col > 0) validMoves.push(emptyIdx - 1);
        if(col < size-1) validMoves.push(emptyIdx + 1);
        
        const moveIdx = validMoves[Math.floor(Math.random() * validMoves.length)];
        [tiles[moveIdx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[moveIdx]];
    }
    render();
}

function checkWin() {
    const win = tiles.every((val, idx) => val === 0 ? idx === size*size-1 : val === idx + 1);
    if(win) alert("SEQUENCE COMPLETE");
}

document.getElementById('shuffle-btn').addEventListener('click', shuffle);

init();
