import type { GlossaryTerm } from "../types";

function GlossaryEntry({ entry, isOpen, onToggle }: { entry: GlossaryTerm; isOpen: boolean; onToggle: () => void }) {
  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] shadow-soft">
      <button type="button" onClick={onToggle} className="tap-button flex min-h-16 w-full items-center justify-between gap-3 px-4 py-3 text-left"><span><span className="block text-lg font-black">{entry.term}</span><span className="block text-sm font-semibold text-[var(--text-muted)]">{entry.summary}</span></span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-xl font-black transition ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span></button>
      <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><div className="border-t border-[var(--border)] px-4 pb-4 pt-3"><span className="mb-2 inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-black text-[var(--accent-strong)]">{entry.category}</span><p className="text-base font-semibold leading-relaxed text-[var(--text-secondary)]">{entry.detail}</p></div></div></div>
    </article>
  );
}

export default GlossaryEntry;
