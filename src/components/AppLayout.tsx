import type { AppTheme, Tab } from "../types";
import BottomNavigation from "./BottomNavigation";

interface AppLayoutProps {
  activeTab: Tab;
  appTheme: AppTheme;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

function AppLayout({ activeTab, appTheme, onTabChange, children }: AppLayoutProps) {
  return (
    <div className="min-h-dvh bg-[var(--app-bg)] text-[var(--text-primary)]" data-app-theme={appTheme}>
      <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="flex min-h-0 flex-1 flex-col md:px-5 md:pt-5">{children}</div>
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

export default AppLayout;
