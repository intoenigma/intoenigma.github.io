const grid = document.getElementById('tab-grid');
const nameIn = document.getElementById('tab-name');
const urlIn = document.getElementById('tab-url');
const addBtn = document.getElementById('add-btn');

let tabs = [
    { title: "Dashboard - Analytics", url: "intoenigma.com/dash" },
    { title: "Inbox (4)", url: "mail.google.com" },
    { title: "GitHub - Repo", url: "github.com/vandana" }
];

function render() {
    grid.innerHTML = '';
    tabs.forEach((tab, index) => {
        const div = document.createElement('div');
        div.className = 'tab-card';
        div.innerHTML = `
            <h3>${tab.title}</h3>
            <p>${tab.url}</p>
            <span class="close-tab" onclick="remove(${index})">&times;</span>
        `;
        grid.appendChild(div);
    });
}

addBtn.addEventListener('click', () => {
    if(nameIn.value && urlIn.value) {
        tabs.push({ title: nameIn.value, url: urlIn.value });
        nameIn.value = '';
        urlIn.value = '';
        render();
    }
});

window.remove = (idx) => {
    tabs.splice(idx, 1);
    render();
};

render();
