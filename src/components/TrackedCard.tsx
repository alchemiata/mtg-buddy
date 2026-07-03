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

  return (
    <div className="rounded-[1.25rem] bg-[var(--surface-2)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-black text-[var(--text-muted)]">{label}</span>
        <span className="text-3xl font-black tabular-nums">{actual}</span>
      </div>
      <label className="mb-2 grid grid-cols-[auto_1fr] items-center gap-2 rounded-2xl bg-[var(--card-bg)] px-3 py-2">
        <span className="text-xs font-black uppercase text-[var(--text-muted)]">Base</span>
        <input
          type="number"
          inputMode="numeric"
          value={base}
          onChange={(event) => onBaseChange(Number(event.target.value) || 0)}
          className="min-h-9 w-full bg-transparent text-right text-lg font-black tabular-nums outline-none"
          aria-label={`${label} base value`}
        />
      </label>
      <div className="grid grid-cols-[3.25rem_1fr_3.25rem] items-center gap-2">
        <button type="button" onClick={() => onModifierChange(modifier - 1)} className="tap-button stat-button" aria-label={`Decrease ${label} modifier`}>-</button>
        <output className="modifier-readout rounded-2xl bg-[var(--card-bg)] px-2 py-2 text-center text-xl font-black tabular-nums text-[var(--accent-strong)]" aria-label={`${label} modifier`}>
          {formatModifier(modifier)}
        </output>
        <button type="button" onClick={() => onModifierChange(modifier + 1)} className="tap-button stat-button" aria-label={`Increase ${label} modifier`}>+</button>
      </div>
    </div>
  );
}

function TrackedCard({ card, onUpdate, onReset, onDelete }: TrackedCardProps) {
  return (
    <article className="rounded-[1.55rem] border border-[var(--border)] bg-[var(--card-bg)] p-3 shadow-soft animate-in">
      <label className="sr-only" htmlFor={`name-${card.id}`}>Card name</label>
      <input
        id={`name-${card.id}`}
        value={card.name}
        onChange={(event) => onUpdate(card.id, { name: event.target.value })}
        className="mb-3 min-h-12 w-full rounded-2xl bg-[var(--surface-2)] px-4 text-xl font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)]"
        placeholder="Card name"
      />
      <div className="grid gap-3 sm:grid-cols-2">
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
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => onReset(card.id)} className="tap-button min-h-11 rounded-2xl bg-[var(--surface-2)] text-sm font-black">Reset</button>
        <button type="button" onClick={() => onDelete(card.id)} className="tap-button min-h-11 rounded-2xl bg-red-500/14 text-sm font-black text-[var(--danger)]">Delete</button>
      </div>
    </article>
  );
}

export default TrackedCard;
