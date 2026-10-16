import zipfile
import xml.etree.ElementTree as ET
import os

files_to_extract = [
    (r"D:\matka king\Sadhna_Circle_V2_Execution_and_Network_Compounding_System.docx", r"d:\Sadhna Circle\Sadhna_Circle_V2.md"),
    (r"D:\matka king\Anonymous_Builder_Network_Execution_System.docx", r"d:\Sadhna Circle\Anonymous_Builder_Network.md"),
    (r"D:\matka king\1111.docx", r"d:\Sadhna Circle\1111.md")
]

for src, dst in files_to_extract:
    if os.path.exists(src):
        with zipfile.ZipFile(src) as z:
            xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        lines = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            p_text = ''.join(texts).strip()
            if p_text:
                lines.append(p_text)
        with open(dst, 'w', encoding='utf-8') as f:
            f.write('\n\n'.join(lines))
        print(f"Extracted {len(lines)} lines from {os.path.basename(src)} -> {dst}")
    else:
        print(f"File not found: {src}")
