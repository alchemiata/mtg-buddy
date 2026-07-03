import { BACKGROUNDS, getBackground } from "../data/backgrounds";
import type { BackgroundKey, SettingsState } from "../types";
import BackgroundSelector from "./BackgroundSelector";

function LifeCounter({ life, settings, onChangeLife, onReset, onStartingLifeChange, onBackgroundChange }: { life: number; settings: SettingsState; onChangeLife: (delta: number) => void; onReset: () => void; onStartingLifeChange: (life: number) => void; onBackgroundChange: (background: BackgroundKey) => void }) {
  const background = getBackground(settings.background);
  return (
    <section className="life-panel relative flex min-h-[36dvh] flex-col overflow-hidden rounded-b-[2rem] bg-cover bg-center p-4 shadow-glow md:min-h-[calc(100dvh-8rem)] md:rounded-[2rem]" style={{ backgroundImage: `radial-gradient(circle at 50% 42%, rgba(12,8,5,.04), rgba(12,8,5,.5) 58%, rgba(12,8,5,.86)), url(${background.asset})` }} aria-label="Life counter">
      <div className="relative z-10 flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Command Zone</p><h1 className="fantasy-title text-xl font-black text-white">MTG Companion</h1></div><button type="button" onClick={onReset} className="tap-button min-h-12 rounded-full bg-black/35 px-4 text-sm font-black text-white">Reset</button></div>
      <div className="relative z-10 grid flex-1 grid-cols-[4.5rem_1fr_4.5rem] items-center gap-2 py-1"><button type="button" onClick={() => onChangeLife(-1)} className="tap-button counter-button" aria-label="Lose one life">-</button><output className="life-number" aria-live="polite">{life}</output><button type="button" onClick={() => onChangeLife(1)} className="tap-button counter-button" aria-label="Gain one life">+</button></div>
      <div className="relative z-10 space-y-3 rounded-3xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl"><div className="flex gap-2 overflow-x-auto pb-1">{[20, 30, 40].map((option) => <button key={option} type="button" onClick={() => onStartingLifeChange(option)} className={`tap-button min-h-11 min-w-16 rounded-full px-4 text-sm font-black ${settings.startingLife === option ? "bg-white text-stone-950" : "bg-white/15 text-white"}`}>{option}</button>)}</div><BackgroundSelector backgrounds={BACKGROUNDS} value={settings.background} onChange={onBackgroundChange} compact /></div>
    </section>
  );
}

export default LifeCounter;
