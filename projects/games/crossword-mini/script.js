// Simple 5x5 Grid
//   1 2 3 . 4
//   5 . . . .
//   6 . 7 . .
//   . . . . .
//   8 . . . .

// P U T . C
// H E L L O
// P . I . D
// . . N . E
// B Y T E S

// Wait, let's design a valid mini 5x5
// R A D A R
// O . . . O
// B Y T E S
// O . . . E
// T A S K S (invalid)

// Layout:
// R O B O T  (1 Across)
// A R E N A  (6 Across)
// D A T A S (Invalid)

// Simplest valid 5x5 for demo:
// H E L L O
// A . I . V
// S T A C K
// H . M . A
// S T O R E

const gridLayout = [
    ['H', 'E', 'L', 'L', 'O'],
    ['A', 0, 'I', 0, 'R'], // 0 is black
    ['S', 'T', 'A', 'C', 'K'],
    ['H', 0, 'M', 0, 'S'],
    ['E', 'N', 'D', 'E', 'D']
];

const clues = {
    across: [
        { n: 1, t: "Common greeting", r: 0, c: 0 },
        { n: 4, t: "Last In First Out structure", r: 2, c: 0 },
        { n: 5, t: "Finished", r: 4, c: 0 }
    ],
    down: [
        { n: 1, t: "Cryptographic digest", r: 0, c: 0 },
        { n: 2, t: "Opposite of beginning", r: 4, c: 0 }, // Wait, logic doesn't match grid
        // Let's just hardcode indices for the specific grid above
        // Grid:
        // H E L L O (1)
        // A # I # V
        // S T A C K (4)
        // H # M # S
        // E N D E D (5)

        // Down 1: HASH E (Hashe? No). 
        // Let's refactor grid to be easier.
    ]
};

// BETTER GRID 5x5
// D A T A .
// O . I . .
// G A M E S
// . . E . E
// . C O D E

// Across: 1. Information (DATA), 3. Fun activity (GAMES), 5. Program instructions (CODE)
// Down: 1. Canine (DOG), 2. Specified Time (TIME? No), 4. Seeing organs (EYES? No).

// Allow dynamic simple grid
const finalGrid = [
    ['D', 'A', 'T', 'A', 0],
    ['O', 0, 'I', 0, 0],
    ['G', 'A', 'M', 'E', 'S'],
    [0, 0, 'E', 0, 'E'],
    [0, 'C', 'O', 'D', 'E']
];

const clueList = {
    across: [
        { num: 1, text: "Raw facts & figures" }, // DATA
        { num: 3, text: "Playful activity" }, // GAMES
        { num: 5, text: "Program instructions" } // CODE
    ],
    down: [
        { num: 1, text: "Man's best friend" }, // DOG
        { num: 2, text: "Clock measurement" }, // TIME
        { num: 4, text: "Vision organs" } // SEE -> S, E, E. wait E form GAMES.. ends with S. EYES? No.
        // G A M E S -> Down 4 starts at M (2,2). M E O (Meo?)
        // Let's just assume simple valid words.
    ]
};
// Correction for Down 2: 'A' from DATA (0,1). 'A' is 2nd letter. Down 2 starts at (0,2) T.
// T I M E -> T(0,2), I(1,2), M(2,2), E(3,2), O(4,2). TIMEO? No.

// Manual Override for simplicity and correctness:
// B Y T E
// I . . X
// T . . I
// S . . T
// 4x4 maybe?

// Let's stick to the code structure and just put *something* working.
const simpleGrid = [
    { char: 'C', n: 1 }, { char: 'O', n: 2 }, { char: 'D', n: 3 }, { char: 'E', n: 4 }, { char: 0 },
    { char: 'P' }, { char: 0 }, { char: 'A' }, { char: 0 }, { char: 0 },
    { char: 'U', n: 5 }, { char: 'S', n: 6 }, { char: 'T' }, { char: 'O', n: 7 }, { char: 'M' },
    { char: 0 }, { char: 0 }, { char: 'A' }, { char: 0 }, { char: 'A' },
    { char: 0 }, { char: 'W', n: 8 }, { char: 'E' }, { char: 'B' }, { char: 'P' }
];
// This is getting complex to visualize blindly.
// Let's implement key logic and a basic 3x3 or simple 5x5 perfectly.

// 1 2 3
// 4 5 6
// 7 8 9
// C A T
// A R E
// P E N
// Across: 1. Pet, 4. Exist, 7. Write tool
// Down: 1. Headgear, 2. Metrics (Area?), 3. Number (Ten)

const perfect3x3 = [
    ['C', 'A', 'T'],
    ['A', 'R', 'E'],
    ['P', 'E', 'N']
];
// Across: CAT, ARE, PEN
// Down: CAP, ARE, TEN

const gridEl = document.getElementById('crossword-grid');
const aList = document.getElementById('across-clues');
const dList = document.getElementById('down-clues');

const nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function init() {
    gridEl.style.gridTemplateColumns = 'repeat(3, 60px)';
    gridEl.style.gridTemplateRows = 'repeat(3, 60px)';

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            const num = document.createElement('span');
            num.classList.add('num');
            num.textContent = nums[r][c];
            cell.appendChild(num);

            const inp = document.createElement('input');
            inp.maxLength = 1;
            inp.dataset.r = r;
            inp.dataset.c = c;
            cell.appendChild(inp);

            gridEl.appendChild(cell);
        }
    }

    addClue(aList, "1. Feline pet");
    addClue(aList, "4. To exist (plural)");
    addClue(aList, "7. Writing tool");

    addClue(dList, "1. Headgear");
    addClue(dList, "2. Surface measurement unit? (No, 'ARE')");
    addClue(dList, "3. Number after nine");
}

function addClue(list, text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
}

document.getElementById('check-btn').addEventListener('click', () => {
    let inputs = document.querySelectorAll('.cell input');
    inputs.forEach(inp => {
        const r = inp.dataset.r;
        const c = inp.dataset.c;
        if (inp.value.toUpperCase() === perfect3x3[r][c]) {
            inp.parentElement.classList.add('correct');
        } else {
            inp.parentElement.classList.remove('correct');
        }
    });
});

init();
