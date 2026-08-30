import { useMemo, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, FileText } from "lucide-react";
import reportMarkdown from "../../../content/aiClinicReport.md?raw";
import { VisualTile } from "../VisualTile";

const PDF_URL = `${import.meta.env.BASE_URL}AI_CLINIC_REPORT.pdf`;

const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="literature-h1 scroll-mt-4" id={String(children).toLowerCase().replace(/\s+/g, "-")}>
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="literature-h2 scroll-mt-4">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="literature-h3 scroll-mt-4">{children}</h3>
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
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-4 border-[#C5A045] bg-[#f7f8fb] px-4 py-2 text-[13px] text-[#4a5568]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="literature-hr" />,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img
      src={src?.startsWith("./") ? `${import.meta.env.BASE_URL}${src.slice(2)}` : src}
      alt={alt ?? "Report figure"}
      className="my-3 max-h-[420px] w-full rounded border border-[#dde3ec] object-contain"
    />
  ),
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

const SECTION_LINKS = [
  "Acknowledgements",
  "Abstract",
  "Introduction",
  "Methodology",
  "Results",
  "Conclusions",
  "Future use",
  "Recommendations",
  "Data sources",
];

export function LiteraturePage() {
  const headings = useMemo(() => SECTION_LINKS, []);

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <VisualTile
        title="AI CLINIC REPORT"
        subtitle="Full project report — same content as AI CLINIC REPORT.pdf"
        accent="blue"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <a
            href={PDF_URL}
            download
            className="inline-flex items-center gap-1.5 rounded-md bg-[#1D2A4D] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#243458]"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#1D2A4D] px-3 py-1.5 text-[12px] font-semibold text-[#1D2A4D] hover:bg-[#eef1f6]"
          >
            <FileText className="h-3.5 w-3.5" />
            Open PDF in new tab
          </a>
        </div>

        <div className="overflow-hidden rounded-md border border-[#dde3ec] bg-[#525659]">
          <iframe
            title="AI CLINIC REPORT PDF"
            src={PDF_URL}
            className="h-[min(72vh,820px)] w-full bg-white"
          />
        </div>
      </VisualTile>

      <div className="grid gap-3 lg:grid-cols-[200px_1fr]">
        <aside className="hidden shrink-0 rounded-md border border-[#dde3ec] bg-white p-3 lg:block">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#5c6578]">
            Jump to section
          </p>
          <nav className="flex flex-col gap-1">
            {headings.map((h) => (
              <a
                key={h}
                href={`#${h.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded px-2 py-1 text-[11px] font-medium text-[#1D2A4D] hover:bg-[#eef1f6]"
              >
                {h}
              </a>
            ))}
          </nav>
        </aside>

        <div className="rounded-md border border-[#dde3ec] bg-white px-5 py-4 shadow-sm">
          <article className="literature-pro literature-report">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
              {reportMarkdown}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
