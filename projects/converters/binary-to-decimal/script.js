const binaryInput = document.getElementById('binary-input');
const decimalInput = document.getElementById('decimal-input');

binaryInput.addEventListener('input', () => {
    const val = binaryInput.value;
    // Remove non-binary chars
    if (/[^01]/.test(val)) {
        binaryInput.value = val.replace(/[^01]/g, '');
    }
    if (binaryInput.value === '') {
        decimalInput.value = '';
        return;
    }
    decimalInput.value = parseInt(binaryInput.value, 2);
});

decimalInput.addEventListener('input', () => {
    const val = decimalInput.value;
    if (val === '') {
        binaryInput.value = '';
        return;
    }
    binaryInput.value = parseInt(val).toString(2);
});
