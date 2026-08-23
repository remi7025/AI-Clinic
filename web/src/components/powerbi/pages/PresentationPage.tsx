import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Presentation,
} from "lucide-react";
import { JURY_SLIDES } from "../../../content/juryPresentation";
import { VisualTile } from "../VisualTile";

export function PresentationPage() {
  const [index, setIndex] = useState(0);
  const slide = JURY_SLIDES[index];
  const total = JURY_SLIDES.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => Math.min(total - 1, Math.max(0, i + dir)));
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-3">
      <VisualTile
        title="Jury presentation — full project walkthrough"
        subtitle="Use ← → or spacebar · click a slide on the left · speaking notes under each slide"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-[#5c6578]">
            <Presentation className="h-3.5 w-3.5 text-[#1D2A4D]" />
            <span>
              Slide {index + 1} / {total}
            </span>
            <span className="rounded-full bg-[#eef1f6] px-2 py-0.5 font-semibold text-[#1D2A4D]">
              {slide.section}
            </span>
          </div>
          <a
            href={`${import.meta.env.BASE_URL}AI_Healthcare_Compliance_Presentation.pptx`}
            download
            className="inline-flex items-center gap-1.5 rounded border border-[#1D2A4D]/25 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1D2A4D] hover:bg-[#eef1f6]"
          >
            <Download className="h-3.5 w-3.5" />
            Download PPTX
          </a>
        </div>

        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[220px_1fr]">
          {/* Slide list */}
          <aside className="max-h-[calc(100vh-220px)] overflow-y-auto rounded border border-[#d8dee8] bg-[#f7f8fb]">
            <ul className="divide-y divide-[#e5e9f0]">
              {JURY_SLIDES.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`w-full px-3 py-2.5 text-left transition ${
                      i === index
                        ? "bg-[#1D2A4D] text-white"
                        : "hover:bg-white text-[#1a2332]"
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                      {String(i + 1).padStart(2, "0")} · {s.section}
                    </div>
                    <div className="mt-0.5 text-[11px] font-semibold leading-snug">
                      {s.title}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Active slide */}
          <div className="flex min-h-0 flex-col gap-3">
            <div className="relative overflow-hidden rounded-lg border border-[#1D2A4D]/20 bg-gradient-to-br from-[#1D2A4D] via-[#243458] to-[#1a2744] p-6 text-white shadow-lg">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A045]">
                AI Clinic · Jury deck
              </div>
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                {slide.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {slide.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm leading-relaxed text-white/90"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5A045]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-wide text-amber-800">
                What to say (speaker notes)
              </div>
              <p className="mt-1 text-sm leading-relaxed text-amber-950">
                {slide.say}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                className="inline-flex items-center gap-1 rounded border border-[#d8dee8] bg-white px-3 py-2 text-xs font-semibold text-[#1D2A4D] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="flex flex-wrap justify-center gap-1">
                {JURY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full ${
                      i === index ? "bg-[#1D2A4D]" : "bg-[#c5ccd8]"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index === total - 1}
                className="inline-flex items-center gap-1 rounded border border-[#1D2A4D] bg-[#1D2A4D] px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </VisualTile>
    </div>
  );
}
