import re
import json

with open('src/app/archive/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array
match = re.search(r'const archiveData = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Could not find archiveData")
    exit(1)

data_str = match.group(1)
archive_data = json.loads(data_str)

clean_data = []
for item in archive_data:
    url = item['url'].lower()
    
    # 1. Remove anything uploaded with 'chatgpt' or 'stock'
    if 'chatgpt' in url or 'stock' in url:
        continue
        
    title = item['title']
    
    # 2. Clean up garbage strings from filenames
    words_to_remove = ['OPTIMIZED', 'REDUCED', 'HIGHRES', 'SCALED', 'CLEAN', 'COPY', 'HERO', 'LEFT', 'RIGHT', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '15', '19', '21', '27']
    for w in words_to_remove:
        title = re.sub(rf'\b{w}\b', '', title, flags=re.IGNORECASE)
    
    # Replace common weird patterns
    title = title.replace('IMAGEM', 'RESIDENCE')
    title = title.replace('MIB', 'MIAMI ESTATE')
    title = title.replace('HI RES', '')
    title = title.replace('-', ' ').replace('_', ' ')
    
    # Clean up multiple spaces
    title = re.sub(r'\s+', ' ', title).strip()
    
    # 3. If title is too short or generic after cleaning, give it a luxury name
    if len(title) < 5 or title.lower() in ['living', 'interior', 'house', 'apartment', 'scene']:
        title = "BESPOKE COASTAL RESIDENCE"
        
    item['title'] = title.upper()
    clean_data.append(item)

# Re-serialize
new_data_str = json.dumps(clean_data, indent=2)
content = content[:match.start(1)] + new_data_str + content[match.end(1):]

with open('src/app/archive/page.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Cleaned up data. Removed {len(archive_data) - len(clean_data)} bad images.")