with open('src/app/archive/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace light mode colors with dark mode colors
content = content.replace('bg-[#F4F0EA]', 'bg-transparent')
content = content.replace('text-[#0C0F12]', 'text-[#F9F9F7]')
content = content.replace('text-[#0C0F12]/40', 'text-white/40')
content = content.replace('text-[#0C0F12]/70', 'text-white/60')
content = content.replace('text-[#0C0F12]/60', 'text-white/60')
content = content.replace('border-[#0C0F12]/20', 'border-white/20')
content = content.replace('mix-blend-difference text-white', 'text-[#F9F9F7]') # No need for blend difference on dark bg
content = content.replace('hover:text-[#0C0F12]', 'hover:text-[#0C0F12]') # keep hover text dark on gold bg

with open('src/app/archive/page.js', 'w', encoding='utf-8') as f:
    f.write(content)