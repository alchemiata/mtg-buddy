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
    <div className="min-h-dvh bg-[var(--app-bg)] text-[var(--text-primary)] transition-colors duration-300" data-app-theme={appTheme}>
      <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="flex min-h-0 flex-1 flex-col md:px-5 md:pt-5">{children}</div>
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
