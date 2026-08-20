import { useMemo, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ExternalLink, Search } from "lucide-react";
import { useDashboard } from "../../../context/DashboardContext";
import {
  METHOD_SECTIONS,
  REFERENCE_TOPICS,
  SOURCE_LINKS,
  TOPIC_REFERENCES,
} from "../../../content/literatureGuide";
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
  const [topic, setTopic] = useState<(typeof REFERENCE_TOPICS)[number]>("All");
  const [openId, setOpenId] = useState("");

  const filteredTopicRefs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPIC_REFERENCES.filter((r) => {
      const topicOk = topic === "All" || r.topic === topic;
      if (!topicOk) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.authors.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q) ||
        r.why.toLowerCase().includes(q)
      );
    });
  }, [query, topic]);

  const filteredDatasetRefs = references.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <VisualTile
        title="References (topic-tagged — open live for jury)"
        subtitle={`${filteredTopicRefs.length} sources · filter by theme, then click Open`}
        accent="teal"
      >
        <div className="mb-2 flex flex-wrap gap-1.5">
          {REFERENCE_TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  active
                    ? "border-[#0f6e56] bg-[#0f6e56] text-white"
                    : "border-[#dde3ec] bg-white text-[#3d4656] hover:border-[#0f6e56]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a929e]" />
          <input
            type="search"
            placeholder="Search title, author, topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="literature-search w-full pl-8"
          />
        </div>

        <div className="grid max-h-[420px] grid-cols-1 gap-2 overflow-y-auto pr-1 lg:grid-cols-2">
          {filteredTopicRefs.map((item) => {
            const badge =
              REF_TYPE_STYLES[item.type] ?? "bg-slate-100 text-slate-600 border-slate-200";
            return (
              <article key={item.id} className="literature-ref-card flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded border border-[#c5ddd4] bg-[#eef7f3] px-1.5 py-0.5 text-[9px] font-bold text-[#0f6e56]">
                    {item.topic}
                  </span>
                  <span className={`rounded border px-1 py-0.5 text-[9px] font-bold ${badge}`}>
                    {item.type}
                  </span>
                  <span className="text-[10px] text-[#8a929e]">{item.year}</span>
                </div>
                <p className="text-[12px] font-semibold leading-snug text-[#1a2332]">{item.title}</p>
                <p className="text-[11px] text-[#5c6578]">{item.authors}</p>
                <p className="text-[11px] leading-relaxed text-[#4a5568]">{item.why}</p>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-1 rounded-md bg-[#118dff] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#0b74d6]"
                  >
                    Open source <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="mt-auto text-[10px] italic text-[#8a929e]">
                    Cited in review bibliography (no public URL attached)
                  </span>
                )}
              </article>
            );
          })}
          {filteredTopicRefs.length === 0 && (
            <p className="col-span-full py-6 text-center text-[12px] text-[#5c6578]">
              No references match this filter.
            </p>
          )}
        </div>
      </VisualTile>

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

      <VisualTile
        title="Key references in the dataset"
        subtitle={`${filteredDatasetRefs.length} compact sources from JSON`}
        accent="purple"
      >
        <div className="grid max-h-[200px] grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
          {filteredDatasetRefs.map((item) => {
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
