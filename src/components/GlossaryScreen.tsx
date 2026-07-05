import { useMemo, useState } from "react";
import { GLOSSARY_TERMS } from "../data/glossary";
import GlossaryEntry from "./GlossaryEntry";

function GlossaryScreen() {
  const [query, setQuery] = useState("");
  const [openTerm, setOpenTerm] = useState<string | null>("Flying");

  const filteredTerms = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return GLOSSARY_TERMS;
    }

    return GLOSSARY_TERMS.filter((entry) =>
      [entry.term, entry.category, entry.summary, entry.detail].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  const grouped = useMemo(() => {
    return filteredTerms.reduce<Record<string, typeof filteredTerms>>((groups, entry) => {
      const letter = entry.term[0].toUpperCase();
      groups[letter] = groups[letter] ?? [];
      groups[letter].push(entry);
      return groups;
    }, {});
  }, [filteredTerms]);

  return (
    <section className="screen-shell">
      <div className="glossary-sticky px-4 pb-3 pt-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Rules Tome</p>
        <h1 className="text-3xl font-black">Glossary</h1>
        <label htmlFor="glossary-search" className="sr-only">Search glossary</label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-4 min-h-14 w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] px-4 text-lg font-bold outline-none transition placeholder:text-[var(--text-muted)] focus:ring-4 focus:ring-[var(--focus)]"
          placeholder="Search spells, counters, combat..."
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 md:px-0">
        {Object.keys(grouped).length === 0 ? (
          <div className="rounded-[1.5rem] bg-[var(--surface)] p-6 text-center shadow-soft">
            <p className="text-lg font-black">No matches</p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-muted)]">Try a keyword like combat, token, or commander.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([letter, entries]) => (
            <section key={letter} className="mb-5">
              <h2 className="mb-2 px-1 text-sm font-black text-[var(--text-muted)]">{letter}</h2>
              <div className="space-y-2">
                {entries.map((entry) => (
                  <GlossaryEntry
                    key={entry.term}
                    entry={entry}
                    isOpen={openTerm === entry.term}
                    onToggle={() => setOpenTerm((current) => (current === entry.term ? null : entry.term))}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  );
}

export default GlossaryScreen;
