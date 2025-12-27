const jsonInput = document.getElementById('json-input');
const csvOutput = document.getElementById('csv-output');
const convertBtn = document.getElementById('convert-btn');
const errorMsg = document.getElementById('error-msg');

convertBtn.addEventListener('click', () => {
    errorMsg.textContent = '';
    csvOutput.value = '';

    try {
        const json = JSON.parse(jsonInput.value);
        if (!Array.isArray(json)) throw new Error("Input must be a JSON Array of objects.");
        if (json.length === 0) throw new Error("Array is empty.");

        const keys = Object.keys(json[0]);
        const csvRows = [];

        // Header
        csvRows.push(keys.join(','));

        // Rows
        for (const row of json) {
            const values = keys.map(key => {
                const escaped = ('' + row[key]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        csvOutput.value = csvRows.join('\n');
    } catch (e) {
        errorMsg.textContent = "Error: " + e.message;
        errorMsg.style.color = '#ff0055';
    }
});
