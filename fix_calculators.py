import os
import re

calc_dir = r'c:\Users\Lenovo\Documents\Programming\EternalSwamiX\github-repo\intoenigma.github.io\projects\calculators'
pattern = re.compile(r'<!-- Sidebar for tool pages -->.*?</aside>', re.DOTALL)
replacement = '<!-- Sidebar: Managed dynamically by main.js -->\n            <aside class="sidebar" id="enigma-sidebar"></aside>'

count = 0
for root, dirs, files in os.walk(calc_dir):
    for file in files:
        if file == 'index.html':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if '<!-- Sidebar for tool pages -->' in content:
                new_content = pattern.sub(replacement, content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f'Updated {filepath}')

print(f'Total updated: {count}')
