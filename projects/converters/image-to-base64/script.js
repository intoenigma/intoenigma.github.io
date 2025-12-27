const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const output = document.getElementById('output-string');
const previewImg = document.getElementById('preview-img');
const previewContainer = document.getElementById('preview-container');
const copyBtn = document.getElementById('copy-btn');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#00f3ff';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#555';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#555';
    if(e.dataTransfer.files.length) {
        processFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if(fileInput.files.length) {
        processFile(fileInput.files[0]);
    }
});

function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target.result;
        output.value = result;
        previewImg.src = result;
        previewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

copyBtn.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy String', 2000);
});
