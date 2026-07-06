import type { TrackedCardState } from "../types";
import TrackedCard from "./TrackedCard";

interface CardTrackerProps {
  cards: TrackedCardState[];
  onAddCard: () => void;
  onUpdateCard: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) => void;
  onResetCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
}

function CardTracker({ cards, onAddCard, onUpdateCard, onResetCard, onDeleteCard }: CardTrackerProps) {
  return (
    <section className="tracker-panel flex min-h-0 flex-1 flex-col px-1 pt-1">
      <div className="tracker-header mb-2 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black tracking-normal">Creature Ledger</h2>
          <p className="text-xs font-semibold text-[var(--text-muted)]">{cards.length ? `${cards.length} creature${cards.length === 1 ? "" : "s"}` : "Track changing stats"}</p>
        </div>
        <button type="button" onClick={onAddCard} className="tap-button min-h-10 rounded-full bg-[var(--land-accent)] px-4 text-xs font-black text-[var(--land-accent-text)] shadow-soft">
          Add
        </button>
      </div>

      <div className="tracker-scroll min-h-0 flex-1 overflow-y-auto pb-20 pr-1">
        {cards.length === 0 ? (
          <div className="flex min-h-56 flex-col items-center justify-center p-6 text-center">
            <p className="text-lg font-black">No cards yet</p>
            <p className="mt-2 max-w-64 text-sm font-semibold text-[var(--text-muted)]">Add creatures or commanders whose stats keep shifting during the game.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {cards.map((card) => (
              <TrackedCard
                key={card.id}
                card={card}
                onUpdate={onUpdateCard}
                onReset={onResetCard}
                onDelete={onDeleteCard}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CardTracker;
