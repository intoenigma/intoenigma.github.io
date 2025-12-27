const container = document.getElementById('bars');
let bars = [];
const numBars = 30;

function generateBars() {
    container.innerHTML = '';
    bars = [];
    for(let i=0; i<numBars; i++) {
        const h = Math.floor(Math.random() * 300) + 20;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${h}px`;
        container.appendChild(bar);
        bars.push({ el: bar, val: h });
    }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function bubbleSort() {
    const len = bars.length;
    for(let i=0; i<len; i++) {
        for(let j=0; j<len-i-1; j++) {
            bars[j].el.classList.add('active');
            bars[j+1].el.classList.add('active');
            
            if(bars[j].val > bars[j+1].val) {
                await sleep(50);
                // Swap height
                let temp = bars[j].val;
                bars[j].val = bars[j+1].val;
                bars[j+1].val = temp;
                
                bars[j].el.style.height = `${bars[j].val}px`;
                bars[j+1].el.style.height = `${bars[j+1].val}px`;
            }
            
            bars[j].el.classList.remove('active');
            bars[j+1].el.classList.remove('active');
        }
        bars[len-i-1].el.classList.add('sorted');
    }
    bars[0].el.classList.add('sorted');
}

async function selectionSort() {
    const len = bars.length;
    for(let i=0; i<len; i++) {
        let min = i;
        for(let j=i+1; j<len; j++) {
            bars[j].el.classList.add('active');
            await sleep(20);
            if(bars[j].val < bars[min].val) min = j;
            bars[j].el.classList.remove('active');
        }
        if(min !== i) {
             let temp = bars[i].val;
             bars[i].val = bars[min].val;
             bars[min].val = temp;
             bars[i].el.style.height = `${bars[i].val}px`;
             bars[min].el.style.height = `${bars[min].val}px`;
        }
        bars[i].el.classList.add('sorted');
    }
}

generateBars();
window.generateBars = generateBars;
window.bubbleSort = bubbleSort;
window.selectionSort = selectionSort;
