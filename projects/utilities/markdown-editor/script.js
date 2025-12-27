const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Initial Render
preview.innerHTML = marked.parse(editor.value);

editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value);
});
