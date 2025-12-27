const grid = document.getElementById('grid');
const search = document.getElementById('search');

// Common Set
const entities = [
    { s: '&copy;', c: '&amp;copy;', d: 'Copyright' },
    { s: '&reg;', c: '&amp;reg;', d: 'Registered' },
    { s: '&trade;', c: '&amp;trade;', d: 'Trademark' },
    { s: '&nbsp;', c: '&amp;nbsp;', d: 'Non-breaking Space' },
    { s: '&lt;', c: '&amp;lt;', d: 'Less Than' },
    { s: '&gt;', c: '&amp;gt;', d: 'Greater Than' },
    { s: '&amp;', c: '&amp;amp;', d: 'Ampersand' },
    { s: '&quot;', c: '&amp;quot;', d: 'Double Quote' },
    { s: '&euro;', c: '&amp;euro;', d: 'Euro' },
    { s: '&pound;', c: '&amp;pound;', d: 'Pound' },
    { s: '&yen;', c: '&amp;yen;', d: 'Yen' },
    { s: '&cent;', c: '&amp;cent;', d: 'Cent' },
    { s: '&sect;', c: '&amp;sect;', d: 'Section' },
    { s: '&para;', c: '&amp;para;', d: 'Paragraph' },
    { s: '&rarr;', c: '&amp;rarr;', d: 'Right Arrow' },
    { s: '&larr;', c: '&amp;larr;', d: 'Left Arrow' },
    { s: '&uarr;', c: '&amp;uarr;', d: 'Up Arrow' },
    { s: '&darr;', c: '&amp;darr;', d: 'Down Arrow' },
    { s: '&spades;', c: '&amp;spades;', d: 'Spade' },
    { s: '&hearts;', c: '&amp;hearts;', d: 'Heart' },
    { s: '&clubs;', c: '&amp;clubs;', d: 'Club' },
    { s: '&diams;', c: '&amp;diams;', d: 'Diamond' },
    { s: '&infin;', c: '&amp;infin;', d: 'Infinity' }
];

function render(filter = '') {
    grid.innerHTML = '';
    entities.forEach(ent => {
        if(ent.c.toLowerCase().includes(filter) || ent.d.toLowerCase().includes(filter)) {
            const el = document.createElement('div');
            el.className = 'entity-card';
            el.innerHTML = `
                <div class="symbol">${ent.s}</div>
                <div class="code">${ent.c}</div>
                <div class="desc">${ent.d}</div>
            `;
            el.onclick = () => {
                navigator.clipboard.writeText(ent.c.replace('&amp;', '&'));
                 // Hack: display code has &amp; visually, copy needs unescaped
                 alert('Copied Entity Code');
            };
            grid.appendChild(el);
        }
    });
}

search.addEventListener('input', (e) => render(e.target.value.toLowerCase()));

render();
