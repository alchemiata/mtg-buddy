import type { BackgroundKey } from "../types";

export interface BackgroundTheme {
  key: BackgroundKey;
  label: string;
  asset: string;
  accent: string;
}

export const BACKGROUNDS: BackgroundTheme[] = [
  { key: "forest", label: "Forest", asset: "/backgrounds/forest-custom.svg", accent: "#8ed064" },
  { key: "island", label: "Island", asset: "/backgrounds/island-custom.svg", accent: "#78c7e6" },
  { key: "swamp", label: "Swamp", asset: "/backgrounds/swamp-custom.svg", accent: "#b59d80" },
  { key: "mountain", label: "Mountain", asset: "/backgrounds/mountain-custom.svg", accent: "#f0965f" },
  { key: "plains", label: "Snow Plains", asset: "/backgrounds/plains-custom.svg", accent: "#f0d98a" },
];

export const getBackground = (key: BackgroundKey) =>
  BACKGROUNDS.find((background) => background.key === key) ?? BACKGROUNDS[0];
