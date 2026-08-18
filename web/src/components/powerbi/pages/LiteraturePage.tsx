import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, Search } from "lucide-react";
import { useDashboard } from "../../../context/DashboardContext";
import { METHOD_SECTIONS, SOURCE_LINKS } from "../../../content/literatureGuide";
import reviewMarkdown from "../../../content/literatureReview.md?raw";
import { VisualTile } from "../VisualTile";

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

const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="literature-h1">{children}</h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="literature-h2">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="literature-h3">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="literature-p">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="literature-ul">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="literature-ol">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="literature-li">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-[#1a2332]">{children}</strong>
  ),
  hr: () => <hr className="literature-hr" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="literature-table-wrap overflow-x-auto">
      <table className="literature-table">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="literature-th">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="literature-td">{children}</td>
  ),
};

export function LiteraturePage() {
  const { references } = useDashboard();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("");

  const filteredRefs = references.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <div className="rounded-md border border-[#dde3ec] bg-white px-5 py-4 shadow-sm">
        <article className="literature-pro literature-report">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
            {reviewMarkdown}
          </ReactMarkdown>
        </article>
      </div>

      <VisualTile
        title="Dashboard methods (scores, pipeline, variables, gaps)"
        subtitle="How charts and classes are calculated"
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

      <VisualTile title="Official source links" subtitle="Websites used for coding and recommendations" accent="gold">
        <div className="grid gap-2 md:grid-cols-2">
          {SOURCE_LINKS.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="literature-ref-card text-[12px] font-semibold text-[#1a2332] hover:text-[#118dff]"
            >
              {s.title}
              <span className="mt-0.5 block font-normal text-[10px] text-[#5c6578]">{s.note}</span>
            </a>
          ))}
        </div>
      </VisualTile>

      <VisualTile title="Key references in the dataset" subtitle={`${filteredRefs.length} sources`} accent="teal">
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
        <div className="grid max-h-[240px] grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
          {filteredRefs.map((item) => {
            const badge =
              REF_TYPE_STYLES[item.type] ?? "bg-slate-100 text-slate-600 border-slate-200";
            return (
              <article key={item.title} className="literature-ref-card">
                <p className="text-[12px] font-semibold text-[#1a2332]">{item.title}</p>
                <p className="mt-1 text-[11px] text-[#5c6578]">
                  {item.author} · {item.year}{" "}
                  <span className={`ml-1 rounded border px-1 py-0.5 text-[9px] font-bold ${badge}`}>
                    {item.type}
                  </span>
                </p>
              </article>
            );
          })}
        </div>
      </VisualTile>
    </div>
  );
}
