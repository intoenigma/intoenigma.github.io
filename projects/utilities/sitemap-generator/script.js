const input = document.getElementById('html-in');
const output = document.getElementById('xml-out');
const genBtn = document.getElementById('gen-btn');
const dlBtn = document.getElementById('download-btn');

genBtn.addEventListener('click', () => {
    const html = input.value;
    if (!html) return;

    // Create DOM element to parse
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));

    // Extract Hrefs
    const urls = links
        .map(a => a.href)
        .filter(u => u.startsWith('http')) // Only absolute HTTP links usually
        .filter((v, i, a) => a.indexOf(v) === i); // Unique

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
        xml += '   <url>\n';
        xml += `      <loc>${url}</loc>\n`;
        xml += `      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '   </url>\n';
    });

    xml += '</urlset>';
    output.value = xml;
    if (urls.length) alert(`Found ${urls.length} unique links.`);
});

dlBtn.addEventListener('click', () => {
    const blob = new Blob([output.value], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
});
