import React from 'react';
import { getMarkdownEditorTheme } from '../utils/editor';

export const MARKDOWN_EDITOR_THEME_KEY = 'markdown-editor-theme';

export type MarkdownEditorThemeType = 'dark' | 'light';

type ReturnType = {
  changeTheme: () => void;
};

const useMarkdownEditorTheme = (): ReturnType => {
  const changeTheme = React.useCallback(() => {
    const theme = getMarkdownEditorTheme();
    const newValue = theme === 'light' ? 'dark' : 'light';

    localStorage.setItem(MARKDOWN_EDITOR_THEME_KEY, newValue);
    document.documentElement.setAttribute('data-color-mode', newValue);
  }, []);

  React.useEffect(() => {
    const theme = getMarkdownEditorTheme();
    document.documentElement.setAttribute('data-color-mode', theme);
  }, []);

  return { changeTheme };
};

export default useMarkdownEditorTheme;
