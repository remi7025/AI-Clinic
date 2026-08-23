/** Jury presentation slides — full project walkthrough for oral defense */

export interface JurySlide {
  id: string;
  section: string;
  title: string;
  bullets: string[];
  /** What to say out loud (speaker notes) */
  say: string;
}

export const JURY_SLIDES: JurySlide[] = [
  {
    id: "title",
    section: "Opening",
    title: "AI for Healthcare Compliance & Regulations Across Countries",
    bullets: [
      "aivancity PGE5 — Artificial Intelligence & Data Science",
      "Team: Remi Uttejitha ALLAM, Baptiste Langlois, Tong Li, Darryl Towa",
      "Supervisor: Dr. Anuradha Kar",
      "Deliverables: literature synthesis · 20-country dataset · interactive dashboard · PFE report",
    ],
    say: "Introduce the team and the three artefacts: literature, scored dataset, and live dashboard. Stress that this is comparative decision support, not legal advice.",
  },
  {
    id: "agenda",
    section: "Opening",
    title: "Agenda (what I will cover)",
    bullets: [
      "1. Problem & objectives",
      "2. Methodology & scoring pipeline",
      "3. Seven compliance themes",
      "4. Maturity classes & gaps",
      "5. Key results by region / country",
      "6. Dashboard demo path",
      "7. Conclusions & recommendations",
      "8. Limitations & Q&A",
    ],
    say: "Keep this short. Tell the jury you will finish with a live click-through of Overview → Comparison → Country Detail.",
  },
  {
    id: "problem",
    section: "Problem",
    title: "Why this project?",
    bullets: [
      "AI SaMD is growing fast (imaging, CDS, genomics, drug discovery).",
      "Rules differ by country: privacy, approval, validation, liability.",
      "Public information is fragmented (laws, guidance, ethics, device lists).",
      "Stakeholders need a structured, comparable view — not 20 separate PDFs.",
    ],
    say: "Frame the pain: developers, policymakers, and researchers cannot easily compare jurisdictions. Our gap is structure + visualisation.",
  },
  {
    id: "objectives",
    section: "Problem",
    title: "Project objectives",
    bullets: [
      "Synthesise literature and policy on AI healthcare regulation (2018–2026).",
      "Define 7 themes and score 20 jurisdictions on a 1–10 scale.",
      "Build a curated JSON dataset with maturity labels and trends.",
      "Ship an interactive dashboard (map, comparison, themes, trends, literature).",
      "Document method and findings in the PFE report.",
    ],
    say: "Emphasise that scores are expert documentary syntheses — no ML model invents scores at runtime.",
  },
  {
    id: "pipeline",
    section: "Method",
    title: "Full pipeline: data → scores → dashboard",
    bullets: [
      "1. Scope 20 jurisdictions across six regions.",
      "2. Collect primary regulators + secondary literature (PubMed, Scopus, IEEE, Scholar, SSRN).",
      "3. Code each country into one common schema.",
      "4. Assign 1–10 theme scores + a qualitative maturity label.",
      "5. Store in compliance_dataset.json.",
      "6. Dashboard derives overall score, gaps, and use-case readiness.",
      "7. Report documents method, figures, and conclusions.",
    ],
    say: "Walk the pipeline slowly — jury often asks this. Repeat: overall = mean of selected themes; maturity is separate from the average.",
  },
  {
    id: "scoring",
    section: "Method",
    title: "Compliance score — how it is calculated",
    bullets: [
      "Each theme: ordinal score 1–10 (1 = almost no rule; 10 = mature & enforceable).",
      "Four evidence criteria: presence · AI/SaMD specificity · enforcement · IMDRF/WHO/GMLP alignment.",
      "Overall score = arithmetic mean of selected theme scores (rounded to 1 decimal).",
      "Not an official government rating — a comparative research indicator.",
    ],
    say: "If asked for the formula: Overall = (1/k) Σ sᵢ. Changing theme filters recalculates the average in the dashboard.",
  },
  {
    id: "themes",
    section: "Method",
    title: "Seven dashboard variables (themes)",
    bullets: [
      "Data Privacy — health-data laws, transfers, DPIAs",
      "Clinical Validation — evidence, evaluation, bias assessment",
      "Approval Process — SaMD pathways, AI guidance, sandboxes",
      "Transparency — explainability & documentation for clinicians",
      "Ethics — fairness, oversight, national ethics frameworks",
      "Post-Market — adverse events, lifecycle / update governance",
      "Liability — product liability & AI accountability interfaces",
    ],
    say: "Spend 20–30 seconds on Approval Process (market access) vs Privacy/Ethics (rights). US often strong on approval; EU on privacy/ethics.",
  },
  {
    id: "maturity",
    section: "Method",
    title: "Maturity classes — definitions (not a score formula)",
    bullets: [
      "Early — little AI-specific healthcare regulation; few approvals (e.g. Nigeria, Kenya).",
      "Emerging — privacy/ethics exist; SaMD pathway still forming (e.g. Saudi Arabia, South Africa).",
      "Developing — device framework + emerging AI guidance (e.g. India, Brazil).",
      "Moderate — working SaMD registration & post-market (e.g. Australia).",
      "Advanced — dedicated AI/ML SaMD or high-risk AI law + lifecycle (US, EU, Japan, Singapore…).",
      "Maturity ≠ overall score transform (China can be Advanced with mid privacy).",
    ],
    say: "Clarify product risk class (FDA I–III) ≠ country maturity class. Maturity is qualitative documentary judgment.",
  },
  {
    id: "gaps-trends",
    section: "Method",
    title: "Gaps & convergence trends — definitions",
    bullets: [
      "Gap = max(country score) − min(country score) on one theme.",
      "Large gap = divergence zone (some detailed rules, others almost none).",
      "Convergence ≠ identical laws — shared principles & similar instruments.",
      "Examples: risk-based SaMD, GDPR-style privacy, GMLP, PCCP/lifecycle, binding AI Act-style rules.",
    ],
    say: "Gaps answer “where is the world most unequal?” Convergence answers “are systems moving toward the same toolkit?”",
  },
  {
    id: "results",
    section: "Results",
    title: "Headline results to remember",
    bullets: [
      "Leaders overall: EU aggregate, Germany, United States (≈7.6+).",
      "Europe leads privacy / ethics / transparency; US leads clinical validation & approval volume.",
      "Asia is mixed: Japan/Singapore/China Advanced; India/Thailand Developing.",
      "Africa: South Africa Emerging; Kenya & Nigeria Early — privacy laws alone are not enough.",
      "Weakest global pillars: post-market surveillance and liability.",
    ],
    say: "Point to Overview map and Theme Analysis on the live dashboard when you say leaders vs laggards.",
  },
  {
    id: "sources",
    section: "Sources",
    title: "Where the information comes from",
    bullets: [
      "Primary: FDA (Action Plan, PCCP), EU AI Act + MDR + GDPR, WHO ethics, IMDRF, GMLP, NIST AI RMF.",
      "Agencies: EMA, MHRA, PMDA, NMPA, TGA, Health Canada + national AI/privacy laws.",
      "Literature: PubMed, Scopus, IEEE Xplore, Google Scholar, SSRN (2018–2026).",
      "Canonical store: data/compliance_dataset.json (version-controlled).",
    ],
    say: "If asked “did you invent scores?” — No: coded from these sources; bibliography in the report.",
  },
  {
    id: "recommendations",
    section: "Close",
    title: "Recommendations — and where they come from",
    bullets: [
      "Expand IMDRF/WHO coordination on AI clinical-evidence methods.",
      "Build capacity in developing countries (technical assistance, mutual recognition).",
      "Operationalise ethics (measurable fairness, monitoring, documentation).",
      "Update liability before harm cases proliferate.",
      "Keep open dashboards/datasets for transparent comparative research.",
      "Treat foundation-model medical products as a dedicated evaluation track.",
      "Source: synthesis of WHO, IMDRF, GMLP, EU AI Act, NIST AI RMF + cited literature — not a Delphi survey.",
    ],
    say: "Be honest: recommendations are synthesised from the same evidence base, not new primary fieldwork.",
  },
  {
    id: "limitations",
    section: "Close",
    title: "Limitations & future work",
    bullets: [
      "Scores are expert syntheses and will drift as laws change.",
      "Device-approval counts are incomplete where agencies do not publish AI tallies.",
      "Sample over-represents Advanced regulators vs the true world map.",
      "Oceania / South America means rest on single countries (Australia, Brazil).",
      "Future: live feeds, Delphi scoring, more Latin America & Africa, foundation-model track.",
    ],
    say: "Showing limitations builds credibility with the jury.",
  },
  {
    id: "demo",
    section: "Close",
    title: "Live demo path (click these tabs)",
    bullets: [
      "Overview — map + overall ranking KPIs",
      "Theme Analysis — averages and gaps",
      "Comparison — peer bars / radar",
      "Trends & Use Cases — convergence trends + readiness",
      "Country Detail — narrative profile for one jurisdiction",
      "Literature — topic-tagged references with Open links",
      "This PPT tab — full jury script",
    ],
    say: "End by opening Overview and filtering one Advanced vs one Early country. Invite questions.",
  },
];
