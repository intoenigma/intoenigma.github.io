/* LeetCode Module Common Logic */

/**
 * Renders problem cards into a target container
 * @param {Array} problems - Array of problem objects
 * @param {HTMLElement} container - The target grid element
 */
function renderProblemCards(problems, container) {
    if (!container) return;
    
    if (problems.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: #fff; border-radius: 12px; border: 1px dashed #ccc;">
                <i class="fas fa-search" style="font-size: 40px; color: #ccc; margin-bottom: 20px;"></i>
                <p style="font-size: 18px; color: #666; font-weight: 600;">No problems found matching your criteria.</p>
                <button onclick="resetFilters()" style="margin-top: 15px; background: #007185; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Reset All Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = problems.map(p => `
        <a href="${p.id}/index.html" class="problem-card">
            <div>
                <div class="card-header">
                    <span class="id-label">#${p.id}</span>
                    <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
                </div>
                <h3 class="card-title">${p.title}</h3>
                <div class="tag-container">
                    ${p.topics.slice(0, 3).map(t => `<span class="topic-tag">${t}</span>`).join('')}
                    ${p.topics.length > 3 ? '<span class="topic-tag">+${p.topics.length - 3}</span>' : ''}
                </div>
            </div>
            <div style="margin-top: 25px; color: #007185; font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                Master This Problem <i class="fas fa-arrow-right-long"></i>
            </div>
        </a>
    `).join('');
}

/**
 * Snippet Switching for Detail Pages
 */
function initializeSnippetManager(snippets) {
    window.switchLang = function(lang) {
        const codeElement = document.getElementById('code-display');
        if (!codeElement) return;

        const snippet = snippets[lang] || "// Snippet not available for this language.";
        codeElement.textContent = snippet;
        
        // Update active class on buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const btnText = btn.textContent.toLowerCase().replace('+', 'p').replace('+', 'p');
            btn.classList.toggle('active', btnText.includes(lang.replace('3', '')));
        });
    };

    window.copyCode = function() {
        const code = document.getElementById('code-display').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#1db446';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        });
    };
}

/**
 * Smooth UI reveal animation
 */
function revealUI() {
    const cards = document.querySelectorAll('.problem-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}
