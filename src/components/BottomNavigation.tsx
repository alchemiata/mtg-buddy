import { useState } from "react";
import { BACKGROUNDS } from "../data/backgrounds";
import type { BackgroundKey, Tab } from "../types";

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "game", label: "Game", icon: "20" },
  { id: "glossary", label: "Glossary", icon: "AZ" },
  { id: "settings", label: "Settings", icon: "*" },
];

interface BottomNavigationProps {
  activeTab: Tab;
  background: BackgroundKey;
  onTabChange: (tab: Tab) => void;
  onBackgroundChange: (background: BackgroundKey) => void;
}

function BottomNavigation({ activeTab, background, onTabChange, onBackgroundChange }: BottomNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const chooseTab = (tab: Tab) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <nav aria-label="App menu" className="menu-popover w-[min(21rem,calc(100vw-1.5rem))] rounded-[1.35rem] border border-white/14 bg-[var(--nav-bg)] p-3 shadow-glow backdrop-blur-2xl">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => chooseTab(tab.id)}
                  className={`tap-button flex min-h-12 flex-col items-center justify-center rounded-2xl text-xs font-black transition ${
                    isActive ? "bg-[var(--nav-active)] text-[var(--nav-active-text)]" : "bg-white/8 text-[var(--text-muted)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="fantasy-title text-base leading-none" aria-hidden="true">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Land skin">
            {BACKGROUNDS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => onBackgroundChange(option.key)}
                className={`tap-button flex min-h-10 items-center gap-2 rounded-xl border px-2 text-left text-[0.72rem] font-black transition ${
                  background === option.key
                    ? "border-white bg-white text-stone-950"
                    : "border-white/12 bg-white/8 text-[var(--text-primary)]"
                }`}
              >
                <span className="h-5 w-5 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${option.asset})` }} aria-hidden="true" />
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="tap-button grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-2xl font-black text-[var(--accent-text)] shadow-glow"
        aria-expanded={isOpen}
        aria-label="Open app menu"
      >
        {isOpen ? "x" : "?"}
      </button>
    </div>
  );
}

export default BottomNavigation;
