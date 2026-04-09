const FONTS = [
    { name: 'Noto Sans Devanagari', family: "'Noto Sans Devanagari', sans-serif", type: 'Google Font' },
    { name: 'Tiro Devanagari Hindi', family: "'Tiro Devanagari Hindi', serif", type: 'Google Font' },
    { name: 'Arial Unicode MS', family: "'Arial Unicode MS', Arial, sans-serif", type: 'System Font' },
    { name: 'Mangal', family: "Mangal, 'Noto Sans Devanagari', sans-serif", type: 'System Font' },
    { name: 'Kokila', family: "Kokila, 'Noto Sans Devanagari', serif", type: 'System Font (Windows)' },
    { name: 'Utsaah', family: "Utsaah, 'Noto Sans Devanagari', sans-serif", type: 'System Font (Windows)' },
    { name: 'Aparajita', family: "Aparajita, 'Noto Sans Devanagari', serif", type: 'System Font (Windows)' },
    { name: 'Lohit Devanagari', family: "'Lohit Devanagari', 'Noto Sans Devanagari', sans-serif", type: 'System Font (Linux)' },
    { name: 'Samyak Devanagari', family: "'Samyak Devanagari', 'Noto Sans Devanagari', serif", type: 'System Font' },
    { name: 'Sanskrit 2003', family: "'Sanskrit 2003', 'Noto Sans Devanagari', serif", type: 'Specialty Font' },
    { name: 'Times New Roman', family: "'Times New Roman', serif", type: 'Legacy (limited)' },
];

let currentSize = 20;

function updatePreviews() {
    const text = document.getElementById('preview-text').value || 'नमस्ते भारत। हिन्दी भाषा।';
    const container = document.getElementById('font-previews');
    container.innerHTML = FONTS.map(f => `
        <div class="card" style="margin-bottom:12px; padding:15px 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <strong style="font-size:13px;">${f.name}</strong>
                <span style="font-size:11px; color:#565959; background:#f0f2f2; padding:2px 8px; border-radius:10px;">${f.type}</span>
            </div>
            <div style="font-family:${f.family}; font-size:${currentSize}px; line-height:1.8; color:#0f1111; border-top:1px solid #eee; padding-top:10px;">
                ${text.replace(/\n/g, '<br>')}
            </div>
        </div>
    `).join('');
}

function updateSize(v) {
    currentSize = parseInt(v);
    document.getElementById('fs-val').textContent = v + 'px';
    updatePreviews();
}

document.addEventListener('DOMContentLoaded', updatePreviews);
