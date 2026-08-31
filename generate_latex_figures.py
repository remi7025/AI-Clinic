"""Generate comparison figures for the LaTeX report from compliance_dataset.json."""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

BASE = Path(__file__).parent
DATA = BASE / "data" / "compliance_dataset.json"
FIG_DIR = BASE / "latex" / "figures"

THEMES = [
    ("data_privacy", "Data Privacy"),
    ("clinical_validation", "Clinical Validation"),
    ("approval_process", "Approval Process"),
    ("transparency", "Transparency"),
    ("ethics", "Ethics"),
    ("post_market", "Post-Market"),
    ("liability", "Liability"),
]
NAVY = "#1D2A4D"
GOLD = "#C5A045"
REGION_COLORS = {
    "North America": "#1D2A4D",
    "Europe": "#2E5A88",
    "Asia": "#C5A045",
    "Middle East": "#8B6B2E",
    "Africa": "#5A7A5A",
    "Oceania": "#6B5B95",
    "South America": "#A05A4A",
}


def overall(c: dict) -> float:
    s = c["themes_scores"]
    return sum(s[t] for t, _ in THEMES) / len(THEMES)


def style_axes(ax) -> None:
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.tick_params(colors="#333333")
    ax.set_facecolor("white")


def fig_overall_ranking(countries: list[dict]) -> None:
    ranked = sorted(countries, key=overall)
    names = [c["country"] for c in ranked]
    scores = [overall(c) for c in ranked]
    colors = [REGION_COLORS.get(c["region"], NAVY) for c in ranked]

    fig, ax = plt.subplots(figsize=(9.5, 7.2))
    ax.barh(names, scores, color=colors, height=0.72)
    ax.set_xlabel("Overall compliance score (mean of 7 themes)")
    ax.set_xlim(0, 10)
    ax.set_title("Country ranking by overall AI healthcare compliance score")
    for y, s in enumerate(scores):
        ax.text(s + 0.12, y, f"{s:.1f}", va="center", fontsize=8, color="#333333")
    style_axes(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "overall_ranking.png", dpi=180)
    plt.close(fig)


def fig_theme_averages(countries: list[dict]) -> None:
    means = []
    for key, label in THEMES:
        vals = [c["themes_scores"][key] for c in countries]
        means.append(sum(vals) / len(vals))
    labels = [lab for _, lab in THEMES]
    fig, ax = plt.subplots(figsize=(9.2, 4.8))
    bars = ax.bar(labels, means, color=NAVY, width=0.65)
    ax.bar_label(bars, fmt="%.1f", padding=3, fontsize=9)
    ax.set_ylim(0, 10)
    ax.set_ylabel("Average score (1–10)")
    ax.set_title("Global average score by compliance theme (n = 20)")
    plt.xticks(rotation=25, ha="right")
    style_axes(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "theme_averages.png", dpi=180)
    plt.close(fig)


def fig_regional_heatmap(countries: list[dict]) -> None:
    regions = sorted({c["region"] for c in countries})
    matrix = []
    for region in regions:
        group = [c for c in countries if c["region"] == region]
        row = []
        for key, _ in THEMES:
            vals = [c["themes_scores"][key] for c in group]
            row.append(sum(vals) / len(vals))
        matrix.append(row)
    data = np.array(matrix)
    fig, ax = plt.subplots(figsize=(10, 5.2))
    im = ax.imshow(data, cmap="YlGnBu", vmin=1, vmax=10, aspect="auto")
    ax.set_xticks(range(len(THEMES)))
    ax.set_xticklabels([lab for _, lab in THEMES], rotation=30, ha="right")
    ax.set_yticks(range(len(regions)))
    ax.set_yticklabels(regions)
    ax.set_title("Regional average scores by theme")
    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            ax.text(j, i, f"{data[i, j]:.1f}", ha="center", va="center", fontsize=8)
    fig.colorbar(im, ax=ax, fraction=0.03, pad=0.02, label="Score")
    fig.tight_layout()
    fig.savefig(FIG_DIR / "regional_heatmap.png", dpi=180)
    plt.close(fig)


def fig_maturity_mix(countries: list[dict]) -> None:
    order = ["Early", "Emerging", "Developing", "Moderate", "Advanced"]
    counts = {m: 0 for m in order}
    for c in countries:
        counts[c["maturity_level"]] = counts.get(c["maturity_level"], 0) + 1
    labels = [m for m in order if counts.get(m, 0)]
    sizes = [counts[m] for m in labels]
    colors = ["#A0A0A0", "#C5A045", "#6B8F71", "#2E5A88", "#1D2A4D"][: len(labels)]
    fig, ax = plt.subplots(figsize=(6.5, 5.5))
    wedges, texts, autotexts = ax.pie(
        sizes,
        labels=labels,
        autopct=lambda p: f"{p:.0f}%\n({int(round(p * sum(sizes) / 100))})",
        colors=colors,
        startangle=90,
        textprops={"fontsize": 9},
    )
    for t in autotexts:
        t.set_fontsize(8)
    ax.set_title("Maturity-class distribution (20 jurisdictions)")
    fig.tight_layout()
    fig.savefig(FIG_DIR / "maturity_mix.png", dpi=180)
    plt.close(fig)


def fig_peer_comparison(countries: list[dict]) -> None:
    """Grouped bar chart comparing selected peer jurisdictions across themes."""
    wanted = [
        "United States",
        "European Union",
        "China",
        "India",
        "South Africa",
    ]
    by_name = {c["country"]: c for c in countries}
    peers = [by_name[n] for n in wanted if n in by_name]
    theme_labels = [lab for _, lab in THEMES]
    x = np.arange(len(theme_labels))
    width = 0.15
    palette = ["#1D2A4D", "#2E5A88", "#C5A045", "#8B6B2E", "#5A7A5A"]

    fig, ax = plt.subplots(figsize=(10.2, 5.4))
    for i, c in enumerate(peers):
        vals = [c["themes_scores"][k] for k, _ in THEMES]
        offset = (i - (len(peers) - 1) / 2) * width
        ax.bar(
            x + offset,
            vals,
            width=width * 0.95,
            label=c["country"],
            color=palette[i % len(palette)],
            edgecolor="white",
            linewidth=0.4,
        )
    ax.set_xticks(x)
    ax.set_xticklabels(theme_labels, rotation=22, ha="right")
    ax.set_ylim(0, 10.5)
    ax.set_ylabel("Theme score (1–10)")
    ax.set_title("Peer comparison across seven compliance themes")
    ax.legend(loc="upper right", fontsize=8, frameon=False, ncol=1)
    style_axes(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "peer_comparison.png", dpi=180)
    plt.close(fig)


def fig_theme_gaps(countries: list[dict]) -> None:
    gaps = []
    leaders = []
    laggards = []
    for key, label in THEMES:
        vals = [(c["country"], c["themes_scores"][key]) for c in countries]
        mx = max(vals, key=lambda x: x[1])
        mn = min(vals, key=lambda x: x[1])
        gaps.append(mx[1] - mn[1])
        leaders.append(mx[0])
        laggards.append(mn[0])
    labels = [lab for _, lab in THEMES]
    fig, ax = plt.subplots(figsize=(9.2, 4.8))
    bars = ax.bar(labels, gaps, color=GOLD, width=0.65)
    ax.bar_label(bars, fmt="%d", padding=3, fontsize=9)
    ax.set_ylim(0, 10)
    ax.set_ylabel("Gap = max − min score")
    ax.set_title("Inter-country compliance gaps by theme")
    plt.xticks(rotation=25, ha="right")
    style_axes(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "theme_gaps.png", dpi=180)
    plt.close(fig)
    # also write a small tex helper for leaders/laggards
    lines = [
        r"\begin{table}[htbp]",
        r"\centering",
        r"\caption[Theme leaders and laggards]{Theme leaders and laggards across the 20-country sample}",
        r"\label{tab:theme-leaders}",
        r"\begin{tabular}{@{}l c l l@{}}",
        r"\toprule",
        r"\textbf{Theme} & \textbf{Gap} & \textbf{Leader} & \textbf{Laggard} \\",
        r"\midrule",
    ]
    for (key, label), g, lead, lag in zip(THEMES, gaps, leaders, laggards):
        lines.append(f"{label} & {g} & {lead} & {lag} \\\\")
    lines += [r"\bottomrule", r"\end{tabular}", r"\end{table}", ""]
    (BASE / "latex" / "generated" / "theme_leaders.tex").write_text(
        "\n".join(lines), encoding="utf-8"
    )


def fig_radar_top5(countries: list[dict]) -> None:
    top = sorted(countries, key=overall, reverse=True)[:5]
    angles = np.linspace(0, 2 * np.pi, len(THEMES), endpoint=False).tolist()
    angles += angles[:1]
    fig, ax = plt.subplots(figsize=(7.2, 7.2), subplot_kw=dict(polar=True))
    palette = ["#1D2A4D", "#2E5A88", "#C5A045", "#8B6B2E", "#5A7A5A"]
    for i, c in enumerate(top):
        vals = [c["themes_scores"][k] for k, _ in THEMES]
        vals += vals[:1]
        ax.plot(angles, vals, color=palette[i], linewidth=1.8, label=c["country"])
        ax.fill(angles, vals, color=palette[i], alpha=0.08)
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels([lab for _, lab in THEMES], fontsize=8)
    ax.set_ylim(0, 10)
    ax.set_title("Radar profile — top five overall scorers", pad=18)
    ax.legend(loc="upper right", bbox_to_anchor=(1.28, 1.12), fontsize=8)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "radar_top5.png", dpi=180, bbox_inches="tight")
    plt.close(fig)


def fig_regional_overall(countries: list[dict]) -> None:
    regions = sorted({c["region"] for c in countries})
    means = []
    for region in regions:
        group = [c for c in countries if c["region"] == region]
        means.append(sum(overall(c) for c in group) / len(group))
    fig, ax = plt.subplots(figsize=(8.8, 4.6))
    colors = [REGION_COLORS.get(r, NAVY) for r in regions]
    bars = ax.bar(regions, means, color=colors, width=0.6)
    ax.bar_label(bars, fmt="%.1f", padding=3, fontsize=9)
    ax.set_ylim(0, 10)
    ax.set_ylabel("Mean overall score")
    ax.set_title("Mean overall compliance score by region")
    plt.xticks(rotation=20, ha="right")
    style_axes(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "regional_overall.png", dpi=180)
    plt.close(fig)


def build_regional_table(countries: list[dict]) -> None:
    regions = sorted({c["region"] for c in countries})
    lines = [
        r"\begin{table}[htbp]",
        r"\centering",
        r"\caption[Regional mean scores]{Regional mean scores and sample size}",
        r"\label{tab:regional-means}",
        r"\footnotesize",
        r"\setlength{\tabcolsep}{3.5pt}",
        r"\begin{tabular}{@{}l c c c c c c c c c@{}}",
        r"\toprule",
        r"\textbf{Region} & \textbf{n} & \textbf{Overall} & \textbf{Priv.} & \textbf{Clin.} & \textbf{Appr.} & \textbf{Trans.} & \textbf{Eth.} & \textbf{Post} & \textbf{Liab.} \\",
        r"\midrule",
    ]
    for region in regions:
        group = [c for c in countries if c["region"] == region]
        n = len(group)
        ov = sum(overall(c) for c in group) / n
        cells = [region, str(n), f"{ov:.1f}"]
        for key, _ in THEMES:
            m = sum(c["themes_scores"][key] for c in group) / n
            cells.append(f"{m:.1f}")
        lines.append(" & ".join(cells) + r" \\")
    lines += [r"\bottomrule", r"\end{tabular}", r"\end{table}", ""]
    (BASE / "latex" / "generated" / "regional_means.tex").write_text(
        "\n".join(lines), encoding="utf-8"
    )


def build_ranking_table(countries: list[dict]) -> None:
    ranked = sorted(countries, key=overall, reverse=True)
    lines = [
        r"\begin{longtable}{@{}c l l l c c@{}}",
        r"\caption[Overall ranking of jurisdictions]{Overall ranking of jurisdictions by mean theme score} \label{tab:overall-rank} \\",
        r"\toprule",
        r"\textbf{Rank} & \textbf{Country} & \textbf{Region} & \textbf{Maturity} & \textbf{Overall} & \textbf{Devices} \\",
        r"\midrule",
        r"\endfirsthead",
        r"\toprule",
        r"\textbf{Rank} & \textbf{Country} & \textbf{Region} & \textbf{Maturity} & \textbf{Overall} & \textbf{Devices} \\",
        r"\midrule",
        r"\endhead",
        r"\bottomrule",
        r"\endfoot",
    ]
    for i, c in enumerate(ranked, 1):
        lines.append(
            f"{i} & {c['country']} & {c['region']} & {c['maturity_level']} & "
            f"{overall(c):.1f} & {c['num_ai_devices_approved']} \\\\"
        )
    lines.append(r"\end{longtable}")
    (BASE / "latex" / "generated" / "overall_rank.tex").write_text(
        "\n".join(lines), encoding="utf-8"
    )


def esc(text: object) -> str:
    s = str(text)
    for a, b in [
        ("\\", r"\textbackslash{}"),
        ("&", r"\&"),
        ("%", r"\%"),
        ("#", r"\#"),
        ("_", r"\_"),
        ("$", r"\$"),
        ("~", r"\textasciitilde{}"),
        ("^", r"\textasciicircum{}"),
    ]:
        s = s.replace(a, b)
    return s


def build_country_profiles(countries: list[dict]) -> None:
    """Country profiles with highlighted headings and stacked side labels."""
    ranked = sorted(countries, key=overall, reverse=True)
    parts = [
        r"\begingroup",
        r"\setlength{\parskip}{3pt}",
        r"\renewcommand{\arraystretch}{1.15}",
        "",
    ]
    for i, c in enumerate(ranked):
        s = c["themes_scores"]
        challenge = esc(c["challenges"])
        if len(challenge) > 220:
            challenge = challenge[:217] + "..."
        notable = esc(c["notable_developments"])
        if len(notable) > 220:
            notable = notable[:217] + "..."
        if i > 0:
            parts.append(r"\vspace{0.55em}")
        parts += [
            rf"\noindent{{\color{{aivanavy}}\bfseries {esc(c['country'])}}}\par",
            r"\vspace{0.15em}",
            rf"\noindent\textbf{{Region:}} {esc(c['region'])}\par",
            rf"\noindent\textbf{{Maturity:}} {esc(c['maturity_level'])}\par",
            rf"\noindent\textbf{{Overall score:}} {overall(c):.1f}/10\par",
            rf"\noindent\textbf{{Regulatory body:}} {esc(c['regulatory_body'])}\par",
            rf"\noindent\textbf{{AI devices approved:}} {c['num_ai_devices_approved']}\par",
            rf"\noindent\textbf{{First AI instrument:}} {c['year_first_ai_regulation']}\par",
            rf"\noindent\textbf{{Theme scores:}} "
            rf"Privacy {s['data_privacy']}, Clinical validation {s['clinical_validation']}, "
            rf"Approval {s['approval_process']}, Transparency {s['transparency']}, "
            rf"Ethics {s['ethics']}, Post-market {s['post_market']}, Liability {s['liability']}\par",
            rf"\noindent\textbf{{Privacy:}} {esc(c['data_privacy_law'])}\par",
            rf"\noindent\textbf{{AI regulation:}} {esc(c['ai_specific_regulation'])}\par",
            rf"\noindent\textbf{{Challenges:}} {challenge}\par",
            rf"\noindent\textbf{{Notable developments:}} {notable}\par",
        ]
    parts += [r"\endgroup", ""]
    (BASE / "latex" / "generated" / "country_profiles.tex").write_text(
        "\n".join(parts), encoding="utf-8"
    )


def main() -> None:
    FIG_DIR.mkdir(parents=True, exist_ok=True)
    (BASE / "latex" / "generated").mkdir(parents=True, exist_ok=True)
    raw = json.loads(DATA.read_text(encoding="utf-8"))
    countries = raw["countries"]
    fig_overall_ranking(countries)
    fig_theme_averages(countries)
    fig_regional_heatmap(countries)
    fig_maturity_mix(countries)
    fig_peer_comparison(countries)
    fig_theme_gaps(countries)
    fig_radar_top5(countries)
    fig_regional_overall(countries)
    build_regional_table(countries)
    build_ranking_table(countries)
    build_country_profiles(countries)
    print(f"Wrote figures to {FIG_DIR}")


if __name__ == "__main__":
    main()
