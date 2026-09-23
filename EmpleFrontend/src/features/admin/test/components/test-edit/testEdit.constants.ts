import type { TestSettings } from '../TestSettingsCard';

export const defaultSettings: TestSettings = {
  blockKeyboard: false,
  allowVirtualKeyboard: false,
  allowCalculator: false,
  noExitScreen: false,
  ipBinding: false,
  noCopyPaste: false,
  noMinimize: false,
  noDevTools: false,
  noLostFocus: false,
  navigationMode: 'free',
  minTimeBeforeSubmit: 0,
  deadline: '',
  duration: 0,
  passwordProtected: false,
  password: '',
};

export const themeTokens = {
  pageBg: 'var(--clr-bg)',
  cardBg: 'var(--clr-surface)',
  cardBorder: 'var(--clr-border)',
  inputBg: 'var(--clr-surface2)',
  inputBorder: 'var(--clr-border)',
  inputText: 'var(--clr-text)',
  inputPlaceholder: 'var(--clr-text3)',
  headingColor: 'var(--clr-text)',
  labelColor: 'var(--clr-text2)',
  subText: 'var(--clr-text2)',
  divider: 'var(--clr-border)',
};