import { BACKGROUNDS } from "../data/backgrounds";
import type { AppTheme, BackgroundKey, SettingsState } from "../types";
import BackgroundSelector from "./BackgroundSelector";

const appThemes: Array<{ key: AppTheme; label: string; description: string }> = [
  { key: "ember", label: "Ember", description: "Warm table light" },
  { key: "moon", label: "Moon", description: "Dim, high contrast" },
  { key: "paper", label: "Paper", description: "Bright daytime play" },
];

function SettingsScreen({ settings, onThemeChange, onBackgroundChange, onStartingLifeChange, onResetAll }: { settings: SettingsState; onThemeChange: (theme: AppTheme) => void; onBackgroundChange: (background: BackgroundKey) => void; onStartingLifeChange: (life: number) => void; onResetAll: () => void }) {
  return (
    <section className="screen-shell px-4 pt-4 md:px-0 md:pt-0"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Sanctum Setup</p><h1 className="text-3xl font-black">Settings</h1></div><div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4"><section className="settings-section"><h2 className="settings-title">App Theme</h2><div className="grid gap-2">{appThemes.map((theme) => <button key={theme.key} type="button" onClick={() => onThemeChange(theme.key)} className={`tap-button min-h-16 rounded-[1.25rem] border px-4 text-left ${settings.appTheme === theme.key ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] bg-[var(--surface-2)]"}`}><span className="block text-base font-black">{theme.label}</span><span className="text-sm font-semibold text-[var(--text-muted)]">{theme.description}</span></button>)}</div></section><section className="settings-section"><h2 className="settings-title">Life Background</h2><BackgroundSelector backgrounds={BACKGROUNDS} value={settings.background} onChange={onBackgroundChange} /></section><section className="settings-section"><h2 className="settings-title">Starting Life</h2><div className="grid grid-cols-3 gap-2">{[20, 30, 40].map((life) => <button key={life} type="button" onClick={() => onStartingLifeChange(life)} className={`tap-button min-h-12 rounded-2xl text-base font-black ${settings.startingLife === life ? "bg-[var(--accent)] text-[var(--accent-text)]" : "bg-[var(--surface-2)]"}`}>{life}</button>)}</div></section><section className="settings-section border-red-500/20"><h2 className="settings-title text-[var(--danger)]">Reset Saved Data</h2><button type="button" onClick={onResetAll} className="tap-button min-h-14 w-full rounded-[1.25rem] bg-red-500/15 text-base font-black text-[var(--danger)]">Reset Everything</button></section></div></section>
  );
}

export default SettingsScreen;
