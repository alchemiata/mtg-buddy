import { useState } from "react";

interface BottomNavigationProps {
  onOpenGlossary: () => void;
  onOpenSettings: () => void;
  onOpenWallpapers: () => void;
}

const menuItems: Array<{ label: string; icon: string; onClick: keyof BottomNavigationProps }> = [
  { label: "Glossary", icon: "AZ", onClick: "onOpenGlossary" },
  { label: "Wallpapers", icon: "BG", onClick: "onOpenWallpapers" },
  { label: "Settings", icon: "*", onClick: "onOpenSettings" },
];

function BottomNavigation(props: BottomNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const chooseItem = (action: keyof BottomNavigationProps) => {
    props[action]();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <nav aria-label="App menu" className="menu-popover w-[min(21rem,calc(100vw-1.5rem))] rounded-[1.35rem] border border-white/14 bg-[var(--nav-bg)] p-3 shadow-glow backdrop-blur-2xl">
          <div className="grid grid-cols-3 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => chooseItem(item.onClick)}
                className="tap-button flex min-h-12 flex-col items-center justify-center rounded-2xl bg-white/8 text-xs font-black text-[var(--text-primary)] transition hover:bg-white/12"
              >
                <span className="fantasy-title text-base leading-none" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="tap-button grid h-14 w-14 place-items-center rounded-full bg-[var(--land-accent)] text-2xl font-black text-[var(--land-accent-text)] shadow-glow"
        aria-expanded={isOpen}
        aria-label="Open app menu"
      >
        <span aria-hidden="true" className="hamburger-icon" />
      </button>
    </div>
  );
}

export default BottomNavigation;
