import os
import re
import glob

# Files to patch
files = glob.glob('*.html')
files.remove('counselor.html') # already has it

new_link = """
            <a href="counselor.html" class="nav-item nav-counselor">
                <i class="fas fa-robot"></i> AI Counselor
            </a>"""

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'href="counselor.html"' in content:
        continue # Already patched
        
    # We want to insert it after the career-discovery link closing tag
    # The career-discovery block looks something like:
    # <a href="career-discovery.html" ...>...</a>
    
    # We'll use a regex that matches the entire career-discovery <a> tag.
    # It might span multiple lines.
    pattern = re.compile(r'(<a[^>]*href="career-discovery\.html"[^>]*>.*?</a>)', re.DOTALL | re.IGNORECASE)
    
    match = pattern.search(content)
    if match:
        original = match.group(1)
        patched_content = content[:match.end()] + new_link + content[match.end():]
        with open(file, 'w', encoding='utf-8') as f:
            f.write(patched_content)
        print(f"Patched {file}")
    else:
        print(f"Could not find career-discovery link in {file}")
