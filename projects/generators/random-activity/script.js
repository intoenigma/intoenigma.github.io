const actEl = document.getElementById('activity');
const typeEl = document.getElementById('type');

async function getActivity() {
    try {
        const res = await fetch('https://www.boredapi.com/api/activity');
        const data = await res.json();
        actEl.innerText = data.activity;
        typeEl.innerText = data.type;
    } catch(e) {
        // Simple fallback array as boredapi sometimes flakes
        const fallback = [
            { a: "Learn a new CSS trick", t: "education" },
            { a: "Go for a walk", t: "recreation" },
            { a: "Organize your desktop", t: "busywork" },
            { a: "Read a Tech Blog", t: "education" }
        ];
        const r = fallback[Math.floor(Math.random()*fallback.length)];
        actEl.innerText = r.a;
        typeEl.innerText = r.t;
    }
}
getActivity();
