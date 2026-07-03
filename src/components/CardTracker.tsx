import type { TrackedCardState } from "../types";
import TrackedCard from "./TrackedCard";

function CardTracker({ cards, onAddCard, onUpdateCard, onResetCard, onDeleteCard }: { cards: TrackedCardState[]; onAddCard: () => void; onUpdateCard: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) => void; onResetCard: (id: string) => void; onDeleteCard: (id: string) => void }) {
  return (
    <section className="tracker-panel flex min-h-0 flex-1 flex-col px-4 pt-4 md:rounded-[2rem] md:bg-[var(--surface)] md:p-4 md:shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-3"><div><h2 className="text-2xl font-black tracking-normal">Permanent Ledger</h2><p className="text-sm font-semibold text-[var(--text-muted)]">{cards.length ? `${cards.length} permanent${cards.length === 1 ? "" : "s"}` : "Track changing stats"}</p></div><button type="button" onClick={onAddCard} className="tap-button min-h-12 rounded-full bg-[var(--accent)] px-5 text-sm font-black text-[var(--accent-text)] shadow-soft">Add Permanent</button></div>
      <div className="min-h-0 flex-1 overflow-y-auto pb-4 pr-1">{cards.length === 0 ? <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center"><p className="text-lg font-black">No cards yet</p><p className="mt-2 max-w-64 text-sm font-semibold text-[var(--text-muted)]">Add permanents whose stats keep shifting during the game.</p></div> : <div className="space-y-3">{cards.map((card) => <TrackedCard key={card.id} card={card} onUpdate={onUpdateCard} onReset={onResetCard} onDelete={onDeleteCard} />)}</div>}</div>
    </section>
  );
}

export default CardTracker;
