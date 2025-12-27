const commands = [
    { cmd: "git init", desc: "Initialize a new git repository" },
    { cmd: "git clone [url]", desc: "Clone a repository into a new directory" },
    { cmd: "git status", desc: "Show information about the git repo status" },
    { cmd: "git add [file]", desc: "Add a file to the staging area" },
    { cmd: "git add .", desc: "Add all files to the staging area" },
    { cmd: "git commit -m '[message]'", desc: "Record changes to the repository" },
    { cmd: "git push origin [branch]", desc: "Push changes to remote repository" },
    { cmd: "git pull", desc: "Fetch from and merge with another repository or a local branch" },
    { cmd: "git branch", desc: "List, create, or delete branches" },
    { cmd: "git checkout [branch]", desc: "Switch branches or restore working tree files" },
    { cmd: "git merge [branch]", desc: "Join two or more development histories together" },
    { cmd: "git log", desc: "Show commit logs" },
    { cmd: "git diff", desc: "Show changes between commits, commit and working tree, etc" },
    { cmd: "git stash", desc: "Stash the changes in a dirty working directory away" },
    { cmd: "git reset --hard", desc: "Reset current HEAD to the specified state (Dangerous)" }
];

const list = document.getElementById('list');
const search = document.getElementById('search');

function render(filter = '') {
    list.innerHTML = '';
    commands.forEach(c => {
        if(c.cmd.toLowerCase().includes(filter) || c.desc.toLowerCase().includes(filter)) {
            const el = document.createElement('div');
            el.className = 'command-item';
            el.innerHTML = `
                <span class="cmd" onclick="copy('${c.cmd}')">${c.cmd}</span>
                <div class="desc">${c.desc}</div>
                <span class="copyme" onclick="copy('${c.cmd}')">Click to Copy</span>
            `;
            list.appendChild(el);
        }
    });
}

search.addEventListener('input', (e) => render(e.target.value.toLowerCase()));

window.copy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
};

render();
