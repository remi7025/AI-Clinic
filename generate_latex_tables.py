"""Generate LaTeX table fragments from compliance_dataset.json."""

from __future__ import annotations

import json
from pathlib import Path

BASE = Path(__file__).parent
DATA = BASE / "data" / "compliance_dataset.json"
OUT_DIR = BASE / "latex" / "generated"


def esc(text: str) -> str:
    replacements = {
        "&": r"\&",
        "%": r"\%",
        "#": r"\#",
        "_": r"\_",
        "$": r"\$",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text


def build_country_table(countries: list[dict]) -> str:
    lines = [
        r"\begin{longtable}{@{}l l l c c c c c c c c@{}}",
        r"\caption[Country compliance scores]{Country compliance scores (1--10) across seven themes} \label{tab:country-scores} \\",
        r"\toprule",
        r"\textbf{Country} & \textbf{Region} & \textbf{Maturity} & \textbf{Priv.} & \textbf{Clin.} & \textbf{Appr.} & \textbf{Trans.} & \textbf{Eth.} & \textbf{Post} & \textbf{Liab.} & \textbf{Devices} \\",
        r"\midrule",
        r"\endfirsthead",
        r"\toprule",
        r"\textbf{Country} & \textbf{Region} & \textbf{Maturity} & \textbf{Priv.} & \textbf{Clin.} & \textbf{Appr.} & \textbf{Trans.} & \textbf{Eth.} & \textbf{Post} & \textbf{Liab.} & \textbf{Devices} \\",
        r"\midrule",
        r"\endhead",
        r"\bottomrule",
        r"\endfoot",
    ]
    for c in sorted(countries, key=lambda x: -sum(x["themes_scores"].values())):
        s = c["themes_scores"]
        lines.append(
            " & ".join(
                [
                    esc(c["country"]),
                    esc(c["region"]),
                    esc(c["maturity_level"]),
                    str(s["data_privacy"]),
                    str(s["clinical_validation"]),
                    str(s["approval_process"]),
                    str(s["transparency"]),
                    str(s["ethics"]),
                    str(s["post_market"]),
                    str(s["liability"]),
                    str(c["num_ai_devices_approved"]),
                ]
            )
            + r" \\"
        )
    lines.append(r"\end{longtable}")
    return "\n".join(lines)


def build_trends_table(trends: list[dict]) -> str:
    lines = [
        r"\begin{tcolorbox}[",
        r"  colback=white,",
        r"  colframe=aivanavy,",
        r"  boxrule=0.9pt,",
        r"  arc=1.5pt,",
        r"  left=2pt,",
        r"  right=2pt,",
        r"  top=3pt,",
        r"  bottom=3pt,",
        r"  breakable,",
        r"]",
        r"\footnotesize",
        r"\setlength{\tabcolsep}{5pt}",
        r"\renewcommand{\arraystretch}{1.3}",
        r"\begin{longtable}{|>{\raggedright\arraybackslash}p{0.22\textwidth}|>{\raggedright\arraybackslash}p{0.48\textwidth}|>{\centering\arraybackslash}p{0.12\textwidth}|>{\centering\arraybackslash}p{0.08\textwidth}|}",
        r"\caption[Global trends in AI healthcare regulation]{Global trends in AI healthcare regulation} \label{tab:global-trends} \\",
        r"\hline",
        r"\rowcolor{aivagray}",
        r"\textbf{Trend} & \textbf{Description} & \textbf{Adoption} & \textbf{Since} \\",
        r"\hline",
        r"\endfirsthead",
        r"\hline",
        r"\rowcolor{aivagray}",
        r"\textbf{Trend} & \textbf{Description} & \textbf{Adoption} & \textbf{Since} \\",
        r"\hline",
        r"\endhead",
        r"\hline",
        r"\endfoot",
    ]
    for t in trends:
        lines.append(
            " & ".join(
                [
                    esc(t["trend"]),
                    esc(t["description"]),
                    esc(t["adoption_level"]),
                    str(t["year_emerged"]),
                ]
            )
            + r" \\ \hline"
        )
    lines.append(r"\end{longtable}")
    lines.append(r"\end{tcolorbox}")
    return "\n".join(lines)


def main() -> None:
    raw = json.loads(DATA.read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "country_scores.tex").write_text(
        build_country_table(raw["countries"]), encoding="utf-8"
    )
    (OUT_DIR / "global_trends.tex").write_text(
        build_trends_table(raw["global_trends"]), encoding="utf-8"
    )
    print(f"Wrote LaTeX tables to {OUT_DIR}")


if __name__ == "__main__":
    main()
