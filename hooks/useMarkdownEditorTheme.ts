import React from 'react';
import {
  getMarkdownEditorTheme,
  setHtmlDataColorMode,
  setMarkdownEditorTheme,
} from '../utils/editor';

export const MARKDOWN_EDITOR_THEME_KEY = 'markdown-editor-theme';

export type MarkdownEditorThemeType = 'dark' | 'light';

type ReturnType = {
  changeTheme: () => void;
  theme: MarkdownEditorThemeType;
};

const useMarkdownEditorTheme = (): ReturnType => {
  const changeTheme = React.useCallback(() => {
    const theme = getMarkdownEditorTheme();
    const newValue = theme === 'light' ? 'dark' : 'light';
    setMarkdownEditorTheme(newValue);
    setHtmlDataColorMode(newValue);
  }, []);

  React.useEffect(() => {
    const theme = getMarkdownEditorTheme();
    setHtmlDataColorMode(theme);
  }, []);

  return { changeTheme, theme: getMarkdownEditorTheme() };
};

export default useMarkdownEditorTheme;
