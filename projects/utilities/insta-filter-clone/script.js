const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const download = document.getElementById('download-btn');
let img = new Image();
let original = null;

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // Limit text wrap if too huge? CSS handles view, canvas stores full res.
            ctx.drawImage(img, 0, 0);
            original = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
});

window.applyFilter = (type) => {
    if (!original) return;

    // Reset
    ctx.putImageData(original, 0, 0);

    // Use CSS filter for visual (easiest way to preview) BUT for download we need to bake it.
    // Baking CSS filters into Canvas Context:

    ctx.filter = 'none'; // reset
    if (type === 'grayscale') ctx.filter = 'grayscale(100%)';
    if (type === 'sepia') ctx.filter = 'sepia(100%)';
    if (type === 'invert') ctx.filter = 'invert(100%)';
    if (type === 'contrast') ctx.filter = 'contrast(150%) brightness(1.1)';
    if (type === 'blur') ctx.filter = 'blur(5px)';

    ctx.drawImage(img, 0, 0);
    // Note: ctx.filter is modern API, works in most browsers now.
};

download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited_photo.png';
    link.href = canvas.toDataURL();
    link.click();
});
