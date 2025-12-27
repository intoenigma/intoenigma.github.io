const balanceEl = document.getElementById('balance');
const historyEl = document.getElementById('history');
const descIn = document.getElementById('desc');
const amountIn = document.getElementById('amount');
const addBtn = document.getElementById('add-btn');

let transactions = [];

addBtn.addEventListener('click', addTransaction);

function addTransaction() {
    const text = descIn.value;
    const amount = +amountIn.value; // string to number

    if (text.trim() === '' || amount === 0) return;

    const transaction = {
        id: Math.floor(Math.random() * 10000),
        text,
        amount
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    descIn.value = '';
    amountIn.value = '';
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add('history-item');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    `;

    historyEl.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    balanceEl.textContent = `$${total}`;
}
