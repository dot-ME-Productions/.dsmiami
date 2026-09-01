import re
import json

# The extracted URLs from earlier
with open('extract_full_res.py', 'r', encoding='utf-8') as f:
    pass # we'll just run it again and capture output

import subprocess
result = subprocess.run(['python', 'extract_full_res.py'], capture_output=True, text=True)
lines = result.stdout.strip().split('\n')
urls = lines[1:] # skip the 'Found X images' line

shapes = [
  'aspect-square rounded-[30px]',
  'aspect-[16/9] rounded-none',
  'aspect-[4/5] rounded-t-[200px]',
  'aspect-[3/4] rounded-[50%]',
  'aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]',
  'aspect-[16/9] rounded-b-full',
  'aspect-[4/5] rounded-tr-[250px]',
  'aspect-square rounded-tl-[100px]',
  'aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]'
]

archive_data = []
for i, url in enumerate(urls):
    filename = url.split('/')[-1]
    name_clean = filename.split('.')[0].replace('-', ' ').replace('_', ' ').upper()
    
    # Just trim name if too long
    if len(name_clean) > 30:
        name_clean = name_clean[:30] + '...'
        
    shape = shapes[i % len(shapes)]
    
    archive_data.append({
        'url': url,
        'title': name_clean,
        'award': 'DS MIAMI PORTFOLIO ARCHIVE',
        'category': 'Residential',
        'description': 'An exclusive look into the materials, textures, and bespoke architecture defining this interior space.',
        'shapeClass': shape
    })

# Now we need to read the current src/app/archive/page.js and replace the archiveData array
with open('src/app/archive/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We'll use regex to replace the array definition
# Find 'const archiveData = [...];'
import re
new_data_str = "const archiveData = " + json.dumps(archive_data, indent=2) + ";"

content = re.sub(r'const archiveData = \[.*?\];', new_data_str, content, flags=re.DOTALL)

with open('src/app/archive/page.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated archive page with", len(archive_data), "images.")