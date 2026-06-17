import os
import zipfile
from xml.sax.saxutils import escape

out_path = r'F:\吉胡阿川\01lhjk\事业\AI时代音乐制作系统\我的作词\专业作词工作单_v1.docx'

sections = [
    ('A. 立项信息', ['项目名称：','歌曲暂定名：','创作类型：商业流行 / 民谣叙事 / 影视主题 / 角色歌 / 民族题材 / 品牌定制 / 其他','当前任务：从零起稿 / 改词 / 修词 / 补副歌 / 补桥段 / 定终稿','截止时间：']),
    ('B. 演唱主体', ['谁来唱：','人物身份 / 角色身份：','声线与气质关键词：','演唱状态：诉说 / 克制 / 爆发 / 飘逸 / 叙述 / 庄重 / 野性 / 其他']),
    ('C. 传播与使用场景', ['用在什么场景：','主要听众是谁：','最终希望听众产生什么反应：记住一句 / 被打动 / 想循环 / 代入人物 / 感到燃 / 感到痛 / 其他']),
    ('D. 灵魂定盘', ['谁在说：','对谁说：','说的核心是什么：','这首歌的核心关系是什么：','这首歌最重要的画面是什么：','这首歌最应该被记住的一句是什么：','最终情绪落点是什么：']),
    ('E. 内容边界', ['必须写到的内容：','可以写但不强求的内容：','绝对不能写的内容：','禁止出现的语感：AI腔 / 口号腔 / 作文腔 / 空泛抒情 / 过度网络化 / 其他','是否有指定背景：地域 / 民族 / 人物 / 剧情 / 事件 / 品牌 / 无']),
    ('F. 风格要求', ['总体风格：','语言等级：口语 / 文艺 / 诗性 / 叙事 / 庄重 / 角色化','希望更靠近的审美气质：','明确不要像什么：','这次最重要的风格关键词，限 3-5 个：']),
    ('G. 曲式与段落', ['曲式：ABAB / AABA / A1A2B / 主副主副桥副 / 一段体 / 其他','需要哪些段落：','哪一段是全曲核心：','副歌承担什么任务：打记忆点 / 情绪爆发 / 立主题 / 推剧情 / 其他','Bridge 是否需要：需要 / 不需要','结尾希望怎么收：留白 / 提升 / 回扣 / 戛然而止 / 其他']),
    ('H. 旋律与可唱性', ['是否已有旋律 / DEMO：','如果有，速度与情绪大致如何：','哪一段最难贴旋律：','句长倾向：短句 / 中句 / 长句 / 交替','气口要求：','哪些词必须卡重音：','是否允许破句、拖腔、重复：']),
    ('I. 押韵与句法', ['押韵方式：通押 / 隔句押 / 副歌强押 / 自然轻押','格律要求：557 / 777 / 335 / 自定 / 无','句式要求：整齐 / 半整齐 / 自由','是否允许口语破格：','是否强调副歌重复性：']),
    ('J. 参考与风格基准', ['可参考作品：','参考维度：曲式 / 语言 / 情绪推进 / Hook / 民族气质 / 叙事方式','明确不能照搬的地方：','这次希望延续你自己哪类旧作优势：','最怕这次掉在哪：画面假 / 语言浅 / Hook弱 / 不耐唱 / 风格漂 / AI腔 / 其他']),
    ('K. 本次创作策略输出（此部分由正式开写前定盘）', ['创作定位一句话：','核心 Hook 一句话：','核心意象 1 个：','辅助意象 2-3 个：','主歌一功能：','主歌二功能：','副歌功能：','Bridge 功能：','本次语言控制原则：','本次最大风险点：']),
    ('L. 交付要求', ['本轮先交什么：结构大纲 / 副歌 / 半首 / 全词 / 修订版 / 诊断报告','需要几版：','是否需要附带诊断意见：','是否需要附带修改方向：','本轮最优先解决的问题：'])
]

ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def p(text='', style=None):
    style_xml = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ''
    if text:
        return f'<w:p>{style_xml}<w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
    return f'<w:p>{style_xml}</w:p>'

def spacer_lines(count=2):
    return [p('____________________________________________________________') for _ in range(count)]

body = []
body.append(p('专业作词工作单 v1', 'Title'))
body.append(p('用途：供职业词作人在接单、起稿、修稿前完成正式需求采集与创作定盘。'))
body.append(p(''))
for title, fields in sections:
    body.append(p(title, 'Heading1'))
    for field in fields:
        body.append(p(field))
        body.extend(spacer_lines(2))
        body.append(p(''))
body.append(p('使用规则', 'Heading1'))
body.append(p('填完本工作单后，正式写词前必须先产出：1. 创作定位 2. 结构策略 3. 副歌核心句。以上三项未定，不开写正文。'))
body.append('<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>')

document_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="{ns}" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 wp14">
  <w:body>
    {''.join(body)}
  </w:body>
</w:document>'''

content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''

rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''

doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''

styles = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="{ns}">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:jc w:val="center"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
  </w:style>
</w:styles>'''

core = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>专业作词工作单 v1</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
</cp:coreProperties>'''

app = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
</Properties>'''

os.makedirs(os.path.dirname(out_path), exist_ok=True)
with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml', content_types)
    z.writestr('_rels/.rels', rels)
    z.writestr('word/document.xml', document_xml)
    z.writestr('word/_rels/document.xml.rels', doc_rels)
    z.writestr('word/styles.xml', styles)
    z.writestr('docProps/core.xml', core)
    z.writestr('docProps/app.xml', app)

print(out_path)
