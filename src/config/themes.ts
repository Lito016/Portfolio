/** Available visual theme definitions */
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  /** Two accent colors for the preview swatch */
  previewColors: [string, string];
}

export const themes: ThemeConfig[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Frosted glass with blur effects',
    previewColors: ['#3b82f6', '#06b6d4'],
  },
  {
    id: 'neomorphism',
    name: 'Neomorphism',
    description: 'Soft shadows, extruded elements',
    previewColors: ['#e0e5ec', '#b8bec9'],
  },
  {
    id: 'brutalism',
    name: 'Brutalism',
    description: 'Bold, raw, high contrast',
    previewColors: ['#ff3333', '#000000'],
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    description: 'Clean, flat, content-first',
    previewColors: ['#6b7280', '#f9fafb'],
  },
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    description: 'Puffy, rounded, playful',
    previewColors: ['#f0abfc', '#c084fc'],
  },
];

export const THEME_STORAGE_KEY = 'portfolio-theme';
