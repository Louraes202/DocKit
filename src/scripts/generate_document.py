import json
from docx import Document
from docx.shared import Pt

def generate_document(content, theme):
    doc = Document()

    styles = doc.styles
    title_style = styles['Title']
    subtitle_style = styles['Heading 1']
    body_style = styles['Normal']

    if theme == 'corporate':
        title_font = title_style.font
        title_font.size = Pt(26)
        title_font.bold = True

        subtitle_font = subtitle_style.font
        subtitle_font.size = Pt(20)
        subtitle_font.bold = True

        body_font = body_style.font
        body_font.size = Pt(12)
        body_font.name = 'Arial'

    elif theme == 'academic':
        title_font = title_style.font
        title_font.size = Pt(24)
        title_font.italic = True

        subtitle_font = subtitle_style.font
        subtitle_font.size = Pt(18)
        subtitle_font.italic = True

        body_font = body_style.font
        body_font.size = Pt(11)
        body_font.name = 'Times New Roman'

    doc.add_heading(content['title'], level=0)

    for section in content['sections']:
        doc.add_heading(section['subtitle'], level=1)
        for paragraph in section['paragraphs']:
            doc.add_paragraph(paragraph, style='BodyText')

    document_path = 'output.docx'
    doc.save(document_path)
    return document_path

if __name__ == "__main__":
    with open('content.json', 'r') as f:
        data = json.load(f)
        generate_document(data['content'], data['theme'])
