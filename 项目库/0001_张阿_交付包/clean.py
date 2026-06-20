import re

html_path = r'f:\吉胡阿川\01lhjk\事业\AXS MUSIC STUDIO\项目库\0001_张阿_交付包\[AXS-0001]张阿_高阶视听交互总成.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove base64 PNG (the fire totem) and JPEG (the boss watermark)
content = re.sub(r'data:image/png;base64,[^\'"\)]+', 'none', content)
content = re.sub(r'data:image/jpeg;base64,[^\'"\)]+', 'none', content)

# Also remove references to local images just in case
content = content.replace("url('./ethnic_fire_totem.png')", 'none')
content = content.replace("url('./boss.jpg')", 'none')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Cleaned up images!')
