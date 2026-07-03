import { useMemo, useState } from "react";
import { GLOSSARY_TERMS } from "../data/glossary";
import GlossaryEntry from "./GlossaryEntry";

function GlossaryScreen() {
  const [query, setQuery] = useState("");
  const [openTerm, setOpenTerm] = useState<string | null>("Flying");
  const terms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? GLOSSARY_TERMS.filter((entry) => [entry.term, entry.category, entry.summary, entry.detail].some((value) => value.toLowerCase().includes(q))) : GLOSSARY_TERMS;
  }, [query]);
  return (
    <section className="screen-shell"><div className="sticky top-0 z-10 bg-[var(--app-bg)] px-4 pb-3 pt-4 md:px-0 md:pt-0"><p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Rules Tome</p><h1 className="text-3xl font-black">Glossary</h1><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-4 min-h-14 w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] px-4 text-lg font-bold outline-none" placeholder="Search spells, counters, combat..." /></div><div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 md:px-0"><div className="space-y-2">{terms.map((entry) => <GlossaryEntry key={entry.term} entry={entry} isOpen={openTerm === entry.term} onToggle={() => setOpenTerm((current) => current === entry.term ? null : entry.term)} />)}</div></div></section>
  );
}

export default GlossaryScreen;
