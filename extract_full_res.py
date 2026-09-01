import re

with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all image URLs
urls = re.findall(r'https://ds-miami\.com/wp-content/uploads/[^\"\'\s]+\.(?:jpg|jpeg|png|webp)', content)
unique_urls = list(set(urls))

# Filter out WordPress generated thumbnails (e.g., -300x300 or -150x150)
full_res_urls = []
for url in unique_urls:
    if not re.search(r'-\d+x\d+\.(jpg|jpeg|png|webp)$', url, re.IGNORECASE):
        # also ignore icons, favicon, logos
        if 'icon' not in url.lower() and 'logo' not in url.lower() and 'favicon' not in url.lower():
            full_res_urls.append(url)

print(f"Found {len(full_res_urls)} full-res images")
for url in full_res_urls:
    print(url)