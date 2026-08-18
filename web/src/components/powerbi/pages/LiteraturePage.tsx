import { useState } from "react";
import {
  BookOpen,
  Building2,
  ChevronDown,
  Dna,
  ExternalLink,
  GraduationCap,
  Microscope,
  Pill,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useDashboard } from "../../../context/DashboardContext";
import { LITERATURE_CARDS } from "../../../constants";
import {
  DASHBOARD_TAGLINE,
  DASHBOARD_TITLE,
  LITERATURE_SECTIONS,
  METHOD_SECTIONS,
  SOURCE_LINKS,
} from "../../../content/literatureGuide";
import { PBI_COLORS } from "../chartTheme";
import { VisualTile } from "../VisualTile";
import type { KeyReference } from "../../../types";

const TAKEAWAY_ICONS = [Microscope, Dna, Pill, Building2, Users, Sparkles] as const;

const REF_TYPE_STYLES: Record<string, string> = {
  Guideline: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Regulatory Document": "bg-blue-100 text-blue-800 border-blue-200",
  Research: "bg-violet-100 text-violet-800 border-violet-200",
  Policy: "bg-amber-100 text-amber-800 border-amber-200",
  Report: "bg-slate-100 text-slate-700 border-slate-200",
  Legislation: "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Guiding Principles": "bg-cyan-100 text-cyan-800 border-cyan-200",
  Framework: "bg-teal-100 text-teal-800 border-teal-200",
  "Literature Review": "bg-violet-100 text-violet-800 border-violet-200",
};

function RefCard({ reference }: { reference: KeyReference }) {
  const badge = REF_TYPE_STYLES[reference.type] ?? "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <article className="literature-ref-card group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-semibold leading-snug text-[#1a2332] group-hover:text-[#118dff]">
          {reference.title}
        </p>
        <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${badge}`}>
          {reference.type}
        </span>
      </div>
      <p className="mt-1.5 text-[11px] text-[#5c6578]">
        {reference.author}
        <span className="mx-1 text-[#c8ced8]">·</span>
        {reference.year}
      </p>
    </article>
  );
}

export function LiteraturePage() {
  const { references } = useDashboard();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(METHOD_SECTIONS[0].id);

  const filteredRefs = references.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <header className="literature-hero shrink-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Literature review
          </span>
        </div>
        <h1 className="max-w-4xl text-base font-bold leading-snug text-white sm:text-lg">
          {DASHBOARD_TITLE}
        </h1>
        <p className="mt-2 max-w-4xl text-[12px] leading-relaxed text-white/80">
          {DASHBOARD_TAGLINE}. Same evidence base as the Streamlit prototype: FDA, EMA, WHO, OECD,
          IMDRF, national agencies, and peer-reviewed literature (2018–2026).
        </p>
      </header>

      <VisualTile
        title="Methods, scores, variables, gaps, and sources"
        subtitle="How this dashboard was built"
        accent="blue"
      >
        <div className="space-y-1.5">
          {METHOD_SECTIONS.map((section) => {
            const open = openId === section.id;
            return (
              <div key={section.id} className="overflow-hidden rounded-md border border-[#dde3ec]">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? "" : section.id)}
                  className="flex w-full items-center justify-between gap-2 bg-[#f7f9fc] px-3 py-2 text-left"
                >
                  <span className="text-[12px] font-semibold text-[#1a2332]">{section.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#5c6578] transition ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="space-y-2 bg-white px-3 py-2.5">
                    {section.body.map((p) => (
                      <p key={p.slice(0, 48)} className="text-[12px] leading-relaxed text-[#4a5568]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </VisualTile>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-5">
          <VisualTile title="Domain insights" subtitle="Key takeaways by use case" accent="purple">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {LITERATURE_CARDS.map(([title, body], i) => {
                const Icon = TAKEAWAY_ICONS[i % TAKEAWAY_ICONS.length];
                return (
                  <div key={title} className="literature-takeaway-card">
                    <div
                      className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-md text-white"
                      style={{ background: PBI_COLORS[i % PBI_COLORS.length] }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-[11px] font-bold text-[#1a2332]">{title}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[#5c6578]">{body}</p>
                  </div>
                );
              })}
            </div>
          </VisualTile>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <VisualTile title="Official source links" subtitle="Websites used for coding and recommendations" accent="gold">
            <div className="max-h-[280px] space-y-1.5 overflow-y-auto pr-1">
              {SOURCE_LINKS.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="literature-ref-card group flex items-start justify-between gap-2 hover:border-[#118dff50]"
                >
                  <div>
                    <p className="text-[12px] font-semibold text-[#1a2332] group-hover:text-[#118dff]">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#5c6578]">{s.note}</p>
                  </div>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8a929e]" />
                </a>
              ))}
            </div>
          </VisualTile>
        </div>
      </div>

      <VisualTile
        title="Literature review"
        subtitle="Systematic synthesis aligned with the Streamlit review"
        accent="teal"
      >
        <article className="literature-pro max-h-[520px] space-y-4 overflow-y-auto pr-2">
          {LITERATURE_SECTIONS.map((sec) => (
            <section key={sec.heading}>
              <h2 className="literature-h2">{sec.heading}</h2>
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="literature-p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </VisualTile>

      <VisualTile title="Key references in the dataset" subtitle={`${filteredRefs.length} sources`} accent="gold">
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a929e]" />
          <input
            type="search"
            placeholder="Search title, author, type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="literature-search w-full pl-8"
          />
        </div>
        <div className="grid max-h-[280px] grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
          {filteredRefs.length ? (
            filteredRefs.map((item) => <RefCard key={item.title} reference={item} />)
          ) : (
            <p className="py-4 text-center text-[11px] text-[#8a929e]">No references match your search.</p>
          )}
        </div>
        <p className="mt-2 flex items-center gap-1 text-[10px] text-[#8a929e]">
          <GraduationCap className="h-3 w-3" />
          Full bibliographic list (Adamson & Smith 2018 through Wu et al. 2021) is in the review text above.
        </p>
      </VisualTile>
    </div>
  );
}
