const THESAURUS = {
    'सुंदर':   { syn:['रूपवान','मनोहर','आकर्षक','रमणीय','मनमोहक','ललित','श्रेयस्कर','भव्य'], ant:['कुरूप','असुंदर','भद्दा'], meaning:'जो देखने में अच्छा लगे' },
    'प्रेम':   { syn:['प्यार','मोहब्बत','स्नेह','अनुराग','प्रीति','ममता','आसक्ति','वात्सल्य'], ant:['घृणा','द्वेष','नफरत'], meaning:'गहरा लगाव या अनुराग' },
    'जल':     { syn:['पानी','नीर','वारि','अंबु','तोय','उदक','सलिल','पय'], ant:['अग्नि'], meaning:'पृथ्वी पर पाया जाने वाला द्रव' },
    'आकाश':   { syn:['नभ','गगन','अंबर','व्योम','अनंत','आसमान','द्यौ','शून्य'], ant:['पृथ्वी'], meaning:'आसमान, अनंत शून्य' },
    'वायु':   { syn:['हवा','पवन','समीर','अनिल','मारुत','वात','झोंका'], ant:[], meaning:'गैसों का मिश्रण जिसमें हम साँस लेते हैं' },
    'पृथ्वी': { syn:['धरती','भूमि','जमीन','धरा','वसुधा','अवनि','मेदिनी','क्षिति'], ant:['आकाश'], meaning:'हमारा ग्रह, ज़मीन' },
    'अग्नि':  { syn:['आग','ज्वाला','पावक','दहन','अनल','वैश्वानर','शिखी'], ant:['जल'], meaning:'जलती हुई लपट' },
    'सूर्य':  { syn:['सूरज','रवि','दिनकर','भास्कर','दिवाकर','अर्क','मार्तण्ड','तरणि'], ant:['चंद्र'], meaning:'सौरमंडल का केंद्रीय तारा' },
    'चंद्र':  { syn:['चाँद','शशि','सोम','निशाकर','हिमकर','इंदु','रजनीकर'], ant:['सूर्य'], meaning:'पृथ्वी का उपग्रह' },
    'रात':    { syn:['रात्रि','निशा','यामिनी','विभावरी','रजनी','तमस'], ant:['दिन','प्रकाश'], meaning:'सूर्यास्त से सूर्योदय तक का समय' },
    'दिन':    { syn:['दिवस','वार','अह','अहन','दिवा'], ant:['रात'], meaning:'सूर्योदय से सूर्यास्त तक' },
    'घर':     { syn:['गृह','निवास','आवास','भवन','मकान','सदन','धाम','प्रासाद'], ant:[], meaning:'रहने का स्थान' },
    'मार्ग':  { syn:['रास्ता','पथ','पंथ','राह','सड़क','डगर','पगडंडी'], ant:[], meaning:'जाने का रास्ता' },
    'भोजन':   { syn:['खाना','अन्न','आहार','भात','रोटी','खाद्य','भक्ष्य'], ant:[], meaning:'खाने की सामग्री' },
    'शक्ति':  { syn:['बल','ताकत','सामर्थ्य','ऊर्जा','पराक्रम','दमखम','क्षमता'], ant:['कमजोरी','दुर्बलता'], meaning:'करने की क्षमता' },
    'ज्ञान':  { syn:['विद्या','बोध','शिक्षा','जानकारी','समझ','गयान','प्रज्ञा'], ant:['अज्ञान','मूर्खता'], meaning:'जानने की अवस्था' },
    'शांति':  { syn:['चैन','सुकून','विराम','अमन','सौम्यता','स्थिरता','निर्वाण'], ant:['अशांति','उपद्रव'], meaning:'मानसिक स्थिरता' },
    'प्रकाश': { syn:['रोशनी','उजाला','ज्योति','दीप्ति','आलोक','किरण','भास'], ant:['अंधकार','तम'], meaning:'जो दिखाई दे सकने में सहायक हो' },
    'अंधकार': { syn:['अँधेरा','तम','तिमिर','अंधेरा','निशा'], ant:['प्रकाश','उजाला'], meaning:'प्रकाश का अभाव' },
    'मित्र':  { syn:['दोस्त','सखा','यार','सहचर','बंधु','साथी','हमदम'], ant:['शत्रु','दुश्मन'], meaning:'प्रिय साथी' },
    'राजा':   { syn:['नरेश','नृप','शासक','भूपति','महाराज','अधिपति','सम्राट'], ant:['प्रजा','सेवक'], meaning:'राज्य का शासक' },
    'स्त्री': { syn:['महिला','नारी','औरत','वनिता','ललना','रमणी','कांता'], ant:['पुरुष'], meaning:'स्त्री जाति का सदस्य' },
    'पुरुष':  { syn:['आदमी','मर्द','नर','मानव','व्यक्ति'], ant:['स्त्री'], meaning:'पुरुष जाति का सदस्य' },
};

function searchSynonyms() {
    const word    = document.getElementById('search-word').value.trim();
    const results = document.getElementById('results');
    const nf      = document.getElementById('not-found');

    if (!word) { results.style.display = 'none'; nf.style.display = 'none'; return; }

    // Exact or partial match
    const key = Object.keys(THESAURUS).find(k => k === word || k.includes(word) || word.includes(k));

    if (!key) {
        results.style.display = 'none';
        nf.style.display = 'block';
        return;
    }

    const entry = THESAURUS[key];
    document.getElementById('word-header').textContent  = key;
    document.getElementById('word-meaning').textContent = entry.meaning;
    document.getElementById('synonym-tags').innerHTML   = entry.syn.map(s =>
        `<span class="tag" style="cursor:pointer; font-size:15px;" onclick="document.getElementById('search-word').value='${s}';searchSynonyms()">${s}</span>`
    ).join('');

    const antSection = document.getElementById('antonym-section');
    if (entry.ant && entry.ant.length > 0) {
        document.getElementById('antonym-tags').innerHTML = entry.ant.map(a =>
            `<span class="tag" style="background:#fdf0f0;border-color:#e0c0c0;color:#b12704;font-size:15px;">${a}</span>`
        ).join('');
        antSection.style.display = 'block';
    } else {
        antSection.style.display = 'none';
    }

    results.style.display = 'block';
    nf.style.display      = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-word').addEventListener('keydown', e => {
        if (e.key === 'Enter') searchSynonyms();
    });
});
