const input = document.getElementById('text-input');

function convert(type) {
    let text = input.value;
    switch (type) {
        case 'upper':
            text = text.toUpperCase();
            break;
        case 'lower':
            text = text.toLowerCase();
            break;
        case 'title':
            text = text.toLowerCase().split(' ').map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            }).join(' ');
            break;
        case 'sentence':
            text = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
                return c.toUpperCase();
            });
            break;
        case 'camel':
            text = text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
            break;
        case 'snake':
            text = text && text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('_');
            break;
        case 'kebab':
            text = text && text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('-');
            break;
        case 'pascal':
            text = text.replace(new RegExp(/[-_]+/, 'g'), ' ')
                .replace(new RegExp(/[^\w\s]/, 'g'), '')
                .replace(
                    new RegExp(/\s+(.)(\w*)/, 'g'),
                    ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
                )
                .replace(new RegExp(/\w/), s => s.toUpperCase());
            break;
    }
    input.value = text;
}

document.getElementById('copy-btn').addEventListener('click', () => {
    input.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
});

document.getElementById('clear-btn').addEventListener('click', () => input.value = '');
