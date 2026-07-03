export type Tab = "game" | "glossary" | "settings";

export type AppTheme = "ember" | "moon" | "paper";

export type BackgroundKey =
  | "forest"
  | "island"
  | "swamp"
  | "mountain"
  | "plains"
  | "colorless"
  | "arcane"
  | "dark-marble"
  | "wood-table";

export interface TrackedCardState {
  id: string;
  name: string;
  baseAttack: number;
  baseDefense: number;
  attack: number;
  defense: number;
}

export interface SettingsState {
  appTheme: AppTheme;
  background: BackgroundKey;
  startingLife: number;
}

export interface AppState {
  life: number;
  cards: TrackedCardState[];
  settings: SettingsState;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  summary: string;
  detail: string;
}
