const numInput = document.getElementById('number-input');
const romanInput = document.getElementById('roman-input');

function toRoman(num) {
    if(num < 1 || num > 3999) return "OutOfRange";
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for ( let i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

function fromRoman(str) {
    const lookup = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    let num = 0;
    str = str.toUpperCase();
    for(let i=0; i<str.length; i++) {
        let curr = lookup[str[i]];
        let next = lookup[str[i+1]];
        if(next && curr < next) {
            num -= curr;
        } else {
            num += curr;
        }
    }
    return isNaN(num) ? "" : num;
}

numInput.addEventListener('input', () => {
    const val = parseInt(numInput.value);
    if(val) romanInput.value = toRoman(val);
    else romanInput.value = '';
});

romanInput.addEventListener('input', () => {
    const val = romanInput.value;
    if(val) numInput.value = fromRoman(val);
    else numInput.value = '';
});
