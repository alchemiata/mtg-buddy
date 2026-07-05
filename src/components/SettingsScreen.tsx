import { BACKGROUNDS } from "../data/backgrounds";
import type { AppTheme, BackgroundKey, SettingsState } from "../types";
import BackgroundSelector from "./BackgroundSelector";

interface SettingsScreenProps {
  settings: SettingsState;
  onThemeChange: (theme: AppTheme) => void;
  onBackgroundChange: (background: BackgroundKey) => void;
  onStartingLifeChange: (life: number) => void;
  onResetAll: () => void;
  wallpapersOnly?: boolean;
}

function SettingsScreen({ settings, onBackgroundChange, onResetAll, wallpapersOnly = false }: SettingsScreenProps) {
  if (wallpapersOnly) {
    return (
      <section className="screen-shell px-4 pt-4">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Planeswalk</p>
          <h1 className="text-3xl font-black">Wallpapers</h1>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <section className="settings-section">
            <h2 className="settings-title">Land Skin</h2>
            <BackgroundSelector backgrounds={BACKGROUNDS} value={settings.background} onChange={onBackgroundChange} />
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="screen-shell px-4 pt-4">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">Sanctum Setup</p>
        <h1 className="text-3xl font-black">Settings</h1>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4">
        <section className="settings-section">
          <h2 className="settings-title">Future Tools</h2>
          <div className="grid grid-cols-2 gap-2 text-sm font-black text-[var(--text-muted)]">
            {["Commander Damage", "Poison", "Dice Roller", "Turn Tracker", "Tokens", "Game Notes"].map((item) => (
              <div key={item} className="min-h-12 rounded-2xl bg-[var(--surface-2)] px-3 py-3">{item}</div>
            ))}
          </div>
        </section>

        <section className="settings-section border-red-500/20">
          <h2 className="settings-title text-[var(--danger)]">Reset Saved Data</h2>
          <button type="button" onClick={onResetAll} className="tap-button min-h-14 w-full rounded-[1.25rem] bg-red-500/14 text-base font-black text-[var(--danger)]">
            Reset Everything
          </button>
        </section>
      </div>
    </section>
  );
}

export default SettingsScreen;
