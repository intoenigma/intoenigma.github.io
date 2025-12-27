const postsContainer = document.getElementById('blog-posts');
const viewer = document.getElementById('post-viewer');
const content = document.getElementById('post-content');

const posts = [
    {
        id: 1,
        title: "The Future of AI",
        excerpt: "Exploring how LLMs are changing the coding landscape.",
        md: "# The Future of AI\n\nArtificial Intelligence is **evolving rapidly**. From coding assistants to generative art, the landscape is shifting.\n\n## Key Trends\n- Automation\n- Creativity\n- Data Analysis\n\n`print('Hello World')`"
    },
    {
        id: 2,
        title: "Why Cyberpunk?",
        excerpt: "Designing the neon aesthetic of IntoEnigma.",
        md: "# Why Cyberpunk?\n\nThe **neon** and *glass* aesthetic represents the transparency and energy of modern web development.\n\n> \"High Tech, Low Life? Maybe High Tech, High Style.\"\n\n![Cyber City](https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600)\n\n### Design Pillars\n1. Glow Effects\n2. Dark Mode\n3. Minimalism"
    },
    {
        id: 3,
        title: "JavaScript Tips",
        excerpt: "5 tricks to improve your array manipulation.",
        md: "# JavaScript Tips\n\nHere is how you use `map` and `filter` effectively.\n\n```javascript\nconst nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\n```"
    }
];

function renderGrid() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const el = document.createElement('div');
        el.className = 'post-card';
        el.innerHTML = `<h3>${post.title}</h3><p>${post.excerpt}</p>`;
        el.onclick = () => openPost(post);
        postsContainer.appendChild(el);
    });
}

function openPost(post) {
    content.innerHTML = marked.parse(post.md);
    viewer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

window.closePost = () => {
    viewer.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

renderGrid();
