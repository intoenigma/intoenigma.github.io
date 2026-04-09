const STOP_WORDS = new Set(['का','के','की','में','से','है','हैं','को','पर','यह','वह','एक','और','जो','कि','एवं','तथा','व','ने','या','भी','हो','था','थी','थे','हुए','हुई','हुआ','किया','किए','किसी','किस','कोई','अगर','तो','लेकिन','परंतु','जब','तब','वहाँ','यहाँ','अब','फिर','जैसे','वैसे','लिए','रहा','रही','रहे','मैं','हम','तुम','आप','वे','इस','उस','इन','उन','न','नहीं','बहुत','सब','सभी','हर','ही','साथ','बिना','पर','अपने','अपनी','अपना','कर','है','हो','था','थी']);

function analyze() {
    const text       = document.getElementById('input-text').value;
    const target     = document.getElementById('target-keyword').value.trim();
    const excStop    = document.getElementById('exclude-stop').checked;

    let words = text.trim().split(/\s+/).map(w => w.replace(/[।?!,।॥]/g, '').trim()).filter(w => w.length > 1);
    if (excStop) words = words.filter(w => !STOP_WORDS.has(w));

    const total  = words.length;
    const freq   = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,30);

    document.getElementById('s-total').textContent  = total;
    document.getElementById('s-unique').textContent = Object.keys(freq).length;

    if (target) {
        const tc = freq[target] || 0;
        const dens = total > 0 ? ((tc / total) * 100).toFixed(2) : 0;
        document.getElementById('s-target-pill').style.display = 'flex';
        document.getElementById('s-density').textContent = `${dens}% (${tc} बार)`;
    }

    const max = sorted[0]?.[1] || 1;
    const tbody = document.getElementById('kw-table');
    tbody.innerHTML = sorted.map(([w, n], i) => {
        const dens = total > 0 ? ((n / total) * 100).toFixed(2) : 0;
        const bar  = Math.round((n / max) * 100);
        const isTarget = w === target;
        return `<tr style="background:${isTarget?'#fffbf0':''};">
            <td style="padding:6px 12px; border:1px solid #ddd; color:#565959;">${i+1}</td>
            <td style="padding:6px 12px; border:1px solid #ddd; font-family:'Noto Sans Devanagari',sans-serif; font-size:15px; ${isTarget?'font-weight:700;color:#007185;':''}">${w}</td>
            <td style="padding:6px 12px; border:1px solid #ddd; text-align:center; font-weight:700;">${n}</td>
            <td style="padding:6px 12px; border:1px solid #ddd; text-align:center;">${dens}%</td>
            <td style="padding:6px 12px; border:1px solid #ddd;"><div style="background:#007185;height:8px;width:${bar}%;border-radius:4px;"></div></td>
        </tr>`;
    }).join('');

    document.getElementById('results').style.display = 'block';
}

function clearAll() {
    document.getElementById('input-text').value = '';
    document.getElementById('target-keyword').value = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('s-target-pill').style.display = 'none';
}
