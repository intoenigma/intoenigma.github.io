/**
 * IntoEnigma Central Layout Engine
 * Handles dynamic header, footer, breadcrumbs, and sidebar injection for 150+ tools.
 */

const TOOL_REGISTRY = {
    'calculators': [
        { name: 'Age Calculator', path: 'age-calculator/index.html' },
        { name: 'BMI Analyzer', path: 'bmi-calculator/index.html' },
        { name: 'Car Loan', path: 'car-loan-calculator/index.html' },
        { name: 'Fixed Deposit', path: 'fixed-deposit-calculator/index.html' },
        { name: 'Gratuity Node', path: 'gratuity-calculator/index.html' },
        { name: 'Home Loan', path: 'home-loan-calculator/index.html' },
        { name: 'Inflation Tracker', path: 'inflation-calculator/index.html' },
        { name: 'Loan EMI', path: 'loan-emi-calculator/index.html' },
        { name: 'Rule of 72', path: 'rule-of-72-calculator/index.html' },
        { name: 'Salary Splitter', path: 'salary-splitter/index.html' },
        { name: 'Sleep Cycle', path: 'sleep-cycle-calculator/index.html' },
        { name: 'Tax Calculator', path: 'tax-calculator/index.html' },
        { name: 'Unit Cost', path: 'unit-cost-calculator/index.html' }
    ],
    'games': [
        { name: 'Snake Quantum', path: 'snake-game/index.html' },
        { name: 'Sudoku Grid', path: 'sudoku/index.html' },
        { name: 'Memory Protocol', path: 'memory-game/index.html' }
    ],
    'utilities': [
        { name: 'Audio Visualizer', path: 'audio-visualizer/index.html' },
        { name: 'Auto Refresh', path: 'auto-refresh/index.html' },
        { name: 'Barcode Scanner', path: 'barcode-scanner/index.html' },
        { name: 'Binaural Beats Player', path: 'binaural-beats-player/index.html' },
        { name: 'Bio Link Creator', path: 'bio-link-page/index.html' },
        { name: 'Budget Planner', path: 'budget-planner/index.html' },
        { name: 'Calm Breathing App', path: 'calm-breathing/index.html' },
        { name: 'Checklist Maker', path: 'checklist-maker/index.html' },
        { name: 'Checklist PDF Export', path: 'checklist-pdf/index.html' },
        { name: 'Country Info Hub', path: 'country-info-hub/index.html' },
        { name: 'Cron Job Generator', path: 'cron-job-generator/index.html' },
        { name: 'Crypto Portfolio Tracker', path: 'crypto-portfolio/index.html' },
        { name: 'Dog Breed Finder', path: 'dog-breed-finder/index.html' },
        { name: 'Duplicate Line Finder', path: 'duplicate-finder/index.html' },
        { name: 'Email Validator', path: 'email-validator/index.html' },
        { name: 'Eye Exercise App', path: 'eye-exercise-app/index.html' },
        { name: 'Favicon Generator', path: 'favicon-generator/index.html' },
        { name: 'File Encryptor', path: 'file-encryptor/index.html' },
        { name: 'Flashlight Web App', path: 'flashlight-app/index.html' },
        { name: 'Git Cheat Sheet', path: 'git-cheat-sheet/index.html' },
        { name: 'History Timeline', path: 'history-timeline/index.html' },
        { name: 'HTML Entity Lookup', path: 'html-entity-lookup/index.html' },
        { name: 'HTML Minifier', path: 'html-minifier/index.html' },
        { name: 'HTTP Header Checker', path: 'http-header-check/index.html' },
        { name: 'Instagram-style Filters', path: 'insta-filter-clone/index.html' },
        { name: 'JS Console UI', path: 'js-console-ui/index.html' },
        { name: 'JWT Decoder', path: 'jwt-decoder/index.html' },
        { name: 'Kanban Board', path: 'kanban-board/index.html' },
        { name: 'Markdown Blog Viewer', path: 'markdown-blog/index.html' },
        { name: 'Markdown Editor', path: 'markdown-editor/index.html' },
        { name: 'Mars Rover Photo Feed', path: 'mars-rover-photos/index.html' },
        { name: 'Meditation Timer', path: 'meditation-timer/index.html' },
        { name: 'Musician Metronome', path: 'metronome/index.html' },
        { name: 'Multi-Engine Search', path: 'multi-search/index.html' },
        { name: 'Name Meaning Finder', path: 'name-meaning/index.html' },
        { name: 'News Headline App', path: 'news-app/index.html' },
        { name: 'Note Taking PWA', path: 'note-taking-pwa/index.html' },
        { name: 'Password Strength Meter', path: 'password-strength/index.html' },
        { name: 'Web PDF Viewer', path: 'pdf-viewer/index.html' },
        { name: 'Placeholder Img Gen', path: 'placeholder-img/index.html' },
        { name: 'Network Port Scanner', path: 'port-scanner-js/index.html' },
        { name: 'JS Code Prettifier', path: 'prettify-js/index.html' },
        { name: 'Project Roadmap', path: 'project-timeline/index.html' },
        { name: 'Web Screen Recorder', path: 'screen-recorder/index.html' },
        { name: 'Screen Resolution Info', path: 'screen-resolution/index.html' },
        { name: 'Sitemap Generator', path: 'sitemap-generator/index.html' },
        { name: 'SFX Soundboard', path: 'soundboard/index.html' },
        { name: 'Speed Reading Tool', path: 'speed-reading/index.html' },
        { name: 'Stopwatch with Lap Log', path: 'stopwatch-log/index.html' },
        { name: 'Tab Management UI', path: 'tab-manager-ui/index.html' },
        { name: 'Tab Title Editor', path: 'tab-name-editor/index.html' },
        { name: 'Instant URL Shortener', path: 'url-shortener/index.html' },
        { name: 'Audio Voice Recorder', path: 'voice-recorder/index.html' },
        { name: 'Global Weather Feed', path: 'weather-forecast/index.html' },
        { name: 'Advanced Wiki Search', path: 'wikipedia-search/index.html' },
        { name: 'Browser Zip Creator', path: 'zip-file-creator/index.html' }
    ],
    'quizzes': [
        { name: 'Alphabet Learner', path: 'alphabet-learner/index.html' },
        { name: 'Flag Nexus', path: 'flag-quiz/index.html' },
        { name: 'Flashcard Core', path: 'flashcard-quiz/index.html' },
        { name: 'Geography Scan', path: 'geography-quiz/index.html' },
        { name: 'Math Matrix', path: 'math-quiz/index.html' },
        { name: 'Worksheet Forge', path: 'math-worksheet-gen/index.html' },
        { name: 'Morse Operative', path: 'morse-code-trainer/index.html' },
        { name: 'Element Hunter', path: 'periodic-quiz/index.html' },
        { name: 'Input Stream', path: 'typing-tutor/index.html' },
        { name: 'Lexicon Prime', path: 'vocabulary-builder/index.html' }
    ],
    'hindi-toolkit': [
        { name: 'Unicode → Non-Unicode', path: 'unicode to Non-Unicode convertor/index.html' },
        { name: 'Non-Unicode → Unicode', path: 'Non-Unicode to unicode convertor/index.html' },
        { name: 'Character Counter', path: 'Hindi Character Counter/index.html' },
        { name: 'Find & Replace', path: 'Hindi Find & Replace Tool/index.html' },
        { name: 'Font Preview', path: 'Hindi Font Preview Tool/index.html' },
        { name: 'Grammar Checker', path: 'Hindi Grammar Checker/index.html' },
        { name: 'Keyword Density', path: 'Hindi Keyword Density Checker/index.html' },
        { name: 'Slug Generator', path: 'Hindi Slug Generator (URL friendly text)/index.html' },
        { name: 'Speech to Text', path: 'Hindi Speech to Text (STT)/index.html' },
        { name: 'Spell Checker', path: 'Hindi Spell Checker/index.html' },
        { name: 'Stop Words Remover', path: 'Hindi Stop Words Remover/index.html' },
        { name: 'Synonym Finder', path: 'Hindi Synonym Finder/index.html' },
        { name: 'Text Cleaner', path: 'Hindi Text Cleaner (remove extra spaces, junk chars)/index.html' },
        { name: 'Text Compare', path: 'Hindi Text Compare (diff checker)/index.html' },
        { name: 'Text Formatter', path: 'Hindi Text Formatter (paragraph, spacing, alignment)/index.html' },
        { name: 'Text to Speech', path: 'Hindi Text to Speech (TTS)/index.html' },
        { name: 'Transliteration', path: 'Hindi Transliteration Tool (Hinglish → Hindi)/index.html' },
        { name: 'Typing Practice', path: 'Hindi Typing Practice Tool/index.html' },
        { name: 'Unicode Normalizer', path: 'Hindi Unicode Normalizer/index.html' },
        { name: 'Word Counter', path: 'Hindi Word Counter/index.html' }
    ],
    'generators': [
        { name: 'Avatar Synthesizer', path: 'avatar-generator/index.html' },
        { name: 'Fake Profile Maker', path: 'fake-profile-gen/index.html' },
        { name: 'Lorem Image', path: 'lorem-image/index.html' },
        { name: 'Word Cloud', path: 'word-cloud-gen/index.html' },
        { name: 'Meme Finder', path: 'meme-template-finder/index.html' },
        { name: 'Random Joke', path: 'random-joke-generator/index.html' },
        { name: 'Truth or Dare', path: 'truth-or-dare-gen/index.html' },
        { name: 'Magic 8 Ball', path: 'magic-8-ball/index.html' },
        { name: 'Random Activity', path: 'random-activity/index.html' },
        { name: 'Cat Images', path: 'cat-images-gen/index.html' },
        { name: 'Variable Names', path: 'variable-name-gen/index.html' },
        { name: 'Nickname Gen', path: 'nickname-generator/index.html' },
        { name: 'Daily Quote', path: 'quote-of-the-day/index.html' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detect Environment & Path Depth
    const depth = calculatePathDepth();
    const rootPath = calculateRootPath(depth);
    const category = detectCategory();

    // 2. Inject Common Components
    injectHeader(rootPath);
    injectFooter(rootPath);
    injectBreadcrumbs(rootPath, depth);
    injectSidebar(rootPath, category);

    // 3. Initialize Shared Interactions (after injection)
    initScrollToTop();
    initSearch(rootPath);
});

/**
 * Detects the current category (e.g. 'calculators') from the URL
 */
function detectCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('hindi%20unicode%20converter%20toolkit') || path.includes('hindi unicode converter toolkit')) return 'hindi-toolkit';
    if (path.includes('calculators')) return 'calculators';
    if (path.includes('games')) return 'games';
    if (path.includes('utilities')) return 'utilities';
    if (path.includes('converters')) return 'converters';
    if (path.includes('quizzes')) return 'quizzes';
    if (path.includes('generators')) return 'generators';
    return null;
}

/**
 * Calculates how deep the current file is in the directory structure
 */
function calculatePathDepth() {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
        const src = s.getAttribute('src');
        if (src && src.includes('js/main.js')) {
            const match = src.match(/\.\.\//g);
            return match ? match.length : 0;
        }
    }
    return 0;
}

/**
 * Returns the relative prefix to reach the root (e.g. "../../")
 */
function calculateRootPath(depth) {
    let path = '';
    for (let i = 0; i < depth; i++) {
        path += '../';
    }
    return path || './';
}

/**
 * Injects the Amazon-style Header
 */
function injectHeader(root) {
    const headerContainer = document.getElementById('enigma-header');
    if (!headerContainer) return;

    headerContainer.innerHTML = `
    <header>
        <div class="header-main">
            <a href="${root}index.html" class="logo">Into<strong>Enigma</strong></a>
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search for tools, games, utilities...">
                <button aria-label="Search" id="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div class="header-links">
                <a href="#about">Your Account</a>
                <a href="https://github.com/intoenigma/intoenigma.github.io" target="_blank">GitHub Repo</a>
            </div>
        </div>
        <div class="header-sub">
            <a href="${root}index.html#calculators">Calculators</a>
            <a href="${root}projects/converters/index.html">Converters</a>
            <a href="${root}projects/games/index.html">Games</a>
            <a href="${root}projects/generators/index.html">Generators</a>
            <a href="${root}index.html#trackers">Trackers</a>
            <a href="${root}projects/utilities/index.html">Utilities</a>
            <a href="${root}projects/quizzes/index.html">Quizzes</a>
            <a href="${root}projects/Hindi Unicode Converter Toolkit/index.html">Hindi Tools</a>
            <a href="${root}index.html#visuals">Visual Effects</a>
        </div>
    </header>`;
}

/**
 * Injects the categorized Sidebar
 */
function injectSidebar(root, category) {
    const sidebarContainer = document.getElementById('enigma-sidebar');
    if (!sidebarContainer) return;

    if (!category || !TOOL_REGISTRY[category]) {
        sidebarContainer.style.display = 'none';
        return;
    }

    // Hindi toolkit uses a different directory name
    const categoryDir = category === 'hindi-toolkit'
        ? 'Hindi Unicode Converter Toolkit'
        : category;

    const currentPath = decodeURIComponent(window.location.pathname);
    const categoryLabel = category === 'hindi-toolkit' ? 'Hindi Toolkit' : (category.charAt(0).toUpperCase() + category.slice(1));
    let html = `<h3>${categoryLabel}</h3><ul>`;
    
    TOOL_REGISTRY[category].forEach(tool => {
        const linkPath = `${root}projects/${categoryDir}/${tool.path}`;
        const isActive = currentPath.includes(tool.path.split('/')[0]);
        html += `<li><a href="${linkPath}" class="${isActive ? 'active' : ''}">${tool.name}</a></li>`;
    });
    
    html += `</ul>`;
    sidebarContainer.innerHTML = html;
    sidebarContainer.style.display = 'block';
}

/**
 * Injects the Shared Footer
 */
function injectFooter(root) {
    const footerContainer = document.getElementById('enigma-footer');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer>
        <div class="footer-top">
            <a href="#" id="back-to-top">Back to top</a>
        </div>
        <div class="footer-middle">
            <div class="footer-col">
                <h3>Get to Know Us</h3>
                <ul>
                    <li><a href="#">About IntoEnigma</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Explore Tools</h3>
                <ul>
                    <li><a href="${root}projects/utilities/index.html">Utilities</a></li>
                    <li><a href="${root}projects/converters/index.html">Converters</a></li>
                    <li><a href="${root}projects/games/index.html">Games</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Let Us Help You</h3>
                <ul>
                    <li><a href="#">Your Account</a></li>
                    <li><a href="#">Report an Issue</a></li>
                    <li><a href="#">Help & Support</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 IntoEnigma Web Toolkit.</p>
        </div>
    </footer>`;
}

/**
 * Injects Breadcrumbs specifically for tool pages
 */
function injectBreadcrumbs(root, depth) {
    const breadcrumbContainer = document.getElementById('enigma-breadcrumbs');
    if (!breadcrumbContainer || depth === 0) return;

    const pageTitle = document.title.split('|')[0].trim();
    const path = window.location.pathname;

    let breadcrumbHTML = `<a href="${root}index.html">Home</a>`;
    
    const decodedPath = decodeURIComponent(path);
    if (decodedPath.includes('/calculators/')) {
        breadcrumbHTML += ` / <a href="${root}projects/calculators/index.html">Calculators</a>`;
    } else if (decodedPath.includes('/games/')) {
        breadcrumbHTML += ` / <a href="${root}projects/games/index.html">Games</a>`;
    } else if (decodedPath.includes('/utilities/')) {
        breadcrumbHTML += ` / <a href="${root}projects/utilities/index.html">Utilities</a>`;
    } else if (decodedPath.includes('/quizzes/')) {
        breadcrumbHTML += ` / <a href="${root}projects/quizzes/index.html">Quizzes</a>`;
    } else if (decodedPath.includes('Hindi Unicode Converter Toolkit')) {
        breadcrumbHTML += ` / <a href="${root}projects/Hindi Unicode Converter Toolkit/index.html">Hindi Toolkit</a>`;
    } else if (decodedPath.includes('/generators/')) {
        breadcrumbHTML += ` / <a href="${root}projects/generators/index.html">Generators</a>`;
    }
    
    // Only add separator if not the hub page itself
    if (!path.endsWith('/index.html') || path.split('/').length > 5) {
        breadcrumbHTML += ` / <span>${pageTitle}</span>`;
    }

    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

/**
 * Scroll to top functionality
 */
function initScrollToTop() {
    const btn = document.getElementById('back-to-top');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Search logic
 */
function initSearch(root) {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');

    function execute() {
        const query = input.value.trim();
        if (query) {
            window.location.href = `${root}index.html?q=${encodeURIComponent(query)}`;
        }
    }

    if (btn) btn.addEventListener('click', execute);
    if (input) {
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') execute();
        });
    }
}
