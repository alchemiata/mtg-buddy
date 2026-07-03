import type { BackgroundKey } from "../types";
import type { BackgroundTheme } from "../data/backgrounds";

function BackgroundSelector({ backgrounds, value, onChange, compact = false }: { backgrounds: BackgroundTheme[]; value: BackgroundKey; onChange: (background: BackgroundKey) => void; compact?: boolean }) {
  return (
    <div className={compact ? "flex gap-2 overflow-x-auto pb-1" : "grid grid-cols-2 gap-2 sm:grid-cols-3"} aria-label="Life counter background">
      {backgrounds.map((background) => (
        <button key={background.key} type="button" onClick={() => onChange(background.key)} className={`tap-button flex min-h-12 items-center gap-2 rounded-2xl border px-3 text-left text-sm font-black transition ${value === background.key ? "border-white bg-white text-stone-950" : "border-white/10 bg-[var(--surface-2)] text-[var(--text-primary)]"} ${compact ? "min-w-max" : ""}`}>
          <span className="h-7 w-7 shrink-0 rounded-full bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${background.asset})` }} aria-hidden="true" />
          <span>{background.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BackgroundSelector;
