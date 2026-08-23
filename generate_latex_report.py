"""Build the LaTeX project report (tables + PDF if pdflatex is available)."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).parent
LATEX_DIR = BASE / "latex"
MAIN = LATEX_DIR / "AI_CLINIC_REPORT.tex"
OUTPUT_PDF = BASE / "AI CLINIC REPORT.pdf"


def run(cmd: list[str], cwd: Path) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)


def make_body_grayscale(pdf_path: Path) -> None:
    """Keep page 1 in color; convert all later pages to black and white."""
    import fitz

    src = fitz.open(pdf_path)
    out = fitz.open()
    out.insert_pdf(src, from_page=0, to_page=0)
    mat = fitz.Matrix(2.0, 2.0)
    for i in range(1, src.page_count):
        page = src[i]
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csGRAY, alpha=False)
        rect = page.rect
        new_page = out.new_page(width=rect.width, height=rect.height)
        new_page.insert_image(rect, pixmap=pix)
    tmp = pdf_path.with_name(pdf_path.stem + "_bw_tmp.pdf")
    out.save(tmp, deflate=True, garbage=4)
    out.close()
    src.close()
    tmp.replace(pdf_path)


def main() -> int:
    subprocess.check_call([sys.executable, str(BASE / "generate_latex_tables.py")])
    subprocess.check_call([sys.executable, str(BASE / "generate_latex_figures.py")])

    if not MAIN.exists():
        print(f"Missing {MAIN}")
        return 1

    pdflatex = shutil.which("pdflatex")
    if not pdflatex:
        print("LaTeX tables/figures generated. Install MiKTeX or TeX Live, then run:")
        print(f"  cd \"{LATEX_DIR}\"")
        print("  pdflatex AI_CLINIC_REPORT.tex")
        print("  biber AI_CLINIC_REPORT")
        print("  pdflatex AI_CLINIC_REPORT.tex")
        print("  pdflatex AI_CLINIC_REPORT.tex")
        return 0

    pdflatex_args = [
        pdflatex,
        "-interaction=nonstopmode",
        "--enable-installer",
        "AI_CLINIC_REPORT.tex",
    ]

    for i in range(2):
        result = run(pdflatex_args, LATEX_DIR)
        if result.returncode != 0:
            print(result.stdout[-4000:])
            print(result.stderr[-2000:])
            return result.returncode

    biber = shutil.which("biber")
    if biber:
        run([biber, "AI_CLINIC_REPORT"], LATEX_DIR)
        for _ in range(2):
            run(pdflatex_args, LATEX_DIR)
    else:
        print("biber not found; bibliography may be incomplete.")

    pdf = LATEX_DIR / "AI_CLINIC_REPORT.pdf"
    if pdf.exists():
        shutil.copy2(pdf, OUTPUT_PDF)
        print(f"Report built: {OUTPUT_PDF}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
