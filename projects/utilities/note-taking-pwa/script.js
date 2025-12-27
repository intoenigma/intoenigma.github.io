const list = document.getElementById('note-list');
const titleIn = document.getElementById('title-in');
const bodyIn = document.getElementById('body-in');
const saveBtn = document.getElementById('save-btn');
const newBtn = document.getElementById('new-btn');

let notes = JSON.parse(localStorage.getItem('ie_notes')) || [];
let currentId = null;

function renderList() {
    list.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = `note-item ${note.id === currentId ? 'active' : ''}`;
        div.textContent = note.title || 'Untitled Note';
        div.onclick = () => loadNote(note.id);
        list.appendChild(div);
    });
}

function loadNote(id) {
    const note = notes.find(n => n.id === id);
    if(note) {
        currentId = note.id;
        titleIn.value = note.title;
        bodyIn.value = note.body;
        renderList();
    }
}

newBtn.addEventListener('click', () => {
    currentId = null;
    titleIn.value = '';
    bodyIn.value = '';
    renderList();
});

saveBtn.addEventListener('click', () => {
    const title = titleIn.value;
    const body = bodyIn.value;
    
    if(!title && !body) return;
    
    if(currentId) {
        // Update
        const idx = notes.findIndex(n => n.id === currentId);
        if(idx !== -1) {
            notes[idx].title = title;
            notes[idx].body = body;
            notes[idx].updated = Date.now();
        }
    } else {
        // Create
        const newNote = {
            id: Date.now(),
            title,
            body,
            created: Date.now()
        };
        notes.unshift(newNote); // Add to top
        currentId = newNote.id;
    }
    
    localStorage.setItem('ie_notes', JSON.stringify(notes));
    renderList();
});

// Init
if(notes.length > 0) loadNote(notes[0].id);
renderList();
