export type ThemeConfig = {
  name: string
  mode: 'light' | 'dark'
  settingsCookieName: string
  compactContentWidth: number
  layoutPadding: number
  contentWidth: 'compact' | 'wide'
}

export const themeConfig: ThemeConfig = {
  name: 'HeroUI',
  mode: 'light',
  settingsCookieName: 'hero-ui-theme',
  compactContentWidth: 1500,
  layoutPadding: 16,
  contentWidth: 'compact'
}
