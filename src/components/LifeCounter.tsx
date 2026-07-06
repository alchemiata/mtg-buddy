import { useRef, useState } from "react";
import type { SettingsState } from "../types";

const startingLifeOptions = [20, 40];

interface LifeCounterProps {
  life: number;
  settings: SettingsState;
  onChangeLife: (delta: number) => void;
  onReset: () => void;
  onStartingLifeChange: (life: number) => void;
}

function LifeCounter({ life, settings, onChangeLife, onReset, onStartingLifeChange }: LifeCounterProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [isChoosingStart, setIsChoosingStart] = useState(false);
  const timer = useRef<number | null>(null);

  const beginReset = () => {
    setConfirmingReset(true);
    timer.current = window.setTimeout(() => {
      onReset();
      setConfirmingReset(false);
    }, 650);
  };

  const cancelReset = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
    setConfirmingReset(false);
  };

  return (
    <section
      className="life-panel relative flex flex-col overflow-hidden rounded-[1.75rem] p-2.5 shadow-glow transition-all duration-500 md:p-4"
      aria-label="Life counter"
    >
      <div className="life-panel-header relative flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Command Zone</p>
          <h1 className="fantasy-title text-xl font-black text-white">MTG Buddy</h1>
        </div>
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsChoosingStart((current) => !current)}
            className="tap-button min-h-10 rounded-full bg-[var(--land-accent)] px-4 text-xs font-black text-[var(--land-accent-text)] shadow-soft"
            aria-expanded={isChoosingStart}
            aria-label="Change starting life"
          >
            Set Life
          </button>
          <button
            type="button"
            onPointerDown={beginReset}
            onPointerUp={cancelReset}
            onPointerLeave={cancelReset}
            className={`tap-button min-h-10 rounded-full px-4 text-xs font-black shadow-soft ${
              confirmingReset
                ? "bg-red-500 text-white"
                : "bg-[var(--land-accent)] text-[var(--land-accent-text)]"
            }`}
            aria-label="Hold to reset life total"
          >
            {confirmingReset ? "Hold..." : "Reset"}
          </button>
          {isChoosingStart && (
            <div className="start-life-popover">
              <div className="grid grid-cols-2 gap-2">
                {startingLifeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onStartingLifeChange(option);
                      setIsChoosingStart(false);
                    }}
                    className={`tap-button min-h-10 rounded-xl text-sm font-black transition ${
                      settings.startingLife === option ? "bg-white text-stone-950" : "bg-white/14 text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="life-control-row relative z-10 grid flex-1 items-center gap-2 py-0 md:py-1">
        <button type="button" onClick={() => onChangeLife(-1)} className="tap-button counter-button" aria-label="Lose one life">-</button>
        <output className="life-number" aria-live="polite">{life}</output>
        <button type="button" onClick={() => onChangeLife(1)} className="tap-button counter-button" aria-label="Gain one life">+</button>
      </div>
    </section>
  );
}

export default LifeCounter;
