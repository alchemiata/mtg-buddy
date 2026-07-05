import type { BackgroundKey } from "../types";

export interface BackgroundTheme {
  key: BackgroundKey;
  label: string;
  asset: string;
  accent: string;
}

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const BACKGROUNDS: BackgroundTheme[] = [
  { key: "forest", label: "Forest", asset: publicAsset("backgrounds/forest-custom.png"), accent: "#8ed064" },
  { key: "island", label: "Island", asset: publicAsset("backgrounds/island-custom.png"), accent: "#78c7e6" },
  { key: "swamp", label: "Swamp", asset: publicAsset("backgrounds/swamp-custom.png"), accent: "#b59d80" },
  { key: "mountain", label: "Mountain", asset: publicAsset("backgrounds/mountain-custom.png"), accent: "#f0965f" },
  { key: "plains", label: "Snow Plains", asset: publicAsset("backgrounds/plains-custom.png"), accent: "#f0d98a" },
];

export const getBackground = (key: BackgroundKey) =>
  BACKGROUNDS.find((background) => background.key === key) ?? BACKGROUNDS[0];
