import type { TrackedCardState } from "../types";

interface TrackedCardProps {
  card: TrackedCardState;
  onUpdate: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
}

interface StatStepperProps {
  label: string;
  base: number;
  modifier: number;
  onBaseChange: (value: number) => void;
  onModifierChange: (value: number) => void;
}

const formatModifier = (value: number) => (value >= 0 ? `+${value}` : `${value}`);

function StatStepper({ label, base, modifier, onBaseChange, onModifierChange }: StatStepperProps) {
  const actual = base + modifier;
  const shortLabel = label === "Attack" ? "ATK" : "DEF";

  return (
    <div className="rounded-[1rem] bg-[var(--surface-2)] p-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[0.68rem] font-black text-[var(--text-muted)]">{shortLabel}</span>
        <span className="text-2xl font-black tabular-nums">{actual}</span>
      </div>
      <label className="mb-1 grid grid-cols-[auto_1fr] items-center gap-1 rounded-xl bg-[var(--card-bg)] px-2 py-1">
        <span className="text-[0.62rem] font-black uppercase text-[var(--text-muted)]">Base</span>
        <input
          type="number"
          inputMode="numeric"
          value={base}
          onChange={(event) => onBaseChange(Number(event.target.value) || 0)}
          className="min-h-7 w-full bg-transparent text-right text-base font-black tabular-nums outline-none"
          aria-label={`${label} base value`}
        />
      </label>
      <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-1">
        <button type="button" onClick={() => onModifierChange(modifier - 1)} className="tap-button stat-button" aria-label={`Decrease ${label} modifier`}>-</button>
        <output className="modifier-readout rounded-xl bg-[var(--card-bg)] px-1 py-1 text-center font-black tabular-nums text-[var(--accent-strong)]" aria-label={`${label} modifier`}>
          {formatModifier(modifier)}
        </output>
        <button type="button" onClick={() => onModifierChange(modifier + 1)} className="tap-button stat-button" aria-label={`Increase ${label} modifier`}>+</button>
      </div>
    </div>
  );
}

function TrackedCard({ card, onUpdate, onReset, onDelete }: TrackedCardProps) {
  return (
    <article className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--card-bg)] p-2 shadow-soft animate-in">
      <label className="sr-only" htmlFor={`name-${card.id}`}>Card name</label>
      <input
        id={`name-${card.id}`}
        value={card.name}
        onFocus={() => {
          if (card.name === "New permanent") {
            onUpdate(card.id, { name: "" });
          }
        }}
        onChange={(event) => onUpdate(card.id, { name: event.target.value })}
        className="mb-2 min-h-9 w-full rounded-xl bg-[var(--surface-2)] px-3 text-base font-black outline-none transition placeholder:text-[var(--text-muted)] focus:ring-4 focus:ring-[var(--focus)]"
        placeholder="Permanent name"
      />
      <div className="grid gap-2">
        <StatStepper
          label="Attack"
          base={card.baseAttack}
          modifier={card.attack}
          onBaseChange={(baseAttack) => onUpdate(card.id, { baseAttack })}
          onModifierChange={(attack) => onUpdate(card.id, { attack })}
        />
        <StatStepper
          label="Defense"
          base={card.baseDefense}
          modifier={card.defense}
          onBaseChange={(baseDefense) => onUpdate(card.id, { baseDefense })}
          onModifierChange={(defense) => onUpdate(card.id, { defense })}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <button type="button" onClick={() => onReset(card.id)} className="tap-button min-h-8 rounded-xl bg-[var(--surface-2)] text-[0.7rem] font-black">Reset</button>
        <button type="button" onClick={() => onDelete(card.id)} className="tap-button min-h-8 rounded-xl bg-red-500/14 text-[0.7rem] font-black text-[var(--danger)]">Delete</button>
      </div>
    </article>
  );
}

export default TrackedCard;
