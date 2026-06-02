import config from "@/data/themes.json";

export type Palette = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentSoft: string;
  line: string;
  heroOverlay: string;
};

export type Fonts = { display: string; body: string; label: string };

export type Theme = {
  id: string;
  name: string;
  tagline: string;
  palette: Palette;
  fonts: Fonts;
  floral: "wildflower" | "geometric" | "ornament";
  rsvpInvert?: boolean;
};

export type ScheduleCard = {
  time: string;
  day: string;
  title: string;
  description: string;
  location: string;
};

export type GalleryImage = { src: string; alt: string; depth: number };

export type Content = typeof config.content;

export const themes = config.themes as Record<string, Theme>;
export const content = config.content as Content;
export const defaultThemeId = config.activeTheme as string;
export const themeList = Object.values(themes);

/** Maps a theme into the CSS custom properties consumed across the UI. */
export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    "--c-bg": theme.palette.bg,
    "--c-surface": theme.palette.surface,
    "--c-ink": theme.palette.ink,
    "--c-muted": theme.palette.muted,
    "--c-accent": theme.palette.accent,
    "--c-accent-soft": theme.palette.accentSoft,
    "--c-line": theme.palette.line,
    "--c-hero-overlay": theme.palette.heroOverlay,
    "--font-display": theme.fonts.display,
    "--font-body": theme.fonts.body,
    "--font-label": theme.fonts.label,
  };
}
