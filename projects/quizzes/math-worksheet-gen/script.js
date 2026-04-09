function generate() {
    const complexity = document.getElementById('complexity').value;
    const count = parseInt(document.getElementById('count').value) || 10;
    const worksheetArea = document.getElementById('worksheet-area');
    const worksheetList = document.getElementById('worksheet-list');
    
    worksheetList.innerHTML = '';
    worksheetArea.classList.remove('hidden');

    for (let i = 1; i <= count; i++) {
        const problem = createProblem(complexity);
        const item = document.createElement('div');
        item.style.borderBottom = '1px solid #eee';
        item.style.padding = '10px 0';
        item.innerHTML = `<span style="color:#888;">${i}.</span> ${problem} = _______`;
        worksheetList.appendChild(item);
    }
}

function createProblem(level) {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2;

    let range = 10;
    if (level === 'medium') range = 100;
    if (level === 'hard') range = 1000;

    if (op === '+') {
        n1 = Math.floor(Math.random() * range) + 1;
        n2 = Math.floor(Math.random() * range) + 1;
    } else if (op === '-') {
        n1 = Math.floor(Math.random() * range) + (range/2);
        n2 = Math.floor(Math.random() * n1);
    } else {
        // Multiplication range is smaller regardless of level to stay "reasonable"
        let mRange = level === 'easy' ? 10 : (level === 'medium' ? 20 : 50);
        n1 = Math.floor(Math.random() * mRange) + 2;
        n2 = Math.floor(Math.random() * 12) + 2;
    }

    return `${n1} ${op} ${n2}`;
}
