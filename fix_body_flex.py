import os
import re

base_dir = r'c:\Users\Lenovo\Documents\Programming\EternalSwamiX\github-repo\intoenigma.github.io\projects'

# Pattern: match body { ... } rules that contain display: flex at the start of style.css
# We want to remove display:flex, justify-content:center, align-items:center/start, min-height:100vh
# but keep padding if any (we'll handle per-case)

body_flex_pattern = re.compile(
    r'body\s*\{([^}]*display\s*:\s*flex[^}]*)\}',
    re.IGNORECASE
)

def clean_body_rule(match):
    inner = match.group(1)
    # Remove flex-specific properties that break the layout
    props_to_remove = [
        r'display\s*:\s*flex\s*;?\s*',
        r'justify-content\s*:\s*center\s*;?\s*',
        r'align-items\s*:\s*\S+\s*;?\s*',
        r'min-height\s*:\s*100vh\s*;?\s*',
        r'flex-direction\s*:\s*\S+\s*;?\s*',
    ]
    cleaned = inner
    for prop in props_to_remove:
        cleaned = re.sub(prop, '', cleaned, flags=re.IGNORECASE)
    
    # Clean up remaining content
    cleaned = cleaned.strip().strip(';').strip()
    
    if cleaned:
        return f'body {{{cleaned}}}'
    else:
        return ''  # Remove the entire body rule if nothing left

count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file == 'style.css':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'display: flex' in content or 'display:flex' in content:
                new_content = body_flex_pattern.sub(clean_body_rule, content)
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
                    print(f'Fixed: {filepath}')

print(f'\nTotal files fixed: {count}')
