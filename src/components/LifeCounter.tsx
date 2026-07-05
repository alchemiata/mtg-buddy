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
      className="life-panel relative flex min-h-[36dvh] flex-col overflow-hidden rounded-b-[2rem] bg-cover bg-center p-4 shadow-glow transition-all duration-500 md:min-h-[calc(100dvh-8rem)] md:rounded-[2rem]"
      style={{ backgroundImage: `radial-gradient(circle at 50% 42%, rgba(12, 8, 5, .04), rgba(12, 8, 5, .5) 58%, rgba(12, 8, 5, .86)), linear-gradient(180deg, rgba(18, 13, 9, .08), rgba(18, 13, 9, .72)), url(${background.asset})` }}
      aria-label="Life counter"
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Command Zone</p>
          <h1 className="fantasy-title text-xl font-black text-white">MTG Companion</h1>
        </div>
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
      </div>

      <div className="relative z-10 grid flex-1 grid-cols-[4.5rem_1fr_4.5rem] items-center gap-2 py-1">
        <button type="button" onClick={() => onChangeLife(-1)} className="tap-button counter-button" aria-label="Lose one life">-</button>
        <output className="life-number" aria-live="polite">{life}</output>
        <button type="button" onClick={() => onChangeLife(1)} className="tap-button counter-button" aria-label="Gain one life">+</button>
      </div>

      <div className="relative z-10 space-y-3 rounded-3xl border border-white/14 bg-black/34 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Starting life">
          {startingLifeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setCustomLife(option.toString());
                onStartingLifeChange(option);
              }}
              className={`tap-button min-h-11 min-w-16 rounded-full px-4 text-sm font-black transition ${
                settings.startingLife === option ? "bg-white text-stone-950" : "bg-white/14 text-white"
              }`}
            >
              {option}
            </button>
          ))}
          <div className="flex min-h-11 items-center rounded-full bg-white/14 pl-4 pr-1 text-white">
            <label htmlFor="custom-life" className="sr-only">Custom starting life</label>
            <input
              id="custom-life"
              value={customLife}
              onChange={(event) => setCustomLife(event.target.value)}
              onBlur={applyCustomLife}
              inputMode="numeric"
              className="w-16 bg-transparent text-sm font-black outline-none placeholder:text-white/50"
              placeholder="Custom"
            />
            <button type="button" onClick={applyCustomLife} className="tap-button min-h-9 rounded-full bg-white px-3 text-xs font-black text-stone-950">Set</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LifeCounter;
