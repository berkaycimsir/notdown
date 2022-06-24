import React from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import EditorLoader from './Loader';
import { LightMode } from '@mui/icons-material';
import useMarkdownEditorTheme from '../../../hooks/useMarkdownEditorTheme';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor'), {
  ssr: false,
  loading: () => <EditorLoader />,
});

type Props = {
  value: string;
  onChange: (editor: any, data: any, value: any) => void;
};

const Editor: React.FC<Props> = ({ value, onChange }) => {
  const { changeTheme } = useMarkdownEditorTheme();

  const switchTheme = {
    name: 'theme',
    keyCommand: 'theme',
    icon: <LightMode sx={{ width: 16, height: 16 }} />,
    execute: () => changeTheme(),
  };

  const commandsMode = [switchTheme, 'preview', 'fullscreen'];

  return (
    <MarkdownEditor
      toolbarsMode={commandsMode}
      visible
      height="100vh"
      options={{
        lineNumbers: false,
      }}
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
