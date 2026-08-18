# AI Healthcare Compliance & Regulations Dashboard

An interactive dashboard on AI for healthcare compliance and regulations across countries.

**Supervisor:** Dr. Anuradha Kar

**Live dashboard:** [https://remi7025.github.io/AI-Healthcare-Compliance-Dashboard/](https://remi7025.github.io/AI-Healthcare-Compliance-Dashboard/)

## Project Structure

```
AI Clinic/
├── app.py                    # Streamlit dashboard (Python)
├── web/                      # React dashboard (recommended for presentations)
├── requirements.txt          # Python dependencies
├── data/
│   └── compliance_dataset.json   # Structured country-wise compliance data
└── README.md
```

## Deliverables

1. **Country-Wise Compliance Dataset** (`data/compliance_dataset.json`) — Structured dataset covering 20 countries across 6 regions with 7 thematic compliance scores.

2. **Interactive Dashboard** — Two implementations:
   - **React web app** (`web/`) — Modern, presentation-ready UI (recommended)
   - **Streamlit app** (`app.py`) — Python prototype

   Both include 7 tabs:
   - **World Map** — Choropleth map of regulatory maturity and theme scores
   - **Country Comparison** — Side-by-side radar charts, bar charts, and tables
   - **Theme Analysis** — Heatmap, regional averages, and compliance gap analysis
   - **Global Trends** — Timeline, trend cards, and device approval distribution
   - **Country Details** — Deep-dive profiles with expandable regulatory sections
   - **AI Use Cases & Trends** — Derived readiness for radiology, pathology, genomics, drug discovery
   - **Literature** — Key takeaways and dataset references

## Countries Covered

| Region | Countries |
|--------|-----------|
| North America | United States, Canada |
| Europe | European Union, United Kingdom, Germany, Switzerland |
| Asia | China, India, Japan, South Korea, Singapore, Thailand |
| Middle East | Saudi Arabia, UAE, Israel |
| Africa | South Africa, Nigeria, Kenya |
| Oceania | Australia |

## Themes Tracked

1. Data Privacy & Governance
2. Clinical Validation & Safety
3. Regulatory Approval Process
4. Algorithmic Transparency
5. Ethical Considerations
6. Post-Market Surveillance
7. Liability & Accountability

## Setup & Running

### React Dashboard (Power BI style — recommended)

Professional BI-style layout: dark header, left slicers, KPI tiles, and multi-visual pages like Power BI.

```bash
cd web
npm install
npm run dev
```

Open **http://localhost:5173**

The same app is published at **https://remi7025.github.io/AI-Healthcare-Compliance-Dashboard/**.

**Pages:** Overview · Theme Analysis · Comparison · Trends & Use Cases · Country Detail · Literature

```bash
python sync_web_data.py
```

Production build:

```bash
cd web && npm run build && npm run preview
```

### Streamlit Dashboard

#### Prerequisites

- Python 3.9 or higher

#### Installation

```bash
pip install -r requirements.txt
```

#### Running

```bash
streamlit run app.py
```

The dashboard will open in your browser at `http://localhost:8501`.

## Data Sources

- FDA (U.S. Food and Drug Administration)
- European Commission / EU AI Act
- European Medicines Agency (EMA)
- WHO — Ethics & Governance of AI for Health (2021)
- OECD AI Policy Observatory
- National regulatory agency publications (MHRA, NMPA, PMDA, Health Canada, TGA, etc.)
- Peer-reviewed literature (PubMed, Scopus, IEEE Xplore)

## Dashboard Features

- **Filter by region** — Focus on specific geographic areas
- **Filter by maturity level** — Compare countries at similar regulatory stages
- **Filter by theme** — Focus on specific compliance dimensions
- **Interactive visualizations** — Hover, zoom, and click on all charts
- **Downloadable data** — Export tables and charts from the dashboard
