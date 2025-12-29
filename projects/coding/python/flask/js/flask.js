/**
 * Flask Code Snippets Application
 * Improved & Corrected Version
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =======================
       STATE
    ======================= */
    const state = {
        snippets: [],
        filteredSnippets: [],
        activeSnippet: null,
        currentFilter: 'all',
        currentSort: 'name'
    };

    /* =======================
       DOM ELEMENTS
    ======================= */
    const el = {
        searchInput: document.getElementById('searchInput'),
        clearSearch: document.getElementById('clearSearch'),
        snippetsList: document.getElementById('snippetsList'),
        snippetCount: document.getElementById('snippetCount'),
        filterTags: document.querySelectorAll('.filter-tag'),
        sortSelect: document.getElementById('sortSelect'),

        snippetInfo: document.getElementById('snippetInfo'),
        codeDisplay: document.getElementById('codeDisplay'),
        snippetTitle: document.getElementById('snippetTitle'),
        snippetCategory: document.getElementById('snippetCategory'),
        snippetDifficulty: document.getElementById('snippetDifficulty'),
        snippetMethod: document.getElementById('snippetMethod'),
        codeSnippet: document.getElementById('codeSnippet'),
        requirementsList: document.getElementById('requirementsList'),
        snippetDescription: document.getElementById('snippetDescription'),
        snippetNotes: document.getElementById('snippetNotes'),
        responseSuccess: document.getElementById('responseSuccess'),
        responseError: document.getElementById('responseError'),
        tagsContainer: document.getElementById('tagsContainer'),

        copyBtn: document.getElementById('copyBtn'),
        expandBtn: document.getElementById('expandBtn'),
        viewRawBtn: document.getElementById('viewRawBtn'),

        toast: document.getElementById('toast')
    };

    /* =======================
       INIT
    ======================= */
    init();

    async function init() {
        try {
            await loadSnippets();
            setupEvents();
            applyFiltersAndSort();
            renderSnippetList();
            console.log('✅ App initialized');
        } catch (err) {
            console.error(err);
            showError('Failed to load snippets.');
        }
    }

    /* =======================
       DATA
    ======================= */
    async function loadSnippets() {
        const res = await fetch('data/snippets.json');
        if (!res.ok) throw new Error('Fetch failed');
        state.snippets = await res.json();
        state.filteredSnippets = state.snippets.slice();
    }

    /* =======================
       EVENTS
    ======================= */
    function setupEvents() {
        el.searchInput.addEventListener('input', debounce(handleSearch, 300));
        el.clearSearch.addEventListener('click', clearSearch);

        el.filterTags.forEach(tag =>
            tag.addEventListener('click', () => setFilter(tag))
        );

        el.sortSelect.addEventListener('change', handleSort);

        el.copyBtn.addEventListener('click', copyCode);
        el.expandBtn.addEventListener('click', toggleExpand);
        el.viewRawBtn.addEventListener('click', viewRaw);
        el.themeBtn.addEventListener('click', toggleTheme);

        document.addEventListener('keydown', handleShortcuts);
    }

    /* =======================
       FILTER / SEARCH / SORT
    ======================= */
    function handleSearch() {
        applyFiltersAndSort(el.searchInput.value.toLowerCase().trim());
        renderSnippetList();
    }

    function clearSearch() {
        el.searchInput.value = '';
        applyFiltersAndSort();
        renderSnippetList();
    }

    function setFilter(tag) {
        el.filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        state.currentFilter = tag.dataset.filter;
        applyFiltersAndSort();
        renderSnippetList();
    }

    function handleSort() {
        state.currentSort = el.sortSelect.value;
        applyFiltersAndSort();
        renderSnippetList();
    }

    function applyFiltersAndSort(search = '') {
        let list = state.snippets.slice();

        if (state.currentFilter !== 'all') {
            list = list.filter(s => s.category === state.currentFilter);
        }

        if (search) {
            list = list.filter(s =>
                [
                    s.name,
                    s.description,
                    ...s.keywords,
                    ...s.tags
                ].join(' ').toLowerCase().includes(search)
            );
        }

        list.sort((a, b) => {
            if (state.currentSort === 'difficulty') {
                const order = { easy: 0, medium: 1, hard: 2 };
                return order[a.difficulty] - order[b.difficulty];
            }
            return a[state.currentSort].localeCompare(b[state.currentSort]);
        });

        state.filteredSnippets = list;
        updateCount();
    }

    /* =======================
       RENDERING
    ======================= */
    function updateCount() {
        el.snippetCount.textContent =
            `${state.filteredSnippets.length} snippet(s)`;
    }

    function renderSnippetList() {
        if (!state.filteredSnippets.length) {
            el.snippetsList.innerHTML = `<p>No snippets found</p>`;
            return;
        }

        el.snippetsList.innerHTML = state.filteredSnippets.map(s => `
            <div class="snippet-card" data-id="${s.id}">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
            </div>
        `).join('');

        document.querySelectorAll('.snippet-card').forEach((card, i) => {
            card.addEventListener('click', () =>
                selectSnippet(state.filteredSnippets[i])
            );
        });
    }

    function selectSnippet(snippet) {
        state.activeSnippet = snippet;
        el.snippetInfo.style.display = 'none';
        el.codeDisplay.style.display = 'flex';

        el.snippetTitle.textContent = snippet.name;
        el.snippetCategory.textContent = snippet.category;
        el.snippetDifficulty.textContent = snippet.difficulty;
        el.snippetMethod.textContent = snippet.method;

        el.codeSnippet.textContent = snippet.code;
        el.snippetDescription.textContent = snippet.description;
        el.snippetNotes.textContent = snippet.notes || '—';

        el.responseSuccess.textContent = snippet.response.success;
        el.responseError.textContent = snippet.response.error;

        el.requirementsList.innerHTML =
            snippet.requires.map(r => `<span>${r}</span>`).join('');

        el.tagsContainer.innerHTML =
            [...snippet.tags, ...snippet.keywords]
                .map(t => `<span class="tag">${t}</span>`).join('');
    }

    /* =======================
       ACTIONS
    ======================= */
    async function copyCode() {
        if (!state.activeSnippet) return;
        await navigator.clipboard.writeText(state.activeSnippet.code);
        showToast('Copied!', 'success');
    }

    function toggleExpand() {
        const expanded = el.codeDisplay.classList.toggle('expanded');
        expanded
            ? el.codeDisplay.requestFullscreen?.()
            : document.exitFullscreen?.();
    }

    function viewRaw() {
        if (!state.activeSnippet) return;
        const blob = new Blob([state.activeSnippet.code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        window.open(url);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function toggleTheme() {
        const isLightTheme = document.body.classList.toggle('light-theme');
        el.themeBtn.innerHTML = isLightTheme ? '🌞' : '🌙';
    }

    /* =======================
       SHORTCUTS
    ======================= */
    function handleShortcuts(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            el.searchInput.focus();
        }
        if (e.key === 'Escape') clearSearch();
    }

    /* =======================
       UTILS
    ======================= */
    function debounce(fn, delay) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        };
    }

    function showToast(msg) {
        el.toast.querySelector('.toast-message').textContent = msg;
        el.toast.classList.add('show');
        setTimeout(() => el.toast.classList.remove('show'), 2500);
    }

    function showError(msg) {
        el.snippetsList.innerHTML = `<p>${msg}</p>`;
    }
});
