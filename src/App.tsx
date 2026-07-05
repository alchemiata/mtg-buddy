import { useEffect, useMemo, useState } from "react";
import AppLayout from "./components/AppLayout";
import GameScreen from "./components/GameScreen";
import GlossaryScreen from "./components/GlossaryScreen";
import SettingsScreen from "./components/SettingsScreen";
import { getBackground } from "./data/backgrounds";
import { clearSavedState, defaultState, loadState, saveState } from "./lib/storage";
import type { AppState, AppTheme, BackgroundKey, TrackedCardState } from "./types";

const makeId = () => crypto.randomUUID?.() ?? `card-${Date.now()}-${Math.random().toString(16).slice(2)}`;
type Overlay = "glossary" | "settings" | "wallpapers" | null;

function App() {
  const [activeOverlay, setActiveOverlay] = useState<Overlay>(null);
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    const background = getBackground(state.settings.background);

    document.documentElement.dataset.theme = state.settings.appTheme;
    document.documentElement.style.setProperty("--land-bg", `url(${background.asset})`);
    document.documentElement.style.setProperty("--land-accent", background.accent);
    document.documentElement.style.setProperty("--land-accent-text", "#17120c");
    saveState(state);
  }, [state]);

  const actions = useMemo(
    () => ({
      setLife: (value: number) => setState((current) => ({ ...current, life: Math.max(0, value) })),
      changeLife: (delta: number) => setState((current) => ({ ...current, life: Math.max(0, current.life + delta) })),
      resetLife: () => setState((current) => ({ ...current, life: current.settings.startingLife })),
      setStartingLife: (startingLife: number) =>
        setState((current) => ({ ...current, life: startingLife, settings: { ...current.settings, startingLife } })),
      setBackground: (background: BackgroundKey) =>
        setState((current) => ({ ...current, settings: { ...current.settings, background } })),
      setAppTheme: (appTheme: AppTheme) =>
        setState((current) => ({ ...current, settings: { ...current.settings, appTheme } })),
      addCard: () =>
        setState((current) => ({
          ...current,
          cards: [{ id: makeId(), name: "", baseAttack: 0, baseDefense: 0, attack: 0, defense: 0 }, ...current.cards],
        })),
      updateCard: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) =>
        setState((current) => ({
          ...current,
          cards: current.cards.map((card) => (card.id === id ? { ...card, ...patch } : card)),
        })),
      resetCard: (id: string) =>
        setState((current) => ({
          ...current,
          cards: current.cards.map((card) => (card.id === id ? { ...card, attack: 0, defense: 0 } : card)),
        })),
      deleteCard: (id: string) =>
        setState((current) => ({ ...current, cards: current.cards.filter((card) => card.id !== id) })),
      resetAll: () => {
        clearSavedState();
        setState(defaultState);
        setActiveOverlay(null);
      },
    }),
    []
  );

  return (
    <AppLayout
      appTheme={state.settings.appTheme}
      activeOverlay={activeOverlay}
      onOpenOverlay={setActiveOverlay}
      onCloseOverlay={() => setActiveOverlay(null)}
      overlayContent={
        <>
          {activeOverlay === "glossary" && <GlossaryScreen />}
          {activeOverlay === "settings" && (
            <SettingsScreen
              settings={state.settings}
              onThemeChange={actions.setAppTheme}
              onBackgroundChange={actions.setBackground}
              onStartingLifeChange={actions.setStartingLife}
              onResetAll={actions.resetAll}
            />
          )}
          {activeOverlay === "wallpapers" && (
            <SettingsScreen
              settings={state.settings}
              onThemeChange={actions.setAppTheme}
              onBackgroundChange={actions.setBackground}
              onStartingLifeChange={actions.setStartingLife}
              onResetAll={actions.resetAll}
              wallpapersOnly
            />
          )}
        </>
      }
    >
      <GameScreen
        life={state.life}
        cards={state.cards}
        settings={state.settings}
        onChangeLife={actions.changeLife}
        onResetLife={actions.resetLife}
        onStartingLifeChange={actions.setStartingLife}
        onAddCard={actions.addCard}
        onUpdateCard={actions.updateCard}
        onResetCard={actions.resetCard}
        onDeleteCard={actions.deleteCard}
      />
    </AppLayout>
  );
}

export default App;
