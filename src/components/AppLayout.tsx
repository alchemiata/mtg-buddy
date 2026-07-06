import type { AppTheme } from "../types";
import BottomNavigation from "./BottomNavigation";

type Overlay = "glossary" | "settings" | "wallpapers" | null;

interface AppLayoutProps {
  appTheme: AppTheme;
  activeOverlay: Overlay;
  onOpenOverlay: (overlay: Exclude<Overlay, null>) => void;
  onCloseOverlay: () => void;
  overlayContent: React.ReactNode;
  children: React.ReactNode;
}

function AppLayout({
  appTheme,
  activeOverlay,
  onOpenOverlay,
  onCloseOverlay,
  overlayContent,
  children,
}: AppLayoutProps) {
  return (
    <div className="h-dvh overflow-hidden text-[var(--text-primary)] transition-colors duration-300" data-app-theme={appTheme}>
      <main className="mx-auto flex h-dvh min-h-0 w-full max-w-[430px] flex-col pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </main>
      {activeOverlay && (
        <div className="overlay-backdrop">
          <div className="overlay-panel">
            <button type="button" onClick={onCloseOverlay} className="tap-button overlay-close" aria-label="Close overlay">
              x
            </button>
            {overlayContent}
          </div>
        </div>
      )}
      {!activeOverlay && (
        <BottomNavigation
          onOpenGlossary={() => onOpenOverlay("glossary")}
          onOpenSettings={() => onOpenOverlay("settings")}
          onOpenWallpapers={() => onOpenOverlay("wallpapers")}
        />
      )}
    </div>
  );
}

export default AppLayout;
