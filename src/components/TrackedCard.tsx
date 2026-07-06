import type { TrackedCardState } from "../types";

interface TrackedCardProps {
  card: TrackedCardState;
  onUpdate: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
}

interface StatStepperProps {
  modifier: number;
  onModifierChange: (value: number) => void;
  ariaLabel: string;
}

const formatModifier = (value: number) => (value >= 0 ? `+${value}` : `${value}`);

function StatStepper({ modifier, onModifierChange, ariaLabel }: StatStepperProps) {
  return (
    <div className="modifier-cluster" aria-label={ariaLabel}>
      <output className="modifier-chip" aria-label={`${ariaLabel} modifier`}>
        {formatModifier(modifier)}
      </output>
      <div className="modifier-buttons">
        <button type="button" onClick={() => onModifierChange(modifier + 1)} className="tap-button mini-stat-button" aria-label={`Increase ${ariaLabel}`}>+</button>
        <button type="button" onClick={() => onModifierChange(modifier - 1)} className="tap-button mini-stat-button" aria-label={`Decrease ${ariaLabel}`}>-</button>
      </div>
    </div>
  );
}

function TrackedCard({ card, onUpdate, onDelete }: TrackedCardProps) {
  const actualAttack = card.baseAttack + card.attack;
  const actualDefense = card.baseDefense + card.defense;

  return (
    <article className="permanent-card animate-in">
      <div className="permanent-card-top">
        <label className="sr-only" htmlFor={`name-${card.id}`}>Card name</label>
        <input
          id={`name-${card.id}`}
          value={card.name}
          onFocus={() => {
            if (card.name === "New") {
              onUpdate(card.id, { name: "" });
            }
          }}
          onChange={(event) => onUpdate(card.id, { name: event.target.value })}
          className="permanent-name-input"
          placeholder="Name"
        />
        <div className="base-pair" aria-label="Base power and toughness">
          <label>
            <span className="sr-only">Base power</span>
            <input
              type="number"
              inputMode="numeric"
              value={card.baseAttack}
              onChange={(event) => onUpdate(card.id, { baseAttack: Number(event.target.value) || 0 })}
              aria-label="Base power"
            />
          </label>
          <span aria-hidden="true">/</span>
          <label>
            <span className="sr-only">Base toughness</span>
            <input
              type="number"
              inputMode="numeric"
              value={card.baseDefense}
              onChange={(event) => onUpdate(card.id, { baseDefense: Number(event.target.value) || 0 })}
              aria-label="Base toughness"
            />
          </label>
        </div>
      </div>

      <div className="current-statline-wrap">
        <div className="current-statline" aria-label="Current power and toughness">
          <span>{actualAttack}</span>
          <span aria-hidden="true">/</span>
          <span>{actualDefense}</span>
        </div>
        <button
          type="button"
          onClick={() => onDelete(card.id)}
          className="tap-button permanent-delete-button"
          aria-label="Remove creature"
        >
          x
        </button>
      </div>

      <div className="modifier-row">
        <StatStepper
          modifier={card.attack}
          ariaLabel="power"
          onModifierChange={(attack) => onUpdate(card.id, { attack })}
        />
        <StatStepper
          modifier={card.defense}
          ariaLabel="toughness"
          onModifierChange={(defense) => onUpdate(card.id, { defense })}
        />
      </div>
    </article>
  );
}

export default TrackedCard;
