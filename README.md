# AI Clinic

AI for Healthcare Compliance and Regulations Across Countries — interactive dashboard, comparative dataset, research report, and presentation.

**Supervisor:** Dr. Anuradha Kar  
**Team:** Remi Uttejitha ALLAM, Baptiste Langlois, Tong Li, Darryl Towa  

**Live dashboard:** [https://remi7025.github.io/AI-Healthcare-Compliance-Dashboard/](https://remi7025.github.io/AI-Healthcare-Compliance-Dashboard/)

## What is in this repository

| Item | Path |
|------|------|
| Compliance dataset (19 countries, 7 themes) | `data/compliance_dataset.json` |
| React dashboard (GitHub Pages) | `web/` |
| Streamlit prototype | `app.py` |
| LaTeX report source | `latex/AI_CLINIC_REPORT.tex` |
| Generated PDF report | `AI CLINIC REPORT.pdf` |
| Presentation | `AI_Clinic_Presentation.pptx` |
| Figure/table generators | `generate_latex_*.py`, `generate_ppt.py` |

## Quick start — dashboard

```bash
cd web
npm install
npm run dev
```

## Rebuild report / presentation

```bash
python generate_latex_report.py   # builds AI CLINIC REPORT.pdf
python generate_ppt.py            # builds AI_Clinic_Presentation.pptx
```

## Methodology (short)

1. Collect regulatory and literature sources (2018–2026)  
2. Code 19 jurisdictions into one schema  
3. Score seven themes on a 1–10 scale; assign maturity labels  
4. Dashboard derives overall means, gaps, and use-case readiness  

## License / note

Academic research and decision-support artefact — not legal advice.
