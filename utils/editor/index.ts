import {
  MarkdownEditorThemeType,
  MARKDOWN_EDITOR_THEME_KEY,
} from '../../hooks/useMarkdownEditorTheme';
import { isBrowser } from '../../lib/isBrowser';

export const getMarkdownEditorTheme = (): MarkdownEditorThemeType => {
  return isBrowser
    ? ((localStorage.getItem(MARKDOWN_EDITOR_THEME_KEY) ||'light') as MarkdownEditorThemeType)
    : 'light';
};

export const setMarkdownEditorTheme = (val: MarkdownEditorThemeType): void => {
  if (isBrowser) localStorage.setItem(MARKDOWN_EDITOR_THEME_KEY, val);
};

export const setHtmlDataColorMode = (val: MarkdownEditorThemeType): void => {
  document.documentElement.setAttribute('data-color-mode', val);
};
