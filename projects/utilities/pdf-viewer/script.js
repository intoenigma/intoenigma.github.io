const fileIn = document.getElementById('file-in');
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const pageNumSpan = document.getElementById('page-num');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const placeholder = document.getElementById('placeholder');

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

const scale = 1.5;

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

fileIn.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const typedcenter = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedcenter).promise.then(pdf => {
                pdfDoc = pdf;
                pageNum = 1;
                placeholder.style.display = 'none';
                renderPage(pageNum);
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
});

function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });

        pageNumSpan.textContent = `${num} / ${pdfDoc.numPages}`;
    });
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

prevBtn.addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

nextBtn.addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});
