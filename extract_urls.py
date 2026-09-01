import re
with open(r'C:\Users\sayantan\.gemini\antigravity\brain\0fa170c3-5c0d-45ce-85f2-1bbcf0fbdf66\.system_generated\steps\2676\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

# find all wp-content/uploads image urls
urls = re.findall(r'https://ds-miami\.com/wp-content/uploads/[^\"\'\s]+\.(?:jpg|jpeg|png|webp)', content)
unique_urls = list(set(urls))
for url in unique_urls:
    print(url)