import type { NextPage } from 'next';
import React from 'react';
import Editor from '../../components/Editor';
import Title from '../../components/NewNote/Title';
import { Box } from '@mui/material';
import EditorHeader from '../../components/NewNote/Header';
import { useEditorStateStore } from '../../store/editor-state';

const New: NextPage = () => {
  const { markdown, setMarkdown } = useEditorStateStore();

  const onMarkdownChange = React.useCallback(
    (_: any, __: any, value: any) => {
      setMarkdown(value);
    },
    [setMarkdown]
  );

  return (
    <Box>
      <EditorHeader />
      <Title />
      <Editor value={markdown} onChange={onMarkdownChange} />
    </Box>
  );
};

export default New;
