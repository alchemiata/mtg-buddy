import { useRef, useState } from "react";
import { getBackground } from "../data/backgrounds";
import type { SettingsState } from "../types";

const startingLifeOptions = [20, 30, 40];

interface LifeCounterProps {
  life: number;
  settings: SettingsState;
  onChangeLife: (delta: number) => void;
  onReset: () => void;
  onStartingLifeChange: (life: number) => void;
}

function LifeCounter({ life, settings, onChangeLife, onReset, onStartingLifeChange }: LifeCounterProps) {
  const [customLife, setCustomLife] = useState(settings.startingLife.toString());
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [isChoosingStart, setIsChoosingStart] = useState(false);
  const timer = useRef<number | null>(null);
  const background = getBackground(settings.background);

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

  const applyCustomLife = () => {
    const parsed = Number(customLife);
    if (Number.isFinite(parsed) && parsed > 0) {
      onStartingLifeChange(Math.min(999, Math.round(parsed)));
    }
  };

  return (
    <section
      className="life-panel relative flex min-h-[35dvh] flex-col overflow-hidden rounded-[1.75rem] bg-cover bg-center p-4 shadow-glow transition-all duration-500 md:min-h-[calc(100dvh-8rem)] md:rounded-[2rem]"
      style={{ backgroundImage: `radial-gradient(circle at 50% 42%, rgba(12, 8, 5, .04), rgba(12, 8, 5, .5) 58%, rgba(12, 8, 5, .86)), linear-gradient(180deg, rgba(18, 13, 9, .08), rgba(18, 13, 9, .72)), url(${background.asset})` }}
      aria-label="Life counter"
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Command Zone</p>
          <h1 className="fantasy-title text-xl font-black text-white">MTG Companion</h1>
        </div>
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsChoosingStart((current) => !current)}
            className="tap-button min-h-12 rounded-full bg-black/32 px-4 text-sm font-black text-white transition hover:bg-black/45"
            aria-expanded={isChoosingStart}
            aria-label="Change starting life"
          >
            Start {settings.startingLife}
          </button>
          <button
            type="button"
            onPointerDown={beginReset}
            onPointerUp={cancelReset}
            onPointerLeave={cancelReset}
            className={`tap-button min-h-12 rounded-full px-4 text-sm font-black text-white transition ${confirmingReset ? "bg-red-500" : "bg-black/32 hover:bg-black/45"}`}
            aria-label="Hold to reset life total"
          >
            {confirmingReset ? "Hold..." : "Reset"}
          </button>
          {isChoosingStart && (
            <div className="start-life-popover">
              <div className="grid grid-cols-3 gap-2">
                {startingLifeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setCustomLife(option.toString());
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
              <div className="mt-2 flex min-h-10 items-center rounded-xl bg-white/14 pl-3 pr-1 text-white">
                <label htmlFor="custom-life" className="sr-only">Custom starting life</label>
                <input
                  id="custom-life"
                  value={customLife}
                  onChange={(event) => setCustomLife(event.target.value)}
                  inputMode="numeric"
                  className="w-16 bg-transparent text-sm font-black outline-none placeholder:text-white/50"
                  placeholder="Custom"
                />
                <button
                  type="button"
                  onClick={() => {
                    applyCustomLife();
                    setIsChoosingStart(false);
                  }}
                  className="tap-button min-h-8 rounded-lg bg-white px-3 text-xs font-black text-stone-950"
                >
                  Set
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 grid flex-1 grid-cols-[4.5rem_1fr_4.5rem] items-center gap-2 py-1">
        <button type="button" onClick={() => onChangeLife(-1)} className="tap-button counter-button" aria-label="Lose one life">-</button>
        <output className="life-number" aria-live="polite">{life}</output>
        <button type="button" onClick={() => onChangeLife(1)} className="tap-button counter-button" aria-label="Gain one life">+</button>
      </div>
    </section>
  );
}

export default LifeCounter;
