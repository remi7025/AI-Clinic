"""
Generate a PDF containing the official data-source links used by the project.
"""

import re
from pathlib import Path

from fpdf import FPDF


OUTPUT_PATH = Path(__file__).parent / "Data_Source_Links.pdf"


SOURCES: list[tuple[str, str]] = [
    ("FDA AI/ML-Based SaMD Action Plan (2021)", "https://www.fda.gov/media/145022/download"),
    ("FDA (AI in Software as a Medical Device / SaMD)", "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-software-medical-device"),
    ("EU AI Act (Regulation (EU) 2024/1689)", "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra"),
    ("EU Medical Device Regulation (MDR) (Regulation (EU) 2017/745)", "https://eur-lex.europa.eu/eli/reg/2017/745/oj/eng"),
    ("GDPR (Regulation (EU) 2016/679)", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679"),
    ("WHO: Ethics and governance of artificial intelligence for health (2021)", "https://www.who.int/publications/i/item/9789240029200"),
    ("OECD AI Policy Observatory (OECD.AI)", "https://oecd.ai/en/"),
    ("EMA (European Medicines Agency)", "https://ema.europa.eu/"),
    ("PubMed (peer-reviewed literature search)", "https://pubmed.ncbi.nlm.nih.gov/"),
    ("IMDRF SaMD risk categorization framework (2014)", "https://www.imdrf.org/docs/imdrf/final/technical/imdrf-tech-140918-samd-framework-risk-categorization-141013.pdf"),
    (
        "FDA/Health Canada/MHRA: Good Machine Learning Practice (GMLP) (Oct 2021)",
        "https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles",
    ),
    ("NIST AI Risk Management Framework (AI RMF 1.0, Jan 2023)", "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10"),
]


def clean(text: str) -> str:
    """
    fpdf default Helvetica supports latin-1 only.
    Convert common unicode punctuation to plain ASCII.
    """
    replacements = {
        "\u2013": "-",  # en dash
        "\u2014": "-",  # em dash
        "\u2018": "'",  # left single quote
        "\u2019": "'",  # right single quote
        "\u201c": '"',  # left double quote
        "\u201d": '"',  # right double quote
        "\u2026": "...",  # ellipsis
        "\u00a0": " ",  # non-breaking space
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    # Last-resort: keep characters representable in latin-1
    text = text.encode("latin-1", errors="replace").decode("latin-1")
    return text


def wrap_url(url: str) -> str:
    """
    Insert breakable spaces into URLs so fpdf can wrap them.
    fpdf's Helvetica can't break arbitrary long "words".
    """
    url = clean(url)
    # Add spaces after common URL separators.
    # Example: https://example.com/a/b -> https:// example.com/ a/ b
    url = re.sub(r"([:/?&=])", r"\1 ", url)
    # Collapse any accidental double spaces.
    url = re.sub(r"\s{2,}", " ", url).strip()
    return url


def build_pdf(output_path: Path = OUTPUT_PATH) -> Path:
    pdf = FPDF("P", "mm", "A4")
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(27, 58, 92)
    pdf.multi_cell(0, 10, clean("AI Clinic - Data Source Links"))

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(50, 70, 100)
    pdf.ln(2)
    pdf.multi_cell(
        0,
        7,
        clean("This PDF lists the official sources/framework links referenced by the project dataset and literature review."),
    )

    pdf.ln(3)
    pdf.set_draw_color(100, 126, 234)
    pdf.set_line_width(0.4)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(5)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(30, 30, 30)

    for title, url in SOURCES:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 6, clean(title))
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(70, 70, 80)
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 5, wrap_url(url))
        pdf.ln(2)
        pdf.set_draw_color(220, 225, 235)
        pdf.set_line_width(0.2)
        pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
        pdf.ln(3)

    pdf.output(str(output_path))
    return output_path


if __name__ == "__main__":
    out = build_pdf()
    print(f"Saved: {out}")

