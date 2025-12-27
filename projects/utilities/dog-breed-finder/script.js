const select = document.getElementById('breed-select');
const btn = document.getElementById('fetch-btn');
const container = document.getElementById('image-container');

async function loadBreeds() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    const breeds = Object.keys(data.message);

    breeds.forEach(breed => {
        const opt = document.createElement('option');
        opt.value = breed;
        opt.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        select.appendChild(opt);
    });
}

async function fetchImage() {
    const breed = select.value;
    if (!breed) return;

    container.innerHTML = '<div class="placeholder">Loading...</div>';

    try {
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await res.json();

        const img = document.createElement('img');
        img.src = data.message;
        img.onload = () => {
            container.innerHTML = '';
            container.appendChild(img);
        };
    } catch (e) {
        container.innerHTML = '<div class="placeholder">Error fetching image</div>';
    }
}

btn.addEventListener('click', fetchImage);
select.addEventListener('change', fetchImage);

loadBreeds();
