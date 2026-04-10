let memeCache = [];
let currentMemeUrl = "";

// Using window.onload to ensure DOM and displayArea are available
window.addEventListener('DOMContentLoaded', () => {
    const displayArea = document.getElementById('meme-detail-view');
    
    /**
     * Pick a strategic random meme and render it properly
     */
    window.getNewMeme = function() {
        if (memeCache.length === 0) {
            console.error("Meme cache is empty!");
            return;
        }

        // Show loading state
        displayArea.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Scanning repository...</p>
            </div>
        `;

        const randomMeme = memeCache[Math.floor(Math.random() * memeCache.length)];
        currentMemeUrl = randomMeme.url;
        
        // Use a timeout to ensure the transition feels right
        setTimeout(() => {
            displayArea.innerHTML = `
                <div class="meme-image-wrapper" style="opacity: 1; min-height: 200px; display: flex; justify-content: center; width: 100%;">
                    <img src="${randomMeme.url}" alt="${randomMeme.name}" style="max-width: 100%; height: auto; border-radius: 8px;">
                </div>
                <h3 class="meme-title" style="margin-top: 15px;">${randomMeme.name}</h3>
            `;
        }, 100);
    };

    /**
     * Download the current meme template
     */
    window.downloadMeme = function() {
        if (!currentMemeUrl) return;
        window.open(currentMemeUrl, '_blank');
    };

    /**
     * Fetch and Cache Memes from API
     */
    async function loadMemeInventory() {
        try {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const json = await res.json();
            if (json.success) {
                memeCache = json.data.memes;
                window.getNewMeme();
            } else {
                throw new Error("API unsuccessful");
            }
        } catch (e) {
            console.error("Fetch Error:", e);
            displayArea.innerHTML = `
                <div class="error-msg" style="text-align:center; color:#f63636; padding:20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size:30px; margin-bottom:10px;"></i>
                    <p>Failed to sync with Meme Network. Please refresh the page.</p>
                </div>
            `;
        }
    }

    loadMemeInventory();
});
