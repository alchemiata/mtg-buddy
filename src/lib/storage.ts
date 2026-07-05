import type { AppState, BackgroundKey, TrackedCardState } from "../types";

const STORAGE_KEY = "mtg-companion-state-v1";

export const defaultState: AppState = {
  life: 40,
  cards: [],
  settings: {
    appTheme: "ember",
    background: "forest",
    startingLife: 40,
  },
};

const normalizeCard = (card: Partial<TrackedCardState>): TrackedCardState => ({
  id: card.id ?? `card-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  name: card.name ?? "New",
  baseAttack: Number.isFinite(card.baseAttack) ? Number(card.baseAttack) : 0,
  baseDefense: Number.isFinite(card.baseDefense) ? Number(card.baseDefense) : 0,
  attack: Number.isFinite(card.attack) ? Number(card.attack) : 0,
  defense: Number.isFinite(card.defense) ? Number(card.defense) : 0,
});

const validBackgrounds: BackgroundKey[] = ["forest", "island", "swamp", "mountain", "plains"];

const normalizeBackground = (background: unknown): BackgroundKey =>
  validBackgrounds.includes(background as BackgroundKey) ? (background as BackgroundKey) : "forest";

const normalizeStartingLife = (life: unknown) => (life === 20 ? 20 : 40);

export const loadState = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }

    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState,
      ...parsed,
      cards: Array.isArray(parsed.cards) ? parsed.cards.map(normalizeCard) : defaultState.cards,
      settings: {
        ...defaultState.settings,
        ...parsed.settings,
        background: normalizeBackground(parsed.settings?.background),
        startingLife: normalizeStartingLife(parsed.settings?.startingLife),
      },
    };
  } catch {
    return defaultState;
  }
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const clearSavedState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
