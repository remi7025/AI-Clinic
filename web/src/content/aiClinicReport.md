# AI CLINIC REPORT

**AI for Healthcare Compliance and Regulations Across Countries**

**Team:** Remi Uttejitha ALLAM · Baptiste Langlois · Tong Li · Darryl Towa  
**Supervisor:** Dr. Anuradha Kar  
**Submission date:** 30/08/2026

---

## Acknowledgements

We thank our supervisor, Dr. Anuradha Kar, for guidance throughout this AI Clinic project. We also thank aivancity School of AI & Data for Business & Society for the academic setting in which this work was carried out. Primary regulatory texts, international guidance, and peer-reviewed literature cited in this report remain the property of their respective authors and institutions.

## Abstract

Artificial intelligence (AI) is reshaping healthcare through diagnostic imaging, digital pathology, genomic interpretation, drug-discovery support, and clinical decision support. These capabilities create substantial regulatory complexity: software may qualify as Software as a Medical Device (SaMD), process sensitive health data under divergent privacy regimes, and require lifecycle governance when algorithms adapt over time.
This project delivers a research and engineering artefact in three steps:

(i) a structured literature review of AI healthcare compliance across 20 countries in seven regions;

(ii) a curated dataset scoring seven regulatory themes on a 1--10 scale;

(iii) an interactive dashboard for geospatial comparison, theme analysis, global trends, use-case readiness, and literature browsing.
Key findings include convergence toward risk-based SaMD classification and comprehensive data protection modelled on the General Data Protection Regulation (GDPR), persistent disparities in enforcement capacity between advanced and emerging economies, and growing emphasis on post-market surveillance and liability for adaptive AI. The EU AI Act is a watershed in binding AI governance. Clinical adoption in radiology, pathology, genomics, and public-health surveillance amplifies the need for transparent validation, representative datasets, and Total Product Lifecycle oversight.

# Introduction

## Problem statement

The integration of AI into healthcare is one of the most consequential technological shifts of the twenty-first century. AI-based SaMD now assists clinicians in radiology, pathology, ophthalmology, cardiology, and genomics, among other specialties . Major regulators have authorised hundreds of AI/ML-enabled devices, reflecting exponential growth in the field . Unlike traditional medical devices, AI systems can be adaptive, opaque, and dependent on training data that may embed biases—raising regulatory questions that existing frameworks were not designed to address .
Regulatory diversity across countries creates practical and scholarly difficulties for four groups of stakeholders:

- **Developers** seeking international market access and harmonised evidence packages;

- **Researchers** studying comparative AI governance;

- **Policymakers** balancing innovation incentives with safety protections;

- **Clinicians and hospital administrators** evaluating whether AI tools meet local legal and ethical requirements.
Public information on AI healthcare regulation is abundant but fragmented: statutes, guidance, ethics principles, and device-authorisation lists sit in separate institutional silos. There is a need for a structured, comparative analysis that is both scholarly (literature synthesis, explicit scoring method) and usable (an interactive dashboard). Ensuring patient safety, data privacy, algorithmic fairness, and accountability therefore requires jurisdiction-specific compliance strategies and continuous monitoring after deployment. This project addresses that gap by combining a coded 20-country dataset with a visual analytics interface.

### Project objectives

The project aims to:

1. Synthesise peer-reviewed and policy literature on AI healthcare regulation across 20 countries;

2. Define seven thematic dimensions of compliance and score jurisdictional maturity on a 1--10 scale;

3. Build a curated, machine-readable dataset with regional metadata and global trends;

4. Implement an interactive dashboard for exploration, comparison, and literature browsing;

5. Document methodology, architecture, and findings in this report.

### Scope and limitations

The analysis covers 20 countries across North America, Europe, East Asia, South/Southeast Asia, the Middle East, Africa, and Oceania. Theme scores are expert-curated syntheses informed by regulatory documents and literature—they are comparative indicators, not official government ratings. Use-case readiness scores in the dashboard are *derived* from theme weights rather than separate regulatory datasets. This report is an academic and decision-support artefact, not legal advice.

## Literature review

This section synthesises regulatory frameworks, privacy regimes, clinical-evidence expectations, ethics, surveillance, and liability for AI in healthcare, drawing on sources from 2018--2026.

### Regulatory frameworks for AI medical devices

The IMDRF framework (2014) provides foundational categorisation for software that meets the definition of a medical device without being part of hardware . Major jurisdictions have adopted or adapted it:

- **United States:** the FDA regulates AI/ML SaMD via 510(k), De Novo, and PMA pathways, supplemented by the AI/ML SaMD Action Plan ;

- **European Union:** the MDR classifies SaMD by intended purpose and risk; the EU AI Act adds high-risk AI obligations ;

- **Japan:** the PMDA administers the DASH framework for SaMD ;

- **China:** the NMPA issued guiding principles for AI medical-device registration .
A near-universal trend is proportional regulation by potential harm. Higher-risk applications (for example autonomous diagnosis) face stricter pre-market evaluation and post-market obligations . Table summarises representative classification systems.

*Risk-based medical-device classification systems (selected jurisdictions)*

| USA | FDA risk-based | I, II, III |
| --- | --- | --- |
| EU | MDR risk-based | I, IIa, IIb, III |
| China | NMPA three-tier | I, II, III |
| Canada | Health Canada | I, II, III, IV |
| Japan | PMDA / PMD Act | I, II, III, IV |
| Australia | TGA | I, IIa, IIb, III |

**How to read the risk classes.** 
The table lists how selected jurisdictions *label* medical devices (including AI software as a medical device, SaMD) into risk tiers. The class names differ by country, but the principle is the same worldwide: **higher class = higher potential harm if the device fails = stricter approval and post-market oversight**. Classification is based on **intended use** and **patient risk**—not on how "advanced" the algorithm is.
Regulators typically consider: (i) how serious the patient's condition is; (ii) how much the device's output drives diagnosis or treatment; and (iii) what harm could result from a wrong output (minor inconvenience versus serious injury or death).

- **Class I (lowest risk):** low impact if wrong; often general controls only (labelling, quality). Many US Class I devices are exempt from premarket submission; many EU Class I products can be self-declared for CE marking.

- **Class II / EU IIa--IIb (moderate risk):** more clinical evidence and regulatory review than Class I. In the US, Class II often follows a 510(k) or De Novo pathway. The EU splits medium risk into **IIa** (lower--moderate) and **IIb** (moderate--higher, closer to Class III).

- **Class III (highest risk in three-tier systems):** life-sustaining, life-supporting, or high harm if wrong; strongest premarket evidence (e.g.\ FDA PMA, EU Class III with full notified-body review).

- **Class IV (Canada and Japan):** highest tier in four-class systems; comparable role to Class III elsewhere.
For AI/SaMD, illustrative examples are: administrative or low-risk wellness software (Class I or non-device); AI that *flags* findings for clinician review (often Class II / EU IIa); AI that *strongly drives* diagnosis in serious disease (Class II--III / EU IIb--III); autonomous critical treatment decisions (typically Class III / EU III). These classes feed the *approval process* theme in the project dataset; they are product-risk labels, distinct from the jurisdiction-level maturity scores used elsewhere in this report.
AI/ML algorithms can evolve with new data. Regulators therefore move from point-in-time approval toward lifecycle approaches . The FDA Predetermined Change Control Plan (PCCP) allows pre-specified modifications without a new submission for every change . The EU AI Act requires ongoing conformity and risk management. Good Machine Learning Practice (GMLP) principles from the FDA, Health Canada, and the MHRA guide development practice .

### Data privacy and governance

The GDPR (2018) established global benchmarks: lawfulness, purpose limitation, data minimisation, accountability, data-subject rights, and Data Protection Impact Assessments. Article 22 on automated decision-making has significant implications for clinical AI . Comprehensive data-protection laws have since spread to Brazil (LGPD), India (DPDP), China (PIPL), South Africa (POPIA), Nigeria (NDPA), Kenya, Thailand, Gulf states, and Switzerland—with varying GDPR alignment.
The United States relies on HIPAA for Protected Health Information . The EU proposes a European Health Data Space for primary and secondary use. Cross-border genomic and AI validation increasingly depend on lawful transfer mechanisms and representativeness of training data .

### Clinical validation, safety, and transparency

Clinical-evidence requirements for AI SaMD remain contested. Studies of FDA-cleared devices highlight limitations in external validation and subgroup performance . Algorithmic bias in population-health tools demonstrates real-world harm potential .
Transparency debates pit post-hoc explainable AI against interpretable-by-design models . Regulators increasingly expect human-readable documentation, performance monitoring, and clinician-facing intelligibility even when full algorithmic transparency is infeasible.

### Ethics and accountability

WHO ethics guidance emphasises human oversight, transparency, accountability, inclusiveness, and sustainability . Jobin et al.\ mapped hundreds of AI ethics guidelines globally . A persistent "ethics gap" exists between voluntary principles and enforceable practice . Regional perspectives differ: EU rights-based approaches, US innovation-oriented voluntary frameworks, China's state-guided development, African Ubuntu-influenced discourse, and Middle Eastern intersections of Islamic ethics with modernisation.

### Post-market surveillance and liability

Post-market systems include FDA MedWatch, EU MDR serious-incident reporting, and the UK Yellow Card. AI-specific harms (silent degradation, systematic bias) may not fit traditional adverse-event categories . Liability frameworks largely rely on product liability and malpractice law, which may be inadequate for opaque AI . Proposed EU AI-liability instruments would shift causation burdens in some cases.

### Comparative regional synthesis

# Methodology

## Research design

The project follows a mixed documentary and engineering design. First, a structured literature and policy review produced a common coding schema for 20 jurisdictions. Second, each jurisdiction was scored on seven compliance themes. Third, the coded dataset was implemented as an interactive dashboard so that scores, gaps, and narratives can be explored without reading the raw JSON. No machine-learning model generates scores at runtime; all scores are curated from documentary evidence.

## Literature search strategy

A structured review used PubMed, Scopus, IEEE Xplore, Google Scholar, and SSRN, combined with regulatory sources (FDA, EMA, MHRA, NMPA, PMDA, TGA, Health Canada, WHO, OECD, IMDRF) and national AI strategies. Search terms included "AI healthcare regulation," "SaMD compliance," "health data governance," and "algorithmic transparency medicine." Inclusion criteria: publications from 2018--2026 addressing AI regulation, compliance, or ethics in healthcare. Thirty-two peer-reviewed and policy references inform the synthesis in Section .

## Country sample and coding schema

Twenty jurisdictions were selected to cover North America, Europe, Asia, the Middle East, Africa, Oceania, and South America, including both advanced regulators and emerging markets. Each country record uses the same fields: regulatory body, privacy law, AI-specific regulation, medical-device framework, approval process, data governance, clinical validation, transparency, ethics, post-market surveillance, liability, legislations, challenges, and notable developments.

## Theme scoring

Each country is scored on seven regulatory themes on a 1--10 ordinal scale. A score of 1 means little or no documented requirement for that theme; 10 means a mature, enforceable framework with clear guidance and operational practice. Documentary evidence was mapped to scores using four criteria: presence of law or guidance; specificity to health AI / SaMD; enforcement or reporting mechanisms; and alignment with IMDRF / WHO / GMLP.

*Compliance theme definitions*

| Data Privacy | Health-data protection laws, cross-border transfer rules, DPIAs |
| --- | --- |
| Clinical Validation | Evidence standards, clinical evaluation, bias assessment |
| Approval Process | SaMD pathways, AI-specific guidance, regulatory sandboxes |
| Transparency | Explainability expectations, documentation, clinician intelligibility |
| Ethics | National AI ethics frameworks, fairness, human oversight |
| Post-Market | Adverse-event reporting, lifecycle monitoring, update governance |
| Liability | Product liability, malpractice interfaces, AI-specific proposals |
The overall compliance score shown in dashboard KPIs, the world map, and top-performer charts is the arithmetic mean of the theme scores currently selected in the slicers:

`\text{Overall score} = \frac{1}{k}\sum_{i=1}^{k} s_i`

where $s_i$ is the score of selected theme $i$ and $k$ is the number of selected themes, rounded to one decimal place. Changing theme filters recalculates this average immediately.
A *compliance gap* for a theme is $\max(s)-\min(s)$ among countries in the current filter. A large gap means some jurisdictions have strong rules while others have almost none.

## Maturity classification

Maturity is a country-level qualitative class stored in the dataset (`maturity_level`). It is assigned from documentary evidence—AI-specific rules, device pathway, approval volume, and privacy/ethics enforcement—not from a hidden formula on the scores alone. Classes are:

- **Early** — limited AI-specific healthcare regulation, few or no documented AI device approvals, and basic or recently introduced data-protection rules (e.g.\ Nigeria, Kenya);

- **Emerging** — data protection and/or voluntary AI ethics exist, but SaMD / AI-device pathways are still forming (e.g.\ Saudi Arabia, South Africa);

- **Developing** — a medical-device framework is in place and AI guidance is appearing, with moderate institutional capacity (e.g.\ India, Brazil);

- **Moderate** — functioning SaMD registration, international alignment, and a working post-market system (e.g.\ Australia);

- **Advanced** — dedicated AI/ML SaMD pathways or high-risk AI law, substantial device authorisations, and lifecycle governance (e.g.\ United States, EU, United Kingdom, Germany, Japan, Singapore).
Device risk classes (FDA I--III, MDR I--III, etc.) describe the *product*. Maturity classes describe the *jurisdiction's* governance. They are independent constructs.

## Use-case readiness model

Use-case readiness (radiology, pathology, genomics, drug discovery) is a weighted mean of the same theme scores, using weights that reflect which themes matter most for that clinical application. For example, radiology readiness weights clinical validation and post-market surveillance heavily; genomics emphasises data privacy; drug discovery emphasises approval process and transparency. This links regulatory maturity to deployment contexts while keeping the derivation explicit.

## Dashboard implementation

The interactive artefact is a React 18 application (Vite, TypeScript, Tailwind CSS, Recharts, react-simple-maps). It loads `compliance_dataset.json`, applies region / maturity / theme filters, and computes overall averages, gaps, use-case readiness, and charts. Pages cover overview, comparison, theme analysis, trends, country details, and the literature review.
A Streamlit prototype (`app.py`) remains in the repository as a reference implementation. The public deliverable is the web dashboard, deployed to GitHub Pages.
The canonical dataset is version-controlled in `data/compliance_dataset.json`.

*Implementation stack*

| Public dashboard | React 18, Vite, TypeScript, Tailwind CSS |
| --- | --- |
| Charts / map | Recharts, react-simple-maps |
| Reference prototype | Python, Streamlit, Plotly, Pandas |
| Data store | JSON (version-controlled) |
| Hosting | GitHub Pages |

## Pipeline summary

1. Scope 20 jurisdictions across seven regions.

2. Collect primary regulatory texts and secondary literature (2018--2026).

3. Code each country into a common schema.

4. Assign 1--10 theme scores and a maturity label.

5. Derive overall scores, gaps, and use-case readiness in the dashboard.

6. Document findings in this report.

# Results

This chapter presents the comparative findings from the 20-jurisdiction dataset. We first report overall rankings and theme-level patterns with figures, then analyse regional clusters, quantify inter-country gaps, profile every jurisdiction, and finally link the scores to clinical use cases.

## Overall ranking and score matrix

Table ranks all jurisdictions by the arithmetic mean of the seven theme scores. The European Union aggregate, Germany, and the United States occupy the top tier (overall $\geq 7.6$). Kenya and Nigeria sit at the bottom of the sample (overall $\approx 2.7$--$2.9$), illustrating the capacity gap between advanced regulators and early-stage systems.

*See full table in PDF report: overall_rank.tex*

Figure visualises the same ranking as a horizontal bar chart coloured by region. The visual ordering makes three patterns immediate: (i) Europe and North America dominate the upper half; (ii) Asia is heterogeneous, stretching from Japan/Singapore near the top-middle to Thailand/India in the lower-middle; (iii) Africa occupies the lower tail, with South Africa ahead of Kenya and Nigeria.

![Figure](./report-figures/overall_ranking.png)

***Overall country ranking.** Each bar is the mean of the seven theme scores (1--10) for one jurisdiction. Bars are coloured by region. Longer bars mean stronger documented AI healthcare compliance. Read from bottom (highest) to top (lowest): the EU, Germany, and the United States lead; Kenya and Nigeria trail. Use this figure to show the jury the global spread of regulatory maturity at a glance.*

Table provides the full theme-by-theme matrix used by the dashboard. Privacy = Data Privacy; Clin.\ = Clinical Validation; Appr.\ = Approval Process; Trans.\ = Transparency; Eth.\ = Ethics; Post = Post-Market; Liab.\ = Liability; Devices = reported AI device approvals (indicative counts).
{\footnotesize\setlength{\tabcolsep}{2.4pt}

*See full table in PDF report: country_scores.tex*

## Theme-level comparison

Figures and and Table answer two questions: which themes are strongest worldwide on average, and where countries diverge the most. A large gap means a divergence zone—some jurisdictions already have detailed AI rules, while others have almost none. Clinical validation and transparency show particularly wide spreads, which matters for multi-country evidence packages.

![Figure](./report-figures/theme_averages.png)

***Global average score by theme.** For each of the seven compliance themes, the bar shows the mean score across all 20 countries. Higher bars mean that theme is more mature worldwide. Approval process and data privacy tend to lead (device pathways and post-GDPR privacy laws are widespread). Post-market surveillance and liability tend to lag, showing that lifecycle governance and accountability remain the weakest global pillars.*

![Figure](./report-figures/theme_gaps.png)

***Inter-country gaps by theme.** Gap $=$ maximum country score minus minimum country score for that theme. A large gap means strong divergence: some countries have detailed AI rules while others have almost none. Clinical validation and transparency typically show the widest gaps—important for developers who need multi-country evidence packages.*

*See full table in PDF report: theme_leaders.tex*

### How to read the theme leaders and laggards

Table lists, for each theme, the highest-scoring jurisdiction (leader), the lowest-scoring jurisdiction (laggard), and the numeric gap between them. The pattern is consistent and easy to summarise:

- **Europe leads on rights and accountability themes.** The EU (and European peers) top data privacy, transparency, ethics, post-market, and liability. That reflects binding instruments—notably GDPR and the EU AI Act—rather than voluntary ethics checklists alone .

- **The United States leads on market-access themes.** The US tops clinical validation and approval process, driven by FDA SaMD pathways, published authorisation counts, and related clinical evidence practice .

- **Early African jurisdictions dominate the laggard column.** Nigeria (and South Africa on approval process) appear repeatedly at the bottom. Device pathways and AI-specific adverse-event infrastructure are still forming there, so scores stay low even when privacy statutes exist.
In short: advanced regulators pull ahead where either enforceable privacy/ethics law or deep device pathways already exist; the largest gaps appear where those institutions are still early.

## Maturity distribution

Figure shows the frequency of maturity classes. Most jurisdictions in the sample are labelled **Advanced**, reflecting deliberate selection of major regulators alongside emerging markets. The smaller Early / Emerging / Developing groups are analytically important: they define the lower bound against which gaps are measured and they are the primary audience for capacity-building recommendations. Figure summarises mean overall scores by region.

![Figure](./report-figures/maturity_mix.png)

***Maturity-class distribution.** Pie slices show how many of the 20 jurisdictions fall into each qualitative maturity class (Early, Emerging, Developing, Moderate, Advanced). Maturity is assigned from documentary evidence (AI-specific rules, device pathway, approval activity, privacy/ethics enforcement)—not from a hidden formula on the scores alone. The Advanced slice is large because the sample deliberately includes major regulators; Early/Emerging countries define the capacity gap.*

![Figure](./report-figures/regional_overall.png)

***Mean overall compliance score by region.** Each bar is the average of country overall scores inside that region. Europe leads, followed by North America and Oceania; Africa is lowest. Asia sits in the middle because high performers (Japan, Singapore, South Korea, China) are averaged with developing pathways (India, Thailand). Oceania and South America rest on single-country observations (Australia, Brazil) and should not be over-generalised.*

Maturity is not a hidden transform of the overall score. For example, China and Israel are Advanced despite mid-range privacy or liability scores, because they operate dedicated AI/device pathways with non-trivial approval activity. Australia is Moderate despite solid theme averages, reflecting a functioning but less AI-specialised pathway relative to FDA/EU peers.

## Regional comparative analysis

Table and Figures -- summarise regional means. Europe leads on the composite, followed by North America and Oceania; Africa trails substantially. Asia's mean sits in the middle because high performers (Japan, Singapore, South Korea, China) are averaged with developing pathways (India, Thailand).

*See full table in PDF report: regional_means.tex*

![Figure](./report-figures/regional_heatmap.png)

***Regional theme heatmap.** Rows are regions; columns are the seven compliance themes. Cell colour and number show the regional mean score (darker $=$ higher). Read across a row to see a region's strengths/weaknesses; read down a column to see which region leads a theme. Europe is strong across privacy/ethics; North America is strong on clinical validation and approval; Africa shows low values on most AI-specific themes despite privacy progress in some countries.*

### North America

The United States and Canada are both Advanced. The US leads on approval process and clinical validation (FDA pathways plus PCCP) but is weaker on binding transparency and federal ethics law; HIPAA is sectoral rather than GDPR-equivalent . Canada pairs Health Canada device classes with closer GMLP alignment. North America offers high market-access volume with careful multi-state privacy mapping.

### Europe

The EU aggregate, Germany, the United Kingdom, and Switzerland form the densest high-compliance cluster. The EU AI Act adds a binding high-risk layer on MDR SaMD and GDPR, lifting ethics and transparency relative to voluntary NIST-style frameworks . Europe is the reference region for rights-based AI healthcare governance.

### Asia

Asia is the most internally diverse region. Japan and Singapore combine mature agencies with structured AI guidance; South Korea and China show high approval throughput and algorithm-specific rules . India and Thailand remain Developing: medical-device frameworks exist, but AI-specific validation and post-market duties are thinner. Cross-border AI deployment in Asia cannot assume a single evidence package.

### Middle East, Africa, Oceania, and South America

Israel is Advanced (innovation- and device-driven). Saudi Arabia and the UAE are Emerging (strategy-led catch-up). In Africa, South Africa (POPIA, Emerging) outranks Kenya and Nigeria (Early): data-protection progress outpaces AI-device infrastructure. Australia (Moderate) offers a functioning TGA pathway; Brazil (Developing) is privacy-strong (LGPD) relative to clinical-validation scores.

## Peer jurisdiction comparison

Figure compares five representative jurisdictions side by side across all seven themes: the United States and the European Union (Advanced leaders), China (Advanced Asian regulator with high approval activity), India (Developing), and South Africa (Emerging). Figure complements this by showing radar shapes for the five highest overall scorers.

![Figure](./report-figures/peer_comparison.png)

***Peer comparison across seven themes.** Grouped bars compare the United States, European Union, China, India, and South Africa on each compliance theme (score 1--10). Read theme by theme: the US and EU are high on most axes, with the EU typically stronger on privacy/ethics/transparency and the US strong on clinical validation and approval. China is competitive on approval and mid-range on privacy. India and South Africa sit lower, especially on clinical validation, post-market, and liability—illustrating the Advanced vs Developing/Emerging gap in one chart.*

![Figure](./report-figures/radar_top5.png)

***Radar profiles of the top five scorers:**\\ Each coloured polygon is one top jurisdiction across the seven themes (axes from centre 0 to outer rim 10). A wider polygon means stronger scores. Compare shapes: EU/Germany typically extend farthest on privacy and ethics; the United States extends farthest on clinical validation and approval process, with a relative dip on transparency/ethics. This shows that "best country" depends on which theme matters for the product.*

## Pairwise and strategic comparisons

**United States vs.\ European Union:** 
Both are Advanced. The US offers speed and volume through established SaMD pathways and PCCP for adaptive algorithms . The EU offers stricter enforceable transparency, ethics, and privacy duties under GDPR + AI Act + MDR. A dual-track strategy (US clinical evidence + EU conformity/quality system) remains common for global SaMD vendors .

**China vs.\ Japan:** 
Both are Advanced Asian regulators with distinct emphases: China emphasises registration guidance and domestic algorithm filing practices; Japan emphasises PMDA DASH evaluation and quality-system discipline. Privacy scores are similar; liability remains a shared soft spot relative to Europe.

**Singapore vs.\ India:** 
Singapore's Advanced governance (clear guidance, sandbox culture, strong ethics/transparency relative to region) contrasts with India's Developing trajectory (large digital-health ambition, DPDP privacy progress, thinner AI-device clinical pathway). For ASEAN-oriented products, Singapore is often the regional reference; India is a scale market requiring staged compliance investment.

**Israel vs.\ Gulf states:** 
Israel's Advanced profile is innovation- and device-driven. Saudi Arabia and the UAE are investment- and strategy-driven Emerging systems: scores are mid-low today, but national AI agendas imply rapid movement if pathways and surveillance infrastructure catch up.

**South Africa vs.\ Kenya / Nigeria:** 
Within Africa, South Africa's POPIA-era privacy and relatively stronger institutions produce a clearer Emerging profile. Kenya and Nigeria remain Early on clinical validation, transparency, and post-market themes despite recent data-protection statutes—illustrating that privacy law alone does not raise overall healthcare-AI compliance.

## Country-by-country profiles

The following profiles, ordered by overall score, summarise each jurisdiction. Each country is presented with highlighted headings and stacked fields for quick reading. They mirror the dashboard Country Details page and should be read with Tables and .

*See full table in PDF report: country_profiles.tex*

## Global trends

Table records structured trend objects with adoption level, emergence year, and narrative description. Convergence does not mean identical laws; it means shared principles and similar instruments (risk-based SaMD classification, GDPR-style protection, GMLP, lifecycle / PCCP thinking, and a shift from voluntary ethics toward binding rules such as the EU AI Act).

*See full table in PDF report: global_trends.tex*

## Clinical use cases and milestones

Use-case readiness in the dashboard is a weighted mean of theme scores (radiology weights clinical validation and post-market; genomics weights privacy). Imaging Software as a Medical Device (SaMD) therefore maps naturally to United States (US)/European Union (EU) clinical-validation strength; genomics maps to General Data Protection Regulation (GDPR)-aligned privacy. Hospital Clinical Decision Support (CDS) emphasises Total Product Lifecycle (TPLC) thinking ; public-health Artificial Intelligence (AI) requires accountability beyond individual patients ; foundation models still lack settled SaMD templates.
Key milestones shaping the score patterns include the European Union Artificial Intelligence Act (EU AI Act, 2024), Food and Drug Administration (FDA) AI/Machine Learning (ML) SaMD Action Plan (2021) and Predetermined Change Control Plan (PCCP) guidance (2023), World Health Organization (WHO) ethics guidance (2021), Good Machine Learning Practice (GMLP, 2021), and national data-protection waves: Personal Information Protection Law (PIPL), Digital Personal Data Protection Act (DPDP), Protection of Personal Information Act (POPIA), Nigeria Data Protection Act (NDPA), and Lei Geral de Prote\c{c}\ {a}o de Dados (LGPD).

# Conclusions

## Conclusions

The global regulatory landscape for AI in healthcare is characterised by rapid evolution, converging principles, and persistent diversity. The comparative results in Chapter support five condensed claims:

1. **Risk-based SaMD pathways and data-protection laws are the most mature themes globally**, which is why approval process and privacy lead the theme averages.

2. **Europe and North America dominate the overall ranking**, with the EU/Germany strongest on enforceable ethics and transparency, and the United States strongest on clinical validation and device volume.

3. **Asia is internally heterogeneous**: Japan, Singapore, South Korea, and China are Advanced, while India and Thailand remain Developing—so regional averages hide strategy-critical differences.

4. **Lifecycle governance lags**: post-market surveillance and liability show lower averages and large gaps, especially between Advanced and Early jurisdictions.

5. **Peer gaps are theme-specific**: the US--EU--China--India--South Africa comparison shows Advanced leaders dominate most themes, while Developing/Emerging peers lag most on clinical validation, post-market, and liability.
Lifecycle governance—post-market surveillance, predetermined change control, and liability for adaptive algorithms—is the least mature cluster of themes and the most important frontier as clinical AI moves from static models to continuously updated systems .
This project contributes (i) a coded 20-country, seven-theme dataset; (ii) an explicit scoring and maturity method with documented gap and readiness formulae; (iii) comparative figures and country profiles; (iv) an interactive dashboard for exploration; and (v) this report linking problem, literature, method, and results.

## Future use

The AI Clinic artefacts are designed for ongoing practical use beyond this submission:

**For developers and product teams:** 
Use the theme radar and pairwise comparisons to choose first markets by product risk: imaging SaMD may prioritise US/EU clinical-validation strength; genomics products may prioritise GDPR-aligned privacy; adaptive algorithms need PCCP-like change control. The dashboard filters help test market-entry scenarios before committing to a regulatory strategy.

**For policymakers and regulators:** 
Gaps on clinical validation and post-market themes identify where guidance and inspectorate capacity yield the largest safety return. Emerging jurisdictions can leapfrog by adopting IMDRF/GMLP templates rather than inventing bespoke scorecards. The open dataset supports evidence-based reform tracking over time.

**For researchers, educators, and students:** 
The version-controlled JSON schema and dashboard make comparative AI governance reproducible and teachable. Country profiles and literature references provide a structured starting point for seminars, policy briefs, and follow-on studies.

**Future development of the platform:** 
Planned extensions include live regulatory feeds, formal expert Delphi scoring, expanded country coverage (especially Latin America and additional African regulators), dedicated evaluation tracks for foundation-model medical products, and tighter integration between literature citations and dashboard country pages. Together, these steps would turn the current snapshot into a living comparative intelligence tool for global healthcare AI compliance.

## Recommendations

1. Expand IMDRF/WHO coordination for AI-specific clinical-evidence methods;

2. Build regulatory capacity in developing countries via technical assistance and mutual-recognition pilots;

3. Operationalise ethics through measurable fairness, monitoring, and documentation standards;

4. Update liability frameworks before harm cases proliferate;

5. Maintain public dashboards and open datasets for transparent comparative governance research;

6. Treat foundation-model medical products as a dedicated evaluation track rather than forcing them into static SaMD templates alone.
These recommendations synthesise WHO, IMDRF, FDA/Health Canada/MHRA GMLP, the EU AI Act, NIST AI RMF, and the peer-reviewed literature cited in this report ; they are not the output of a new Delphi survey.

## Limitations

Scores are expert syntheses, not official ratings, and will drift as laws change. Device-approval counts are incomplete where agencies do not publish AI-specific tallies. The sample over-represents Advanced jurisdictions relative to the true global distribution of countries. Regional means for Oceania and South America rest on single-country observations (Australia, Brazil) and should not be over-generalised. This report is academic decision support—not legal advice for market authorisation.
Success in governing AI healthcare will depend on balancing innovation with safety, strengthening international harmonisation, and ensuring frameworks adapt to foundation models, continuous learning, and equitable access across regions.

# Data sources

Primary regulatory and policy sources used in dataset curation include the FDA AI/ML SaMD Action Plan and PCCP guidance; EU AI Act, MDR, and GDPR texts; WHO *Ethics and Governance of AI for Health*; OECD.AI Policy Observatory; IMDRF SaMD framework; GMLP guiding principles; NIST AI Risk Management Framework; and EMA, MHRA, PMDA, NMPA, and national AI strategy documents.