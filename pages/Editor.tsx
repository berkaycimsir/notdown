import React from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { styled } from '@mui/material';
import { prod } from '../lib/isProd';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor'), {
  ssr: false,
});

const StyledEditor = styled(MarkdownEditor)({
  ...(!prod
    ? {
        '.cm-s-default:last-child': {
          display: 'none !important',
        },
      }
    : {}),
});

const Editor: React.FC = () => {
  const [value, setValue] = React.useState('');

  const onChange = React.useCallback(
    (editor: any, data: any, value: any) => {
      setValue(value);
    },
    [setValue]
  );

  return (
    <StyledEditor visible height={800} value={value} onChange={onChange} />
  );
};

export default Editor;
