import type { BackgroundKey, SettingsState, TrackedCardState } from "../types";
import CardTracker from "./CardTracker";
import LifeCounter from "./LifeCounter";

interface GameScreenProps {
  life: number;
  cards: TrackedCardState[];
  settings: SettingsState;
  onChangeLife: (delta: number) => void;
  onResetLife: () => void;
  onStartingLifeChange: (life: number) => void;
  onBackgroundChange: (background: BackgroundKey) => void;
  onAddCard: () => void;
  onUpdateCard: (id: string, patch: Partial<Omit<TrackedCardState, "id">>) => void;
  onResetCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
}

function GameScreen(props: GameScreenProps) {
  return (
    <section className="game-shell min-h-0 flex-1 md:grid md:grid-cols-[minmax(22rem,0.85fr)_1.15fr] md:gap-5">
      <LifeCounter life={props.life} settings={props.settings} onChangeLife={props.onChangeLife} onReset={props.onResetLife} onStartingLifeChange={props.onStartingLifeChange} onBackgroundChange={props.onBackgroundChange} />
      <CardTracker cards={props.cards} onAddCard={props.onAddCard} onUpdateCard={props.onUpdateCard} onResetCard={props.onResetCard} onDeleteCard={props.onDeleteCard} />
    </section>
  );
}

export default GameScreen;
