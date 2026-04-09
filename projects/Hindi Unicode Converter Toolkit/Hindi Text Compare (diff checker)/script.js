// Word-level LCS-based diff
function lcs(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
    let i = m, j = n;
    const result = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && a[i-1] === b[j-1]) { result.unshift({type:'same', val:a[i-1]}); i--; j--; }
        else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({type:'add', val:b[j-1]}); j--; }
        else { result.unshift({type:'remove', val:a[i-1]}); i--; }
    }
    return result;
}

function compareTexts() {
    const a = document.getElementById('text-a').value.trim().split(/\s+/);
    const b = document.getElementById('text-b').value.trim().split(/\s+/);
    if (!a[0] && !b[0]) return;

    const diff = lcs(a, b);
    let changes = 0;
    const html = diff.map(d => {
        if (d.type === 'add')    { changes++; return `<span class="diff-add">${d.val}</span>`; }
        if (d.type === 'remove') { changes++; return `<span class="diff-remove">${d.val}</span>`; }
        return d.val;
    }).join(' ');

    document.getElementById('diff-content').innerHTML = html;
    document.getElementById('diff-output').style.display = 'block';
    document.getElementById('diff-stat').style.display  = 'flex';
    document.getElementById('diff-count').textContent   = changes;
}

function clearAll() {
    document.getElementById('text-a').value       = '';
    document.getElementById('text-b').value       = '';
    document.getElementById('diff-output').style.display = 'none';
    document.getElementById('diff-stat').style.display   = 'none';
}
