import { useState } from "react";
import {
  BookOpen,
  Building2,
  Dna,
  GraduationCap,
  Microscope,
  Pill,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useDashboard } from "../../../context/DashboardContext";
import { LITERATURE_CARDS } from "../../../constants";
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
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white">
                <BookOpen className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                AI Clinic · Research
              </span>
            </div>
            <h1 className="text-lg font-bold text-white sm:text-xl">
              Sources & domain insights
            </h1>
            <p className="mt-1 text-[12px] text-white/75">
              Supervisor: Dr. Anuradha Kar · Key takeaways and references from the compliance dataset
            </p>
          </div>
          <div className="literature-stat-pill">
            <GraduationCap className="h-3.5 w-3.5 text-white/80" />
            <div>
              <p className="text-sm font-bold text-white">{references.length}</p>
              <p className="text-[9px] uppercase tracking-wide text-white/60">References</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
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
          <VisualTile title="References" subtitle={`${filteredRefs.length} sources`} accent="gold">
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
            <div className="max-h-[calc(100vh-280px)] space-y-2 overflow-y-auto pr-1">
              {filteredRefs.length ? (
                filteredRefs.map((item) => <RefCard key={item.title} reference={item} />)
              ) : (
                <p className="py-4 text-center text-[11px] text-[#8a929e]">
                  No references match your search.
                </p>
              )}
            </div>
          </VisualTile>
        </div>
      </div>
    </div>
  );
}
