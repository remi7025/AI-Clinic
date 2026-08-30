"""Generate dashboard report markdown + copy PDF and figures from AI CLINIC REPORT."""

from __future__ import annotations

import re
import shutil
from pathlib import Path

BASE = Path(__file__).parent
TEX = BASE / "latex" / "AI_CLINIC_REPORT.tex"
GEN = BASE / "latex" / "generated"
FIG = BASE / "latex" / "figures"
PDF_SRC = BASE / "AI CLINIC REPORT.pdf"
WEB_PUBLIC = BASE / "web" / "public"
OUT_MD = BASE / "web" / "src" / "content" / "aiClinicReport.md"


def esc_md(text: str) -> str:
    return text.replace("|", "\\|")


def strip_latex_inline(text: str) -> str:
    text = re.sub(r"\\cite\{[^}]*\}", "", text)
    text = re.sub(r"\\ref\{[^}]*\}", "", text)
    text = re.sub(r"\\label\{[^}]*\}", "", text)
    text = re.sub(r"\\emph\{([^}]*)\}", r"*\1*", text)
    text = re.sub(r"\\textbf\{([^}]*)\}", r"**\1**", text)
    text = re.sub(r"\\texttt\{([^}]*)\}", r"`\1`", text)
    text = re.sub(r"\\SupervisorName", "Dr. Anuradha Kar", text)
    text = re.sub(r"\\ProjectTitle", "AI for Healthcare Compliance and Regulations Across Countries", text)
    text = re.sub(r"\\SubmissionDate", "30/08/2026", text)
    text = text.replace("---", "—")
    text = text.replace("``", '"').replace("''", '"')
    text = re.sub(r"\\&", "&", text)
    text = re.sub(r"\\%", "%", text)
    text = re.sub(r"\\_", "_", text)
    text = re.sub(r"\\textasciitilde\{\}", "~", text)
    text = re.sub(r"~", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def table_from_tabular(lines: list[str]) -> list[str]:
    rows: list[list[str]] = []
    for line in lines:
        if "&" in line and not line.strip().startswith("\\"):
            cells = [strip_latex_inline(c.strip().rstrip("\\")) for c in line.split("&")]
            if cells and not all(c.startswith("\\") for c in cells):
                rows.append(cells)
    if not rows:
        return []
    header = rows[0]
    md = [
        "| " + " | ".join(esc_md(c) for c in header) + " |",
        "| " + " | ".join("---" for _ in header) + " |",
    ]
    for row in rows[1:]:
        if len(row) == len(header):
            md.append("| " + " | ".join(esc_md(c) for c in row) + " |")
    return md


def convert_tex_body(tex: str) -> str:
    lines = tex.splitlines()
    out: list[str] = []
    skip_until_end_document = False
    i = 0
    in_itemize = False
    in_enumerate = False
    enum_label = "1."

    while i < len(lines):
        line = lines[i].strip()

        if line.startswith("\\end{document}"):
            break
        if line.startswith("\\begin{titlepage}") or line.startswith("% ====="):
            if line.startswith("\\begin{titlepage}"):
                i += 1
                while i < len(lines) and not lines[i].strip().startswith("\\end{titlepage}"):
                    i += 1
            i += 1
            continue
        if line.startswith("{\\small") or line == "}":
            i += 1
            continue
        if line.startswith("\\chapter*{List of Tables") or line.startswith("\\chapter*{List of Figures"):
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("\\clearpage") and not lines[i].strip().startswith("\\pagenumbering"):
                i += 1
            continue
        if any(
            line.startswith(x)
            for x in (
                "\\tableofcontents",
                "\\clearpage",
                "\\pagenumbering",
                "\\hypersetup",
                "\\addcontentsline",
                "\\printbibliography",
                "\\makeatletter",
                "\\makeatother",
                "\\@starttoc",
                "\\endinput",
            )
        ):
            i += 1
            continue
        if line.startswith("\\input{generated/"):
            fname = line.split("{")[1].split("}")[0].split("/")[-1]
            gen_path = GEN / fname
            if gen_path.exists():
                out.append(f"\n*See full table in PDF report: {fname}*\n")
            i += 1
            continue
        if line.startswith("\\begin{figure}") or line.startswith("\\begin{table}"):
            block = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("\\end{figure}") and not lines[i].strip().startswith("\\end{table}"):
                block.append(lines[i])
                i += 1
            fig = next((l for l in block if "\\includegraphics" in l), None)
            if fig:
                m = re.search(r"\{figures/([^}]+)\}", fig)
                if m:
                    out.append(f"\n![Figure](./report-figures/{m.group(1)})\n")
            cap = next((l for l in block if "\\caption" in l), None)
            if cap:
                cap_text = re.sub(r"\\caption(\[[^\]]*\])?\{", "", cap).rstrip("}")
                cap_text = re.sub(r"\\textbf\{([^}]*)\}", r"**\1**", cap_text)
                out.append(f"\n*{strip_latex_inline(cap_text)}*\n")
            tbl = table_from_tabular(block)
            if tbl:
                out.extend(tbl)
            i += 1
            continue
        if line.startswith("\\chapter*{Acknowledgements}"):
            out.append("\n## Acknowledgements\n")
            i += 1
            continue
        if line.startswith("\\chapter*{Abstract}"):
            out.append("\n## Abstract\n")
            i += 1
            continue
        if line.startswith("\\chapter{") or line.startswith("\\chapter*{"):
            title = re.sub(r"\\chapter\*?\{([^}]*)\}", r"\1", line)
            out.append(f"\n# {strip_latex_inline(title)}\n")
            i += 1
            continue
        if line.startswith("\\section{") or line.startswith("\\section*{"):
            title = re.sub(r"\\section\*?\{([^}]*)\}", r"\1", line)
            out.append(f"\n## {strip_latex_inline(title)}\n")
            i += 1
            continue
        if line.startswith("\\subsection{") or line.startswith("\\subsection*{"):
            title = re.sub(r"\\subsection\*?\{([^}]*)\}", r"\1", line)
            out.append(f"\n### {strip_latex_inline(title)}\n")
            i += 1
            continue
        if line.startswith("\\paragraph{"):
            title = re.sub(r"\\paragraph\{([^}]*)\}", r"\1", line)
            out.append(f"\n**{strip_latex_inline(title)}** ")
            i += 1
            continue
        if line.startswith("\\begin{itemize}"):
            in_itemize = True
            i += 1
            continue
        if line.startswith("\\end{itemize}"):
            in_itemize = False
            i += 1
            continue
        if line.startswith("\\begin{enumerate}"):
            in_enumerate = True
            enum_label = "1."
            i += 1
            continue
        if line.startswith("\\end{enumerate}"):
            in_enumerate = False
            i += 1
            continue
        if line.startswith("\\item"):
            item = strip_latex_inline(line.replace("\\item", "", 1))
            if in_enumerate:
                out.append(f"\n{enum_label} {item}")
                enum_label = f"{int(enum_label.rstrip('.')) + 1}."
            else:
                out.append(f"\n- {item}")
            i += 1
            continue
        if line.startswith("\\begin{equation}") or line.startswith("\\begin{tabular"):
            block = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("\\end{"):
                block.append(lines[i])
                i += 1
            eq = " ".join(strip_latex_inline(x) for x in block if x.strip())
            if eq:
                out.append(f"\n`{eq}`\n")
            i += 1
            continue
        if not line or line.startswith("%") or line.startswith("\\"):
            i += 1
            continue

        out.append(strip_latex_inline(line))
        i += 1

    # fix duplicate figure lines from bug
    text = "\n".join(out)
    text = re.sub(r"!\[Figure\]\(\)\n", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def main() -> None:
    WEB_PUBLIC.mkdir(parents=True, exist_ok=True)
    (WEB_PUBLIC / "report-figures").mkdir(exist_ok=True)

    if PDF_SRC.exists():
        shutil.copy2(PDF_SRC, WEB_PUBLIC / "AI_CLINIC_REPORT.pdf")

    for png in FIG.glob("*.png"):
        shutil.copy2(png, WEB_PUBLIC / "report-figures" / png.name)

    tex = TEX.read_text(encoding="utf-8")
    # start from acknowledgements
    start = tex.find("\\chapter*{Acknowledgements}")
    body = convert_tex_body(tex[start:])

    header = """# AI CLINIC REPORT

**AI for Healthcare Compliance and Regulations Across Countries**

**Team:** Remi Uttejitha ALLAM · Baptiste Langlois · Tong Li · Darryl Towa  
**Supervisor:** Dr. Anuradha Kar  
**Submission date:** 30/08/2026

---

"""

    OUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUT_MD.write_text(header + body, encoding="utf-8")
    print(f"Wrote {OUT_MD}")
    print(f"Copied PDF and {len(list(FIG.glob('*.png')))} figures to web/public/")


if __name__ == "__main__":
    main()
