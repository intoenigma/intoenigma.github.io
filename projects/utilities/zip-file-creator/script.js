const fileIn = document.getElementById('file-in');
const list = document.getElementById('file-list');
const btn = document.getElementById('zip-btn');
const drop = document.getElementById('drop-zone');

let filesData = [];

fileIn.addEventListener('change', handleFiles);

// Drag & Drop visual
drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('dragover'); });
drop.addEventListener('dragleave', () => drop.classList.remove('dragover'));
drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('dragover'); });

function handleFiles(e) {
    const files = e.target.files;
    for(let f of files) {
        filesData.push(f);
        const div = document.createElement('div');
        div.className = 'file-item';
        div.textContent = `${f.name} (${(f.size/1024).toFixed(1)} KB)`;
        list.appendChild(div);
    }
}

btn.addEventListener('click', () => {
    if(filesData.length === 0) return alert("No files added");
    
    const zip = new JSZip();
    filesData.forEach(f => {
        zip.file(f.name, f);
    });
    
    zip.generateAsync({type:"blob"})
    .then(content => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = "archive.zip";
        a.click();
    });
});
