const nameIn = document.getElementById('name');
const bioIn = document.getElementById('bio');
const linksContainer = document.getElementById('links-container');
const pName = document.getElementById('p-name');
const pBio = document.getElementById('p-bio');
const pLinks = document.getElementById('p-links');

nameIn.addEventListener('input', () => pName.textContent = nameIn.value || 'Name');
bioIn.addEventListener('input', () => pBio.textContent = bioIn.value || 'Bio goes here');

document.getElementById('add-link-btn').addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'link-inputs';

    const labelIn = document.createElement('input');
    labelIn.placeholder = 'Link Label';

    const urlIn = document.createElement('input');
    urlIn.placeholder = 'URL';

    div.appendChild(labelIn);
    div.appendChild(urlIn);
    linksContainer.appendChild(div);

    // Auto update logic
    const update = () => renderLinks();
    labelIn.addEventListener('input', update);
    urlIn.addEventListener('input', update);
});

function renderLinks() {
    pLinks.innerHTML = '';
    const rows = linksContainer.querySelectorAll('.link-inputs');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const text = inputs[0].value;
        const url = inputs[1].value;

        if (text) {
            const a = document.createElement('a');
            a.href = url || '#';
            a.textContent = text;
            a.className = 'p-link-item';
            a.target = '_blank';
            pLinks.appendChild(a);
        }
    });
}
