import {
  MarkdownEditorThemeType,
  MARKDOWN_EDITOR_THEME_KEY,
} from '../../hooks/useMarkdownEditorTheme';
import { isBrowser } from '../../lib/isBrowser';

export const getMarkdownEditorTheme = (): MarkdownEditorThemeType => {
  return isBrowser
    ? ((localStorage.getItem(MARKDOWN_EDITOR_THEME_KEY) || 'dark') as MarkdownEditorThemeType)
    : 'dark';
};
