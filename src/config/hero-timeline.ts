/** Shared hero load-sequence timeline (FR-03, canvas motion.heroSequenceTotal).
 * Stages: bg 400 -> nav 150 -> lines 700 (stagger 120) -> visual 900 -> meta 300
 * -> settle; serial ceiling 2450ms (<= FR-03 2.5s). */
export const HERO_BG_DURATION_MS = 400;
export const HERO_NAV_DELAY_MS = HERO_BG_DURATION_MS;
export const HERO_NAV_DURATION_MS = 150;
export const HERO_LINES_DELAY_MS = HERO_NAV_DELAY_MS + HERO_NAV_DURATION_MS;
export const HERO_LINE_DURATION_MS = 700;
export const HERO_LINE_STAGGER_MS = 120;
export const HERO_VISUAL_DELAY_MS = HERO_LINES_DELAY_MS + HERO_LINE_DURATION_MS + HERO_LINE_STAGGER_MS;
export const HERO_VISUAL_DURATION_MS = 900;
export const HERO_META_DELAY_MS = HERO_VISUAL_DELAY_MS + HERO_VISUAL_DURATION_MS;
export const HERO_SETTLE_CEILING_MS = HERO_META_DELAY_MS + 300;

export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_MEASURED_OUT = [0.165, 0.84, 0.44, 1] as const;
