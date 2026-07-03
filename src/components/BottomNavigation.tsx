import type { Tab } from "../types";

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "game", label: "Game", icon: "20" },
  { id: "glossary", label: "Glossary", icon: "AZ" },
  { id: "settings", label: "Settings", icon: "*" },
];

function BottomNavigation({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[var(--nav-bg)] px-3 pb-[calc(.7rem+env(safe-area-inset-bottom))] pt-2 shadow-glow backdrop-blur-2xl md:left-1/2 md:max-w-md md:-translate-x-1/2 md:rounded-t-[1.35rem] md:border-x">
      <div className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return <button key={tab.id} type="button" onClick={() => onTabChange(tab.id)} className={`tap-button flex min-h-14 flex-col items-center justify-center rounded-2xl text-sm font-bold transition ${isActive ? "bg-[var(--nav-active)] text-[var(--nav-active-text)]" : "text-[var(--text-muted)] hover:bg-white/10"}`} aria-current={isActive ? "page" : undefined}><span className="fantasy-title text-lg leading-none" aria-hidden="true">{tab.icon}</span><span>{tab.label}</span></button>;
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;
