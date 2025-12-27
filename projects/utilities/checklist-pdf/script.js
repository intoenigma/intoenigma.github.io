const { jsPDF } = window.jspdf;

document.getElementById('generate-btn').addEventListener('click', () => {
    const title = document.getElementById('pdf-title').value || "Checklist";
    const text = document.getElementById('pdf-content').value;

    if (!text.trim()) return alert("Please add some items.");

    const doc = new jsPDF();
    const items = text.split('\n');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(title, 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    let y = 40;
    items.forEach(item => {
        if (item.trim()) {
            // Draw a square for checkbox
            doc.rect(20, y - 4, 4, 4);
            doc.text(item, 30, y);
            y += 10;
        }
    });

    doc.save(`${title.toLowerCase().replace(/ /g, '_')}.pdf`);
});
